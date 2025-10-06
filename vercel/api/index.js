import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default async function handler(_, res) {
  const { html } = cpuIntensiveFunction();
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(html);
}
