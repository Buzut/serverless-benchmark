export default function () {
  const start = performance.now();

  // CPU-bound integer and string operations benchmark
  let result = 0;

  // Integer arithmetic and bitwise operations
  for (let i = 0; i < 10_000_000; i++) {
    result += ((i * 31) ^ (i << 3)) & 0xFFFFFFFF;
    result = (result * 1103515245 + 12345) & 0x7FFFFFFF; // LCG
  }

  // Array sorting and manipulation
  const arrays = [];
  for (let i = 0; i < 100; i++) {
    const arr = Array.from({ length: 10000 }, (_, idx) => (idx * 7919) % 10007);
    arr.sort((a, b) => a - b);
    arrays.push(arr.reduce((acc, val) => acc + val, 0));
  }

  // String operations and hashing
  let stringHash = 0;
  const baseStr = "benchmark-test-string-";
  for (let i = 0; i < 1_000_000; i++) {
    const str = baseStr + i;
    for (let j = 0; j < str.length; j++) {
      stringHash = ((stringHash << 5) - stringHash + str.charCodeAt(j)) | 0;
    }
  }

  // Prime counting with optimized trial division
  let primeCount = 0;
  for (let n = 2; n < 100000; n++) {
    let isPrime = n > 1;
    if (n > 2 && n % 2 === 0) isPrime = false;
    else {
      for (let i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
          isPrime = false;
          break;
        }
      }
    }
    if (isPrime) primeCount++;
  }

  const end = performance.now();
  return {
    totalTime: Math.round(end - start), result, stringHash, primeCount, arrLen: arrays.length
  };
}
