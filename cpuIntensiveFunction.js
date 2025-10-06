export default function () {
  const start = performance.now();

  function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  }

  function calculatePrimes(limit) {
    const primes = [];
    for (let i = 2; i <= limit; i++) {
      if (isPrime(i)) {
        primes.push(i);
      }
    }
    return primes;
  }

  function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    return b;
  }

  function generateSlowerComplexData() {
    // Calculate way more primes (5x more)
    const primes = calculatePrimes(500000);

    // Calculate more fibonacci numbers
    const fibs = Array.from({ length: 200 }, (_, i) => fibonacci(i));

    // Generate much more complex nested data (3x sections, 3x items)
    const complexData = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      title: `Section ${i + 1}`,
      primes: primes.slice(i * 200, (i + 1) * 200),
      fibonacci: fibs,
      items: Array.from({ length: 60 }, (_, j) => ({
        id: j,
        value: Math.sqrt(i * 1000 + j),
        description: `Item ${j} in section ${i}`,
        metadata: {
          timestamp: Date.now(),
          hash: (i * j * 12345).toString(36),
          complexity: Math.sin(i) * Math.cos(j),
          extraComputation: Math.pow(i + j, 2) * Math.log(i + j + 1),
        },
      })),
    }));

    return complexData;
  }

  function renderComplexComponent(data) {
    const totalPrimes = data.reduce((sum, section) => sum + section.primes.length, 0);
    const averageFib = data[0].fibonacci.reduce((a, b) => a + b, 0) / data[0].fibonacci.length;

    const sectionsHtml = data.map(section => {
      const primesHtml = section.primes.map(prime =>
        `<div style="background-color: #e9d5ff; padding: 8px; text-align: center; border-radius: 4px; font-size: 14px; color: #581c87; border: 1px solid #d8b4fe;">${prime}</div>`
      ).join('');

      const fibsHtml = section.fibonacci.map(fib =>
        `<div style="background-color: #dcfce7; padding: 4px 12px; border-radius: 4px; font-size: 14px; color: #14532d; border: 1px solid #bbf7d0;">${fib}</div>`
      ).join('');

      const itemsHtml = section.items.map(item => `
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 4px; border: 1px solid #d1d5db; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
        <h4 style="font-weight: 600; color: #111827;">Item ${item.id}</h4>
        <p style="font-size: 14px; color: #4b5563;">${item.description}</p>
        <p style="font-size: 14px; color: #1f2937;">Value: ${item.value.toFixed(4)}</p>
        <div style="margin-top: 8px; font-size: 12px; color: #6b7280;">
          <p>Hash: ${item.metadata.hash}</p>
          <p>Complexity: ${item.metadata.complexity.toFixed(6)}</p>
          ${item.metadata.extraComputation ? `<p>Extra: ${item.metadata.extraComputation.toFixed(6)}</p>` : ''}
          <p>Timestamp: ${item.metadata.timestamp}</p>
        </div>
      </div>
    `).join('');

      return `
      <div style="margin-bottom: 32px; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; background-color: white; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #111827;">${section.title}</h2>

        <div style="margin-bottom: 16px;">
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #6b21a8;">Prime Numbers (200 samples)</h3>
          <div style="display: grid; grid-template-columns: repeat(10, 1fr); gap: 8px;">${primesHtml}</div>
        </div>

        <div style="margin-bottom: 16px;">
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #166534;">Fibonacci Sequence</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">${fibsHtml}</div>
        </div>

        <div>
          <h3 style="font-size: 20px; font-weight: 600; margin-bottom: 8px; color: #1e40af;">Items (${section.items.length})</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">${itemsHtml}</div>
        </div>
      </div>
    `;
    }).join('');

    const additionalComputations = Array.from({ length: 300 }, (_, i) => {
      const n = i + 1;
      const factorial = Array.from({ length: Math.min(n, 20) }, (_, j) => j + 1)
        .reduce((acc, val) => acc * val, 1);
      return `
      <div style="background-color: white; padding: 12px; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
        <p style="font-family: monospace; font-size: 14px; color: #1f2937;">n=${n}, f=${factorial.toExponential(2)}</p>
      </div>
    `;
    }).join('');

    return `
    <div style="padding: 32px; max-width: 1280px; margin: 0 auto; background-color: white; color: #111827;">
      <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 24px;">Complex Server-Rendered Component (Vanilla - SLOWER)</h1>

      <div style="margin-bottom: 32px; padding: 16px; border-radius: 8px; background-color: #f3f4f6; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="font-size: 24px; font-weight: 600; margin-bottom: 8px; color: #1f2937;">Statistics</h2>
        <p style="font-size: 18px;">Total Prime Numbers: ${totalPrimes}</p>
        <p style="font-size: 18px;">Average Fibonacci Value: ${averageFib.toFixed(2)}</p>
        <p style="font-size: 18px;">Total Sections: ${data.length}</p>
      </div>

      ${sectionsHtml}

      <div style="margin-top: 32px; padding: 24px; background-color: #f3f4f6; border-radius: 8px; border: 1px solid #e5e7eb; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Additional Computations</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">${additionalComputations}</div>
      </div>
    </div>
  `;
  }

  const data = generateSlowerComplexData();
  const currentTime = new Date().toLocaleString();

  const componentHtml = renderComplexComponent(data);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vanilla SSR Slower Benchmark - Vercel</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
      </style>
    </head>
    <body>
      <main style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh;">
        <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Slower Bench - Last rendered at:</h1>
        <p style="font-size: 18px; font-family: monospace; padding: 16px; border-radius: 4px;">${currentTime}</p>
        ${componentHtml}
      </main>
    </body>
    </html>
  `;

  const end = performance.now();
  return {
    totalTime: Math.round(end - start), html
  };
}
