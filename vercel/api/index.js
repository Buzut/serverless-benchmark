import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default async function handler(_, res) {
  const { sum } = cpuIntensiveFunction();
  res.status(200).send(`Result ${sum}`);
}
