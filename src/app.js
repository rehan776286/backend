import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();
import cors from 'cors';
app.use(cors({
  origin: 'https://frontend-61n5.onrender.com', // your frontend URL on Render or elsewhere
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieparser());

export default app;
