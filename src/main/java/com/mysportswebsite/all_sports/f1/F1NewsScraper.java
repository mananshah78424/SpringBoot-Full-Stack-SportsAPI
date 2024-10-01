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

            driver.get("https://www.formula1.com/en/latest/all");
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("li.group")));
            List<WebElement> articlesElements = driver.findElements(By.cssSelector("li.group"));

            for (WebElement element : articlesElements) {
                // Extract the link (href) from the <a> tag
                String link = element.findElement(By.tagName("a")).getAttribute("href");

                // Extract the image source from the <img> tag
                String imageSrc = element.findElement(By.tagName("img")).getAttribute("src");

                // Extract the title from the <p> tag
                String title = element.findElement(By.tagName("p")).getText();

                // Add the news article to the list
                articles.add(new NewsArticle(title, link, imageSrc));
            }
            return articles;

        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if (driver != null) {
                driver.quit(); // Ensure the driver is quit after use
            }
        }
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
