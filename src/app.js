import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: [
      "https://frontend-61n5.onrender.com",
      "http://localhost:5173",
      "https://frontend-1zdu.vercel.app",
      "https://frontend-eou1.vercel.app/",
    ], // your frontend URL on Render or elsewhere
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieparser());

export default app;
