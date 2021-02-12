import express from "express";
const app = express();

const PORT: number = 8000;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack !");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
