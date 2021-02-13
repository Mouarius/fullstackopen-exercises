interface CalculateResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: Array<number>,
  target: number
): CalculateResult => {
  if (hours.length === 0) {
    throw new Error("You provided an empty array for the period!");
  }
  if (target === 0) {
    throw new Error("You cannot have a target of zero, you lazy!");
  }
  const sum = hours.reduce((prevNumber, number) => prevNumber + number);
  const average = sum / hours.length;
  const trainingDays = hours.filter((hour) => hour != 0).length;
  const ratio = average / target;
  let rating: number;

  if (ratio < 1) rating = 1;
  else if (ratio === 1) rating = 2;
  else rating = 3;

  const ratingDescription = [
    "❌  You didn't succeed to cope your objectives... ",
    "✅  Well done, you did it ! ",
    "⭐️ Awesome, you worked mor than your goal !",
  ];

  const result: CalculateResult = {
    periodLength: hours.length,
    trainingDays,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription[rating - 1],
    target,
    average,
  };
  return result;
};

if (process.argv[1] === "exerciseCalculator.ts") {
  const target = Number(process.argv[2]);
  const hours: number[] = process.argv
    .slice(3)
    .map((strHour) => Number(strHour));

  const response = calculateExercises(hours, target);

  console.log(response);
}
