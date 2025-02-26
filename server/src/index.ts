import express from "express";
import "dotenv/config";

const PORT = process.env.PORT;
const app = express();

app.get("/", (req, res) => {
  res.send("hello from express");
});

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
