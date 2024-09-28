package com.mysportswebsite.all_sports.f1;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.github.bonigarcia.wdm.WebDriverManager;
import lombok.Data;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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
public class F1NewsScraper {

    @GetMapping("/api/f1/scrape_news")
    public List<NewsArticle> scrapeNews(){
        List<NewsArticle> articles = new ArrayList<>();
        WebDriver driver = null;
        try {
            WebDriverManager.chromedriver().setup();
            ChromeOptions options = new ChromeOptions();
            options.addArguments("--headless");
            options.addArguments("--disable-gpu");
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--remote-debugging-port=9222");
            options.addArguments("--disable-software-rasterizer");
            options.addArguments("--window-size=1920,1080");
            options.addArguments("--user-data-dir=/tmp/chrome-user-data");
            driver = new ChromeDriver(options);

            driver.get("https://www.skysports.com/f1");
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("news-list")));
            List<WebElement> articleElements = driver.findElements(By.className("news-list__item"));
            System.out.println(articleElements.size());
            for(WebElement element:articleElements){
                WebElement imageElement = element.findElement(By.cssSelector("img.news-list__image"));
                String imageUrl = imageElement.getAttribute("data-src");
                if (imageUrl == null || imageUrl.isEmpty()) {
                    // Fallback to src if data-src is empty or not present
                    imageUrl = imageElement.getAttribute("src");
                }



                WebElement titleElement = element.findElement(By.cssSelector(".news-list__headline-link"));
                // Debug: Print the inner HTML to check if the element contains the title text
                String innerHtml = titleElement.getAttribute("innerHTML");
                System.out.println("Inner HTML: " + innerHtml);

                // Use JavaScript Executor to get the text content if getText() fails
                JavascriptExecutor js = (JavascriptExecutor) driver;
                String title = (String) js.executeScript("return arguments[0].innerText;", titleElement);

                // Trim the title to remove any leading/trailing spaces
                title = title.trim();


                // Extract the description
                WebElement descriptionElement = element.findElement(By.cssSelector(".news-list__snippet"));
                String description = descriptionElement.getText();

                // Extract the anchor tag (a tag) to get the link for the article
                WebElement linkElement = element.findElement(By.cssSelector(".news-list__headline-link"));
                String articleLink = linkElement.getAttribute("href");

                NewsArticle article = new NewsArticle(title,articleLink,imageUrl);
                articles.add(article);
            }
            //int articleCount = Math.min(articleElements.size(), 6);  // To ensure we don't exceed the list size
//            for (int i = 0; i < articleCount; i++) {
//                WebElement articleElement = articleElements.get(i);
//
//                // Extracting the title, link, and image
//                String title = articleElement.findElement(By.className("figcaption p")).getText();
//                String link = articleElement.findElement(By.className("a")).getAttribute("href");
//                String imageSrc = articleElement.findElement(By.className("img")).getAttribute("src");
//
//                NewsArticle article = new NewsArticle(title, link, imageSrc);
//                articles.add(article);
//            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if (driver != null) {
                driver.quit(); // Ensure the driver is quit after use
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
