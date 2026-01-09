# 🛡️ Backend Proxy API

This backend acts as a **secure proxy** between the frontend application and the external Brawl Stars API.

Its main goals are:

- Protect sensitive API keys
- Control and validate requests
- Cache responses to reduce external API calls
- Provide a clean and stable API for the frontend team

---

## Why a Proxy?

Direct calls from the frontend to the Brawl Stars API would:

- Expose the API key publicly
- Allow unlimited requests
- Make rate limiting and caching impossible

This proxy solves all of that.

---

## Architecture Overview

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

## Security

- The **API key is stored only in the backend** via environment variables
- The frontend never sees or accesses the key
- All requests are validated before being forwarded

Example:

```env
BRAWL_STARS_API_KEY=your_secret_key_here
```

---

## Caching System

The proxy uses an in-memory cache with TTL (Time To Live).
How it works:

- A request arrives
- The proxy checks the cache
- If data exists and is still valid → return cached data
- Otherwise → fetch from Brawl Stars API
- Store the response in cache
- Return the response

Example TTLs:

- Player data: 60 seconds
- Club data: 120 seconds
- Battle logs: 30 seconds

This:

- Reduces API usage
- Improves performance
- Prevents rate-limit issues

```js
GET /api/player/:tag
   ↓
Check cache
   ↓
If cache miss
   ↓
Fetch from Brawl Stars API
   ↓
Cache response
   ↓
Return JSON to frontend
```

---

## API Endpoints

Example endpoints exposed by the proxy:

```js
GET /api/player/:tag
GET /api/battlelog/:tag
```

⚠️ The frontend must never call the Brawl Stars API directly.
