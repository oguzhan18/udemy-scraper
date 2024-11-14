import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

/**
 * Controller to handle scraping operations for Udemy courses.
 * Provides an endpoint to retrieve course data from a given Udemy URL.
 */
@ApiTags('Udemy Scraper')
@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  /**
   * GET /scraper/course
   * Retrieves data of a Udemy course specified by URL.
   *
   * @param url - The URL of the Udemy course to scrape data from.
   * @returns The scraped course data, including title, description, images, and price.
   */
  @Get('course')
  @ApiOperation({ summary: 'Pull Udemy Course Data' })
  @ApiQuery({ name: 'url', required: true, description: 'Udemy Course Link' })
  @ApiResponse({
    status: 200,
    description: 'Udemy course data has been successfully retrieved.',
    schema: {
      example: {
        title: 'Course Title',
        description: 'Course Description',
        images: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
        ],
        price: '$199.99',
      },
    },
  })
  async getCourseData(@Query('url') url: string) {
    return this.scraperService.scrapeUdemyCourse(url);
  }
}
