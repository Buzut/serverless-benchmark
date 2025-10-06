import cpuIntensiveFunction from "./cpuIntensiveFunction.js";

export default {
  async fetch() {
    const { html } = cpuIntensiveFunction();
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
  },
};
