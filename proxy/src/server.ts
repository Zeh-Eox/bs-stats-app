import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Status</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .container {
          text-align: center;
          background: white;
          padding: 3rem 4rem;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
          margin: 0;
          color: #333;
          font-size: 2.5rem;
          font-weight: 600;
        }
        .status {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1.5rem;
          background: #10b981;
          color: white;
          border-radius: 50px;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>API is running</h1>
        <span class="status">✓ Operational</span>
      </div>
    </body>
    </html>
  `);
});


app.get("/health", (_: Request, res: Response) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
