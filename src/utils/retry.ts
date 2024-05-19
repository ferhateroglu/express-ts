const retry = async (fn: () => Promise<void>, retries: number, delay: number) => {
  for (let i = 0; i < retries; i++) {
    try {
      await fn();
      return; // Başarılı olursa fonksiyonu sonlandır
    } catch (err) {
      console.error(`Attempt ${i + 1} failed:`, err);
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay)); // Gecikme süresi kadar bekle
      } else {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
    }
  }
};

export { retry };
