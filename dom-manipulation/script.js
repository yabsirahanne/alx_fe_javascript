// Array to hold quote objects
const quotes = [
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" },
  { text: "Simplicity is the soul of efficiency.", category: "Design" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>— ${quote.category}</em>`;
}

// Function to add new quote from form
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

 function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText && newCategory) {
    // Add to array
    quotes.push({ text: newText, category: newCategory });

    // Save to localStorage
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Clear fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added!");
  } else {
    alert("Please fill out both fields.");
  }
}
// Dynamically create form elements and quote display area if needed
function createAddQuoteForm() {
  const container = document.getElementById("quoteApp");
  container.innerHTML = `
    <div>
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
      <button onclick="showRandomQuote()">Show Random Quote</button>
    </div>
    <div id="quoteDisplay" style="margin-top: 1em;"></div>
  `;
  async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://example.com/quotes.json"); // Replace with actual API endpoint
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    quotes.push(...data);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes loaded from server!");
  } catch (error) {
    console.error("Error fetching quotes:", error);
    alert("Failed to load quotes from server.");
  }
}
async function fetchQuotesFromMockAPI() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Failed to fetch quotes");

    const data = await response.json();

    // Just grabbing the first 5 mock posts as sample quotes
    const apiQuotes = data.slice(0, 5).map(post => ({
      text: post.title,
      category: "Mock API"
    }));

    quotes.push(...apiQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Mock API quotes loaded!");
  } catch (error) {
    console.error("Error:", error);
    alert("Unable to load quotes from mock API.");
  }
function addQuote() {
  const newText = document.getElementById("newQuoteText").value.trim();
  const newCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newText && newCategory) {
    const newQuote = { text: newText, category: newCategory };
    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    postQuoteToMockAPI(newQuote); // Send to mock API

    // Clear inputs
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    alert("Quote added!");
  } else {
    alert("Please fill out both fields.");
  }
}
async function postQuoteToMockAPI(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(quote)
    });

    const result = await response.json();
    console.log("Quote posted:", result);
    alert("Quote successfully posted to mock API!");
  } catch (error) {
    console.error("Error posting quote:", error);
    alert("Failed to post quote to server.");
  }
  if (newText && newCategory) {
  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  postQuoteToMockAPI(newQuote); // Send to server too
  ...
}
async function syncQuotes() {
  // 1. Load from localStorage if available
  const saved = localStorage.getItem("quotes");
  if (saved) {
    quotes.length = 0; // Clear existing
    quotes.push(...JSON.parse(saved));
  }

  // 2. Optionally fetch from server (if newer versions or backup exists)
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) throw new Error("Failed to sync from server");
    
    const serverData = await response.json();
    const serverQuotes = serverData.slice(0, 3).map(post => ({
      text: post.title,
      category: "Synced from Server"
    }));

    quotes.push(...serverQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    alert("Quotes synchronized from local and server sources.");
  } catch (err) {
    console.warn("Server sync skipped:", err.message);
  }
}
// Automatically sync new quotes from mock API every 60 seconds (60000 ms)
setInterval(() => {
  fetchQuotesFromMockAPI();
}, 60000);
function updateStatus(message, isError = false) {
  const statusEl = document.getElementById("statusMessage");
  statusEl.textContent = message;
  statusEl.style.color = isError ? "crimson" : "green";

  // Auto-clear after 5 seconds
  setTimeout(() => (statusEl.textContent = ""), 5000);
}
updateStatus("Quotes synced with server!");
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");

  quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>— ${quote.category}</em>`;

  // Save this quote to sessionStorage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}
window.addEventListener("DOMContentLoaded", () => {
  const stored = sessionStorage.getItem("lastViewedQuote");
  if (stored) {
    const quote = JSON.parse(stored);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>"${quote.text}"</p><em>— ${quote.category}</em>`;
  }
});
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
function importQuotes() {
  const fileInput = document.getElementById("importQuotesInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file to import.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format. Expected an array of quotes.");
      }
    } catch (err) {
      console.error("Error parsing file:", err);
      alert("Failed to import quotes.");
    }
  };
  reader.readAsText(file);
}
function populateCategories() {
  const filter = document.getElementById("categoryFilter");
  const categories = Array.from(new Set(quotes.map(q => q.category)));

  // Clear existing options (except "All Categories")
  filter.innerHTML = '<option value="">All Categories</option>';
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filter.appendChild(option);
  });
}
function filterQuote(searchTerm) {
  const term = searchTerm.toLowerCase();
  const filtered = quotes.filter(q =>
    q.text.toLowerCase().includes(term) ||
    q.category.toLowerCase().includes(term)
  );

  const quoteDisplay = document.getElementById("quoteDisplay");
  if (filtered.length > 0) {
    const randomQuote = filtered[Math.floor(Math.random() * filtered.length)];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><em>— ${randomQuote.category}</em>`;
  } else {
    quoteDisplay.innerHTML = `<p>No quotes matched your search.</p>`;
  }
}
let selectedCategory = ""; // global state

function filterBySelectedCategory() {
  selectedCategory = document.getElementById("categoryFilter").value;
  updateFilteredQuoteDisplay();
}

function updateFilteredQuoteDisplay() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const filteredQuotes = selectedCategory
    ? quotes.filter(q => q.category === selectedCategory)
    : quotes;

  if (filteredQuotes.length > 0) {
    const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><em>— ${randomQuote.category}</em>`;
  } else {
    quoteDisplay.innerHTML = "<p>No quotes found in this category.</p>";
  }
}
}