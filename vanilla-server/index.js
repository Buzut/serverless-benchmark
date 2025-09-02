import http from "node:http";
import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

const PORT = 8080;
const IP_ADDR = "0.0.0.0";

const server = http.createServer((_, res) => {
  try {
    const { totalTime } = cpuIntensiveFunction();
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Calculation took ${totalTime}ms`);
  } catch (err) {
    console.error(err);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(PORT, IP_ADDR, () => {
  console.log(
    `✅ Standalone Node.js server running on http://localhost:${PORT}`,
  );
  console.log(`👉 Test with: http://localhost:${PORT}/cpu-intensive`);
});
