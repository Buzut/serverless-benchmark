import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default {
  async fetch() {
    const { result, stringHash, primeCount, arrLen } = cpuIntensiveFunction();
    return new Response(`res: ${result}, hash: ${stringHash}, prime: ${primeCount}, arrLen: ${arrLen}`);
  },
};
