# 🎨 Frontend – Using the Backend Proxy

This frontend application **never communicates directly** with the Brawl Stars API.

All data requests **must go through the Backend Proxy**.

---

## ❗ Core Rule (Very Important)

🚫 **DO NOT**:

- Call the Brawl Stars API directly
- Store API keys in the frontend
- Hardcode external API URLs
- Bypass the proxy for any reason

✅ **ALWAYS**:

- Use the Backend Proxy API
- Fetch data only from proxy endpoints

---

## Request Flow

```text
Frontend
   |
   |  HTTP requests (no API key)
   v
Backend Proxy
   |
   |  Authenticated requests (API key)
   v
Brawl Stars API
```

---

## Proxy Base URL

During development:

```ts
const API_BASE_URL = "http://localhost:3000/api";
```

⚠️ Never use the Brawl Stars API base URL in frontend code.

---

## Fetching Data (Example)

Fetch player stats

```ts
export const getPlayer = async (tag: string) => {
  const response = await fetch(`${API_BASE_URL}/player/${tag}`);

  if (!response.ok) {
    throw new Error("Failed to fetch player data");
  }

  return response.json();
};
```

## Available Endpoints

The frontend can only use the endpoints exposed by the proxy.

Example:

```js
GET /api/player/:tag
GET /api/battlelog/:tag
```

If you need additional data: Ask Zeh-Eox on Github to expose a new endpoint.

---

## Cache & Data Freshness

Some data is cached temporarily.

This means:

- Data may be a few seconds old
- This is expected behavior
- Do not attempt to force refresh or bypass cache
