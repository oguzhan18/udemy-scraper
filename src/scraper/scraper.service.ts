import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

/**
 * Service for scraping Udemy course data.
 * Utilizes Puppeteer for headless browser automation to retrieve course data from Udemy.
 */
@Injectable()
export class ScraperService {
  private readonly logger = new Logger(ScraperService.name);

  /**
   * Scrapes the details of a Udemy course from the provided URL.
   * Opens a headless browser, navigates to the Udemy course page, and extracts
   * the course title, description, images, price, and reviews.
   * Closes the browser upon completion.
   *
   * @param url - The URL of the Udemy course to scrape.
   * @returns A promise that resolves to an object containing the course title,
   * description, images, price, and an array of reviews.
   * @throws HttpException - If an error occurs during scraping.
   */
  async scrapeUdemyCourse(url: string): Promise<any> {
    let browser;
    try {
      // Launch Puppeteer in headless mode with sandbox settings disabled
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      // Open a new browser page and set a user agent to avoid detection
      const page = await browser.newPage();
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
      await page.goto(url, { waitUntil: 'networkidle2' });

      // Scrape course title
      const title = await page.$eval('h1', (el) => el.textContent.trim());

      // Scrape course description
      const description = await page.$eval('.clp-lead__headline', (el) =>
        el.textContent.trim(),
      );

      // Scrape all images on the page
      const images = await page.$$eval('img', (imgs) =>
        imgs.map((img) => img.src),
      );

      // Scrape course price
      const price = await page.$eval(
        '.ud-clp-discount-price > span:nth-of-type(2) > span',
        (el) => el.textContent.trim(),
      );

      // Scrape course reviews, including reviewer names, ratings, and comments
      const reviews = await page.$$eval(
        '.review--review-container--gVw03',
        (elems) =>
          elems.map((elem) => {
            const reviewer =
              elem.querySelector('.user-name')?.textContent.trim() ||
              'Anonymous';
            const rating =
              elem
                .querySelector(
                  '.review--review-name-and-rating--T0S-U > .ud-heading-md',
                )
                ?.getAttribute('aria-label') || 'No Rating';
            const comment =
              elem
                .querySelector('.review--with-show-more-button--nSXQz > span')
                ?.textContent.trim() || '';
            return { reviewer, rating, comment };
          }),
      );

      // Close the browser after scraping
      await browser.close();

      return {
        title,
        description,
        images,
        price,
        reviews,
      };
    } catch (error) {
      // Ensure browser is closed in case of an error
      if (browser) await browser.close();
      this.logger.error(`Data scraping error: ${error.message}`);
      throw new HttpException(
        `Data scraping error: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
