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
          reject("Unable to parse the joke.");
        }
      });
    }).on("error", () => reject("Could not retrieve a joke."));
  });
}

function typeOut(text, speed = 40) {
  let i = 0;
  const interval = setInterval(() => {
    if (i >= text.length) {
      clearInterval(interval);
      process.stdout.write("\n"); // new line after joke
    } else {
      process.stdout.write(text[i]);
      i++;
    }
  }, speed);
}

(async () => {
  console.log("Getting a random joke...\n");
  try {
    const joke = await fetchJoke();
    typeOut(joke);
  } catch (err) {
    console.error("Oops! " + err);
  }
})();
