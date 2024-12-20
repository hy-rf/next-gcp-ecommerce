(async () => {
  const urlsToWarmUp = [
    "http://localhost:3000/",
    "http://localhost:3000/product",
    "http://localhost:3000/login",
  ];
  console.log("Warming up pages...");
  for (const url of urlsToWarmUp) {
    try {
      const res = await fetch(url, {
        headers: {
          "Accept-Language": "en-US,en;q=0.5",
        },
      });
      console.log(`${url} - ${res.status}`);
    } catch (err) {
      console.error(`Error warming up ${url}:`, err.message);
    }
  }
  console.log("Pages warmed up!");
})();
