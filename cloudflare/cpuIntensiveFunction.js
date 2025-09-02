export default function () {
  const iterations = 100_000_000;
  const start = performance.now();

  let sum = 0;
  for (let i = 0; i < iterations; i++) {
    const result = Math.sin(Math.PI * i) * Math.cos(Math.PI * i);
    sum += result;
  }

  const end = performance.now();
  return { totalTime: Math.round(end - start), sum };
}
