import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const CLIENT_ID = "riamrwzdog";
const CLIENT_SECRET = "PXTLk90AJV8oMs3GFjqRolr9vFxglJB6RLYsjkPi";

app.get("/geocode", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing query" });

  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(query)}`;

  console.log("\n📌 요청된 주소:", query);               // ← 추가 1
  console.log("📌 요청 URL:", url);                     // ← 추가 2

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
        "X-NCP-APIGW-API-KEY": CLIENT_SECRET
      }
    });

    const data = await response.json();
    
    console.log("📌 Geocode API 응답:", data);         // ← 추가 3

    res.json(data);
  } catch (err) {
    console.error("❌ Geocode error:", err);
    res.status(500).json({ error: "Failed to geocode" });
  }
});

app.use(express.static("./"));

app.listen(3000, () => {
  console.log("Server running → http://localhost:3000");
});
