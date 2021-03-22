"use strict";

// Fetch a random joke
async function fetchQuote() {
  const rsp = await fetch("https://api.icndb.com/jokes/random"),
    data = await rsp.json();
  return data.value.joke;
}

async function sayJoke() {
  try {
    let result = await fetchQuote();
    document.writeln(`Joke: ${result}`);
  } catch (err) {
    console.error(err);
  }
}
sayJoke();
