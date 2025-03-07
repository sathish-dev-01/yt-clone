import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const API_HOST = process.env.YOUTUBE_API_HOST;
const API_KEY = process.env.YOUTUBE_API_KEY;

const apiClient = axios.create({
  baseURL: `https://${API_HOST}`,
  headers: {
    "x-rapidapi-host": API_HOST,
    "x-rapidapi-key": API_KEY,
  },
});

// Home Videos
app.get("/home", async (req, res) => {
  try {
    const response = await apiClient.get("/home/", { params: { hl: "en", gl: "US" } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Trending Videos
app.get("/trending", async (req, res) => {
  try {
    const response = await apiClient.get("/trending/", { params: { hl: "en", gl: "US" } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search
app.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const response = await apiClient.get("/search/", { params: { q: query, hl: "en", gl: "US" } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auto Complete
app.get("/autocomplete", async (req, res) => {
  try {
    const query = req.query.q || "";
    const response = await apiClient.get("/auto-complete/", { params: { q: query, hl: "en", gl: "US" } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Video Details
app.get("/video", async (req, res) => {
  try {
    const id = req.query.id;
    const response = await apiClient.get("/video/details/", { params: { id, hl: "en", gl: "US" } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Video Comments
app.get("/comments", async (req, res) => {
  try {
    const id = req.query.id;
    const response = await apiClient.get("/video/comments/", { params: { id, hl: "en", gl: "US" } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Related Videos
app.get("/related", async (req, res) => {
  try {
    const id = req.query.id;
    const response = await apiClient.get("/video/related-contents/", { params: { id, hl: "en", gl: "US" } });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
