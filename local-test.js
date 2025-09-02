import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

// Same test made to run locally for baseline comparison
const { totalTime } = cpuIntensiveFunction(cpuIntensiveFunction);
console.log(totalTime);
