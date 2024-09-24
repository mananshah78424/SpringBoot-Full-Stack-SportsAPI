// lib/scrape.ts
import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SOCCER_API // Production URL from environment variables
    : "http://localhost:8080/api/soccer"; // Local development URL
console.log("URL is", API_BASE_URL);
export interface Article {
  title: string;
  link: string;
  imageSrc: string; // Assuming this is an image URL
}

export const scrapeNews = async (): Promise<Article[]> => {
  try {
    const articles = await axios.get<Article[]>(`${API_BASE_URL}/scrape_news`);
    return articles.data;
  } catch (error) {
    throw error;
  }
};
