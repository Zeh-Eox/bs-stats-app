import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BRAWL_STARS_API_URL || 'https://api.brawlstars.com/v1';

export const fetchFromBrawlStarsAPI = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${process.env.BRAWL_STARS_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching data from Brawl Stars API: ${response.statusText}`);
  }

  return response.json();
}