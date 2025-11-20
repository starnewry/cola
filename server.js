import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 네이버 API 키
const CLIENT_ID = "riamrwzdog";
const CLIENT_SECRET = "PXTLk90AJV8oMs3GFjqRolr9vFxglJB6RLYsjkPi";

// 정적 파일 서비스 (index.html, script.js 등 제공)
app.use(express.static("./"));

// ====== 🟩 주소 → 좌표 변환 API (Render에서도 작동) ======
app.get("/geocode", async (req, res) => {
  const query = req.query.query;
  if (!query) return res.status(400).json({ error: "Missing query" });

  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
        "X-NCP-APIGW-API-KEY": CLIENT_SECRET
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("Geocode API error:", err);
    res.status(500).json({ error: "Failed to geocode" });
  }
});

// ====== 🟩 Render 외부 접속 가능하도록 포트 설정 ======
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});
