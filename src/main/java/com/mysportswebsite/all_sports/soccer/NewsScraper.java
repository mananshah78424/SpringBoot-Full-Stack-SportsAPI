package com.mysportswebsite.all_sports.soccer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.Data;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@RestController
public class NewsScraper {

    @GetMapping("/api/soccer/scrape_news")
    public List<NewsArticle> scrapeNews() {
        List<NewsArticle> articles = new ArrayList<>();
        WebDriver driver = null;

        try {
            // Set up WebDriver using WebDriverManager
            WebDriverManager.chromedriver().setup();

            // Set up Chrome options
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--headless");
            options.addArguments("--disable-gpu");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--remote-debugging-port=9222");
            options.addArguments("--disable-software-rasterizer");
            options.addArguments("--window-size=1920,1080");
            options.addArguments("--user-data-dir=/tmp/chrome-user-data");

            // Initialize WebDriver
            driver = new ChromeDriver(options);

            // Open the target webpage
            driver.get("https://www.premierleague.com/news");

            // Create a WebDriverWait object to wait for elements to load
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            //wait.until(...): Waits until the specified condition is met (the visibility of the elements matching the given CSS selector).
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".media-thumbnail.media-thumbnail--search")));

            // Use WebDriver to find the elements containing the news articles
            List<WebElement> articlesElements = driver.findElements(By.cssSelector(".media-thumbnail.media-thumbnail--search"));
            System.out.println(articlesElements.size());
            for (WebElement element : articlesElements) {
                String title = element.findElement(By.cssSelector(".media-thumbnail__title")).getText();
                String link = element.findElement(By.cssSelector(".media-thumbnail__link")).getAttribute("href");
                String imageSrc = element.findElement(By.cssSelector("img")).getAttribute("src");

                if (!link.startsWith("http")) {
                    link = "https://www.premierleague.com" + link;
                }

                articles.add(new NewsArticle(title, link, imageSrc));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }

        return articles;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class NewsArticle {
        private String title;
        private String link;
        private String imageSrc;

        public NewsArticle(String title, String link, String imageSrc) {
            this.title = title;
            this.link = link;
            this.imageSrc = imageSrc;
        }
    }
}
