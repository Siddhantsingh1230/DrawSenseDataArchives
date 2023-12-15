import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import fs from "fs";

const app = express();

//environment variables
configDotenv({
  path: "./config.env",
});

//CORS
app.use(
  cors({
    origin: "*",
    method: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({ sucess: true, message: "All Systems Operatinal" });
});

// JSON Routes
app.get("/JSON", (req, res) => {
  if (!req.query.file) {
    return res
      .status(500)
      .json({ success: false, message: "No Such File exsts" });
  }
  try {
    const { file } = req.query;
    const paths = fs.readFileSync("./RawDataset/" + file + ".json", "utf-8");
    return res.status(200).json(JSON.parse(paths));
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
});

// Image Routes
app.get("/Image", (req, res) => {
  if (!req.query.file) {
    return res
      .status(500)
      .json({ success: false, message: "No Such File exsts" });
  }
  try {
    res.setHeader("Content-Type", "image/jpeg");
    const { file } = req.query;
    const Image = fs.readFileSync("./imageDataset/" + file + ".png");
    res.send(Image);
  } catch (error) {
    return res.status(500).json({ success: false, message: error });
  }
});

app.listen(process.env.PORT, (err) => {
  if (err) throw err;
  console.log(`DrawSense Data Archives running on port ${process.env.PORT}`);
});
