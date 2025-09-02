import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default async function handler(_, res) {
  const { totalTime } = cpuIntensiveFunction();
  res.status(200).send(`Calculation took ${totalTime}ms`);
}
