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
}