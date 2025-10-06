import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default async function handler(_, res) {
  const { result, stringHash, primeCount, arrLen } = cpuIntensiveFunction();
  res.status(200).send(`res: ${result}, hash: ${stringHash}, prime: ${primeCount}, arrLen: ${arrLen}`);
}
