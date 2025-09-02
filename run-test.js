import config from "./config.js";

/**
 * Benchmark a URL by making multiple HTTP requests
 * @param {string} url - The endpoint to test
 * @param {number} count - Number of requests
 * @param {number} delayMs - Delay between requests (ms)
 * @returns {Object} Stats: min, max, avg, total time
 */
async function benchmark(url, count = 10, delayMs = 0) {
  const times = [];

  console.log(`\n=== Benchmarking: ${url} ===`);
  console.log(`Requests: ${count}, Delay: ${delayMs}ms`);

  for (let i = 0; i < count; i++) {
    const start = performance.now();

    try {
      const res = await fetch(url);
      await res.text(); // Ensure full response is read

      const end = performance.now();
      const duration = end - start;

      times.push(duration);

      console.log(`Request ${i + 1}: ${duration.toFixed(2)}ms`);
    } catch (err) {
      console.error(`Request ${i + 1} failed:`, err.message);
      times.push(Infinity); // Mark as failed
    }

    if (delayMs > 0 && i < count - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  // Filter out failed requests
  const validTimes = times.filter((t) => t !== Infinity);

  if (validTimes.length === 0) {
    console.error("All requests failed.");
    return null;
  }

  const min = Math.min(...validTimes);
  const max = Math.max(...validTimes);
  const avg = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;

  return {
    url,
    min: Number(min.toFixed(2)),
    max: Number(max.toFixed(2)),
    avg: Number(avg.toFixed(2)),
    totalRequests: count,
    successful: validTimes.length,
    times: validTimes.map((t) => Number(t.toFixed(2))),
  };
}

async function main() {
  const results = {};

  for (const [key, url] of Object.entries(config.endpoints)) {
    console.log(`\n--- Running benchmark for: ${key} ---`);
    const result = await benchmark(url, config.count, config.delayMs);
    if (result) {
      results[key] = result;
    }
  }

  console.log("\n=== Final Results ===");
  for (const [key, result] of Object.entries(results)) {
    console.log(`\n${key}:`);
    console.log(`  Fastest: ${result.min}ms`);
    console.log(`  Slowest: ${result.max}ms`);
    console.log(`  Average: ${result.avg}ms`);
    console.log(`  Success: ${result.successful}/${result.totalRequests}`);
  }
}

// Run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
