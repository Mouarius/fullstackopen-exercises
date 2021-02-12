export const calculateBmi = (height: number, weight: number): string => {
  if (height === 0) {
    throw new Error("Can' t divide by 0!");
  }
  const bmi = weight / (height * 0.01) ** 2;
  if (bmi < 15) return "Very severly underweight";
  else if (15 <= bmi && bmi < 16) return "Severly underweight";
  else if (16 <= bmi && bmi < 18.5) return "Underweight";
  else if (18.5 <= bmi && bmi < 25) return "Normal (healthy weight)";
  else if (25 <= bmi && bmi < 30) return "Overweight";
  else if (30 <= bmi && bmi < 35) return "Obese Class I (Moderately obese)";
  else if (35 <= bmi && bmi < 40) return "Obese Class II (Severely obese)";
  else return "Obese Class III (Very severely obese)";
};

const h: number = Number(process.argv[2]);
const w: number = Number(process.argv[3]);

console.log(calculateBmi(h, w));
