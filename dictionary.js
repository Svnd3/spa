export async function searchWord(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
    );
    if (!response.ok) {
      throw new Error("Word not found");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    throw error;
  }
}

export function displayResults(data) {
  const { word, phonetic, phonetics, meanings } = data;
  let html = `<h2 class="word">${word} <button class="save-btn" onclick="saveWord('${word}')">Save</button></h2>`;
  if (phonetic) {
    html += `<p class="phonetic">${phonetic}</p>`;
  }

  // Find the first available audio URL
  const audioUrl = phonetics.find((phonetic) => phonetic.audio)?.audio;
  if (audioUrl) {
    html += `<div class="audio">
                    <button onclick="playAudio('${audioUrl}')">🔊 Play Pronunciation</button>
                </div>`;
  }
  function formatWordList(label, items, className) {
    if (!items || items.length === 0) {
      return "";
    }
    return `<div class="${className}"><strong>${label}:</strong> ${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
  }

  meanings.forEach((meaning) => {
    html += `<div class="meaning">
                <h3 class="part-of-speech">${meaning.partOfSpeech}</h3>`;
    meaning.definitions.forEach((def) => {
      html += `<p class="definition">${def.definition}</p>`;
      if (def.example) {
        html += `<p class="example">Example: ${def.example}</p>`;
      }
    });
    html += formatWordList("Synonyms", meaning.synonyms, "synonyms");
    html += formatWordList("Antonyms", meaning.antonyms, "antonyms");
    html += `</div>`;
  });
  return html;
}

export function displayError(message) {
  return `<div class="error">${message}</div>`;
}

export function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}
