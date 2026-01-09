import { Router } from "express";
import { fetchFromBrawlStarsAPI } from "../services/brawl.service";
import { getFromCache, setInCache } from "../utils/cache";

const playerRoutes = Router();

playerRoutes.get("/player/:tag", async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const cacheKey = `player:${tag}`;

  const cached = getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const data = await fetchFromBrawlStarsAPI(`/players/${tag}`);
    setInCache(cacheKey, data, 30_000);
    res.json(data);
  } catch {
    res.status(404).json({ error: "Player not found" });
  }
});

playerRoutes.get("/battlelog/:tag", async (req, res) => {
  const tag = encodeURIComponent(`#${req.params.tag}`);
  const cacheKey = `battlelog:${tag}`;

  const cached = getFromCache(cacheKey);
  if (cached) return res.json(cached);

  try {
    const data = await fetchFromBrawlStarsAPI(`/players/${tag}/battlelog`);
    setInCache(cacheKey, data, 30_000);
    res.json(data);
  } catch {
    res.status(404).json({ error: "Battlelog not found" });
  }
});

export default playerRoutes;
