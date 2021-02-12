import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

const PORT: number = 3002;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack !");
});

app.get("/bmi/", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (height && weight) {
    try {
      const bmi = calculateBmi(height, weight);
      res.send({ weight, height, bmi });
    } catch (e) {
      res.send({ error: e.message });
    }
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
