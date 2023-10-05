import axios from 'axios'
import * as cheerio from 'cheerio'
import { extractCurrency, extractDescription, extractPrice } from '../utils';

export async function scrapeAmazonProduct(url: string){
  if(!url) return;

  const username = String(process.env.BRIGHT_DATA_USERNAME)
  const password = String(process.env.BRIGHT_DATA_PASSWORD)
  const host = String(process.env.BRIGHT_DATA_HOST)
  const port = Number(process.env.BRIGHT_DATA_PORT)
  const sessionId = (1000000 * Math.random()) | 0

  const options = {
    auth: {
      username: `${username}-session-${sessionId}`,
      password,
    },
    host,
    port,
    rejectUnauthorized: false,
  }

  try {
    // fetch the product page
    const response = await axios.get(url, options)
    const $ = cheerio.load(response.data)

    // scrape the product data
    const title = $('#productTitle').text().trim()
    const currentPrice = extractPrice(
      $('.priceToPay span.a-price-whole'),
      $('.a.size.base.a-color-price'),
      $('.a-button-selected .a-color-base'),
    );

    const originalPrice = extractPrice(
      $('#priceblock_ourprice'),
      $('.a-price.a-text-price span.a-offscreen'),
      $('#listPrice'),
      $('#priceblock_dealprice'),
      $('.a-size-base.a-color-price')
    )

    const outOfStock = $('#availaility span').text().trim() === 'Currently unavailable.'

    const images = $('#imgBlkFront').attr('data-a-dynamic-image') || $('#landingImage').attr('data-a-dynamic-image') || '{}'

    const imgUrls = Object.keys(JSON.parse(images))

    const currency = extractCurrency($('.a-price-symbol'))

    const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '')

    const description = extractDescription($)

    // return the scraped product data
    const data = {
      url,
      currency: currency || 'R$',
      image: imgUrls[0],
      title,
      currentPrice: currentPrice || originalPrice,
      originalPrice: originalPrice || currentPrice,
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'categoria',
      reviewsCount: 100,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: currentPrice || originalPrice,
      highestPrice: currentPrice || originalPrice,
      average: currentPrice || originalPrice,
    }

    return data

  } catch (error: any) {
    throw new Error(`Failed to scrape product: ${error.message}`)
  }
}