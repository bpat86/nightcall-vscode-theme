const API_URL = new URL("https://dummyjson.com/quotes/random");

async function fetchQuote({ signal } = {}) {
  const response = await fetch(API_URL, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  const { quote, author = "Unknown" } = await response.json();
  return { quote, author };
}

async function showQuote() {
  const controller = new AbortController();

  try {
    const result = await fetchQuote({ signal: controller.signal });
    document
      .querySelector("[data-quote]")
      ?.replaceChildren(`${result.quote} — ${result.author}`);
  } catch (error) {
    if (error.name !== "AbortError") console.error(error);
  }

  return () => controller.abort();
}

await showQuote();
