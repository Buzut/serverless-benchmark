import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default {
  async fetch() {
    const { sum } = cpuIntensiveFunction();
    return new Response(`Result ${sum}`);
  },
};
