import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default {
  async fetch() {
    const { totalTime } = cpuIntensiveFunction();
    return new Response(`Calculation took ${totalTime}ms,`);
  },
};
