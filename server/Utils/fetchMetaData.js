import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

export const fetchMetadata = async (url) => {
  try {
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    const title = $('title').text() || url;
    const domain = new URL(url).hostname;
    const favicon = `https://www.google.com/s2/favicons?sz=64&domain_url=${domain}`;

    return { title, favicon };
  } catch (err) {
    return { title: url, favicon: '' };
  }
};
