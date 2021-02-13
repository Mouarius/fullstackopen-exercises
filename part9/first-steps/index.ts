import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

const PORT = 3002;

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack !");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (height && weight) {
    try {
      const bmi = calculateBmi(height, weight);
      res.send({ weight, height, bmi });
    } catch (e) {
      res.send({ error: "malformatted parameters" });
    }
  } else {
    res.send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  if (body) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = body;
    try {
      const response = calculateExercises(daily_exercises, target);
      res.send(response);
    } catch (e) {
      res.send({ error: `malformatted parameters` });
    }
  } else {
    res.send({ error: "missing parameters" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
