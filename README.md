# 📊 Actual results

These are the outputs I obtained, comparing Cloudflare & Vercel (Standard VM Pro account, 1vCPU/2GB), with the "SSR" version.

Note that both providers are tested in their respective Paris datacenter here.

```bash
=== Final Results ===

cloudflare:
  Fastest: 257.91ms
  Slowest: 740.53ms
  Average: 352.92ms
  Success: 10/10

vercel:
  Fastest: 730.11ms
  Slowest: 1449.81ms
  Average: 1072.26ms
  Success: 10/10
```
