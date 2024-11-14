# Udemy Course Scraper

This project provides a web service to scrape course information from Udemy course pages. It uses **NestJS** for the backend framework and **Puppeteer** for headless browser automation. The service retrieves course details such as title, description, images, price, and reviews.

## Features

- **Scrape Udemy Course Information:** Extracts the title, description, images, price, and reviews of a Udemy course.
- **Headless Browsing:** Utilizes Puppeteer for headless browsing, enabling seamless data extraction without rendering.
- **Error Handling:** Includes robust error handling and logs any issues encountered during the scraping process.

## Technologies Used

- **NestJS:** Framework for building efficient, reliable server-side applications.
- **Puppeteer:** Node library for headless browser automation, used here to scrape Udemy course data.

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **NestJS CLI** (optional, for easier project management)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/oguzhan18/udemy-scraper.git
   cd udemy-course-scraper
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Run the application:**
   ```bash
   npm run start
   ```
   By default, the service will start on http://localhost:3000.



## Usage
The Udemy Course Scraper provides an API endpoint to retrieve course data from a specified Udemy course URL.
### API Endpoint
- **URL:** GET `/scraper/course`
- Retrieves course data from the provided Udemy course link.
- **Query Parameters:**
  - `url` (required): The URL of the Udemy course page to scrape.
  - **Example:** `http://localhost:3000/scraper/course?url=https://www.udemy.com/course/complete-python-bootcamp/`
### Example Response

```json
{
  "title": "Course Title",
  "description": "Course Description",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "price": "$199.99",
  "reviews": [
    {
      "reviewer": "John Doe",
      "rating": "5 out of 5 stars",
      "comment": "This course was very informative."
    }
  ]
}
```
## Code Structure
`scraper.service.ts:` Contains the main scraping logic using Puppeteer.
`scraper.controller.ts:` Handles the API endpoint and routes requests to the service.
`scraper.module.ts:` Configures the NestJS module for the service.

