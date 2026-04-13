import {
  searchWord,
  displayResults,
  displayError,
  playAudio,
} from "./dictionary.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const results = document.getElementById("results");
  const savedList = document.getElementById("saved-list");

  window.playAudio = playAudio;

  displaySavedWords();

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) {
      results.innerHTML = displayError("Please enter a word to search.");
      return;
    }
    results.innerHTML = '<div class="loading">Searching...</div>';
    try {
      const data = await searchWord(word);
      results.innerHTML = displayResults(data);
    } catch (error) {
      results.innerHTML = displayError(
        error.message === "Word not found"
          ? `Sorry, we couldn't find the word "${word}".`
          : "An error occurred. Please try again.",
      );
    }
  });

  function saveWord(word) {
    let saved = JSON.parse(localStorage.getItem("savedWords") || "[]");
    if (!saved.includes(word)) {
      saved.push(word);
      localStorage.setItem("savedWords", JSON.stringify(saved));
      displaySavedWords();
    }
  }

  function deleteWord(word) {
    let saved = JSON.parse(localStorage.getItem("savedWords") || "[]");
    saved = saved.filter((w) => w !== word);
    localStorage.setItem("savedWords", JSON.stringify(saved));
    displaySavedWords();
  }

  function displaySavedWords() {
    const saved = JSON.parse(localStorage.getItem("savedWords") || "[]");
    savedList.innerHTML = saved
      .map(
        (word) =>
          `<div class="saved-word-container">
            <span class="saved-word" onclick="searchSavedWord('${word}')">${word}</span>
            <button class="delete-btn" onclick="deleteWord('${word}')">×</button>
          </div>`,
      )
      .join("");
  }

  window.saveWord = saveWord;
  window.deleteWord = deleteWord;
  window.searchSavedWord = async function (word) {
    input.value = word;
    // Trigger search
    const event = new Event("submit");
    form.dispatchEvent(event);
  };
});
