// main.js - Terminal joke typer 🤖💬

const https = require("https");

function fetchJoke() {
  return new Promise((resolve, reject) => {
    https.get("https://official-joke-api.appspot.com/random_joke", (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const joke = JSON.parse(data);
          resolve(`${joke.setup}\n${joke.punchline}`);
        } catch (err) {
          reject("Failed to parse joke.");
        }
      });
    }).on("error", (err) => reject("Request failed."));
  });
}

function typeOut(text, speed = 50) {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
    } else {
      process.stdout.write(text[i]);
      i++;
    }
  }, speed);
}

(async () => {
  console.log("Fetching a joke for you...\n");
  try {
    const joke = await fetchJoke();
    typeOut(joke);
  } catch (err) {
    console.error("Error:", err);
  }
})();
