(async () => {
  const urlsToWarmUp = [
    "http://localhost:3000/",
    "http://localhost:3000/product",
  ];
  console.log("Warming up pages...");
  for (const url of urlsToWarmUp) {
    try {
      const res = await fetch(url);
      console.log(`${url} - ${res.status}`);
    } catch (err) {
      console.error(`Error warming up ${url}:`, err.message);
    }
  }
  console.log("Pages warmed up!");
})();
