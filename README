# Serverless Compute Performance Benchmark

A minimal, realistic benchmark tool to compare the raw compute performance of different serverless and edge computing platforms. This repository runs a consistent CPU-intensive workload across environments like Cloudflare Workers, Vercel Serverless Functions, and vanilla Node.js/Bun servers, measuring execution time.

## 🎯 Purpose

Serverless platforms abstract infrastructure, but they differ significantly in:

* CPU allocation
* Cold vs. warm start behavior
* Execution duration limits
* Memory-to-CPU ratios
* Language runtime optimizations (V8, JavaScriptCore, etc.)

This benchmark provides a simple, reproducible way to measure and compare how fast each provider executes a tight loop of mathematical operations — a proxy for raw compute throughput.

💡 Useful for developers choosing providers based on performance-critical workloads (e.g., data processing, real-time math, encoding, AI pre/post-processing).

### 🔧 Benchmark Details

The test performs:

```js
for (let i = 0; i < 100_000_000; i++) {
  const result = Math.sin(Math.PI * i) * Math.cos(Math.PI * i);
  sum += result;
}
```

### Key Characteristics:

| Feature | Description |
|--------|-------------|
| **Operation Type** | CPU-bound, floating-point math |
| **Iterations** | 100 million (configurable) |
| **Functions Used** | `Math.sin`, `Math.cos`, multiplication |
| **Measurement** | Total execution time in milliseconds (`performance.now()`) |


### Measurement procedure

As Cloudflare isolates provide precise access to time and performance (for security reasons explained here), we'll make the measurements including the network round-trip.

Considering a compute tasks that takes at least 10 seconds on average, with all providers tested in the same region (France in my initial run), network latency will be deemed negligible.

### Tested Platforms:

| Platform | Environment | Runtime | Notes |
|--------|-------------|--------|-------|
| [Cloudflare Workers](https://workers.cloudflare.com/) | Edge | V8 isolates | Ultra-low cold starts, but potentially limited CPU time |
| [Vercel Serverless](https://vercel.com/functions) | Regional | Node.js (varies) | Higher memory tiers available; longer cold starts |
| Vanilla Node.js/Bun | Local or VM | Node.js | Baseline performance (full CPU access) |
| Direct execution | Local or VM | Node/Bun/Deno | Baseline for comparison |

## 🧩 Platform-Specific Implementations

Although the core benchmark logic (`cpuIntensiveFunction`) is shared, each environment requires a different entry point or handler setup due to fundamental differences in their runtime paradigms:

| Platform | Entry File | Pattern | Notes |
|--------|-----------|--------|-------|
| **Node.js / Bun** | `vanilla-server/index.js` | Standalone HTTP server | Full control over server lifecycle |
| **Vercel** | `vercel/api/index.js` | Serverless function handler | Auto-scaled, request-triggered, file-based routing |
| **Cloudflare Workers** | `cloudflare/index.ts` | Fetch handler (ES modules) | Edge runtime, no Node.js environment |

You can also directly call the function without server overhead by just doing `node/bun local-test.js`.

## 📦 Usage

### 1. Clone the repo

```bash
git clone https://github.com/buzut/serverless-perftest.git
cd serverless-perftest
```

### 2. Install deps

```
npm i / bun i
```

### 3. Run locally (Node.js or Bun)

```
node/bun local-test.js
```

### 4. Deploy to the your serverless hosts

```
# Node
npx vercel deploy / npx wrangler deploy

# Bun
bunx vercel deploy / bunx wrangler deploy
```

### 4 bis. Deploy to statefull server (VPS/Bare Metal)

```
rsync -arv … (note you might want to set up ports and listening IP in vanilla-server/index.js)
```

### 5. Configure the testbench

Set the `config.js` with your endpoints, the number of API calls and the delay between them.

You can also change the iteration count in `cpuIntensiveFunction.js` (NB: it's hardlinked to `vercel/`, `cloudflare` and `vanilla-server/`) so no need to modify it elsewhere.

### 6. Hit it

Each run returns:
- The actual time it took for each run
- The aggregate amongst all runs (fastest, slowest, average)

#### 📊 Actual results

These are the ouputs I optained, comparing Cloudflare, Vercel (Standard VM Pro account, 1vCPU/2GB), Alwaysdata public cloud (1CPU/1GB) and Scaleway COPARM1 (ARM64 2vCPU, 8GB).

```bash
=== Final Results ===

cloudflare:
  Fastest: 9136.79ms
  Slowest: 9437.95ms
  Average: 9309.15ms
  Success: 10/10

vercel:
  Fastest: 37801.78ms
  Slowest: 38314.6ms
  Average: 37995.61ms
  Success: 10/10

alwaysdata:
  Fastest: 28155.16ms
  Slowest: 35631.59ms
  Average: 31861.79ms
  Success: 10/10

scaleway:
  Fastest: 9940.89ms
  Slowest: 10053.6ms
  Average: 9978.48ms
  Success: 10/10
```

## 🛠️ Extending the Benchmark

You can modify the test to explore other dimensions:
* Vary iteration count (10M → 1B)
* Add memory pressure (large arrays)
* Test cryptographic operations (crypto.subtle)
* Measure I/O (fetch, Redis, etc.)
* Compare across memory tiers (e.g., Vercel 128MB vs 3GB)

## 🙌 Contributing

Contributions welcome! Help us add:

* More platforms (Netlify, Supabase, Lambda, Firebase, Deno, etc.)
* HTML dashboard for visualization
* Let us know your ideas!

Biome is used for linting, simply run `bun/npm run lint` et voilà!

## 📬 Feedback & Questions?

Open an issue or reach out on Twitter/X — let’s make serverless performance more transparent.
Real-world performance depends on network, concurrency, and workload patterns.

🚀 Happy benchmarking!
