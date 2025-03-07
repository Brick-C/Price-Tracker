import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";
import { log } from "node:console";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  //Brightdata proxy configuration
  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    //fetch the product page
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    //extract product details
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".a-price.a-text-price"),
      $("..priceToPay span.a-price-whole"),
      $(".a-price-whole"),
      $(".a-price-fraction")
    );
    const originalPrice = extractPrice(
      $(".priceBlockStrikePriceString"),
      $(".a-text-strike")
    );
    const outOfStock =
      $("#availability").text().trim().toLowerCase() === "out of stock";

    const image =
      $("#landingImage").attr("data-a-dynamic-image") ||
      $("#imgBLKFront").attr("data-a-dynamic-image");
    const imageURLS = Object.keys(JSON.parse(image || "{}"));
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const description = extractDescription($);

    //construct data object with scrapepd information
    const data = {
      url,
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      outOfStock: outOfStock,
      imageURLS,
      currency: currency || "$",
      discountRate: Number(discountRate),
      reviewsCount: 100,
      category: "category",
      stars: 4.5,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(currentPrice) || Number(originalPrice),
      average: Number(currentPrice) || Number(originalPrice),
    };

    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
