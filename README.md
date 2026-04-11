# Wordly Dictionary SPA

A Single Page Application (SPA) that lets users search for words, listen to pronunciations, and save favorite terms without reloading the page.

## Features

- Search for words and fetch definitions from the Free Dictionary API
- Display pronunciation text and audio playback controls
- Show part of speech, definitions, examples, synonyms, and antonyms
- Save favorite words locally and revisit them with one click
- Clean cream-themed interface with rounded search controls
- Error handling for invalid or missing words

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Free Dictionary API (`https://api.dictionaryapi.dev/`)

## How to Use

1. Open `index.html` in a web browser
2. Type a word into the search box
3. Click the search button or press Enter
4. Review the displayed definition, pronunciation, synonyms, and antonyms
5. Click the **Save** button to add the word to the saved list
6. Click a saved word to look it up again instantly

## Notes

- The saved words list is stored in `localStorage`, so saved favorites remain available across browser sessions.
- The audio playback uses the pronunciation URL returned by the API.

## File Structure

- `index.html`: Main HTML structure and page layout
- `style.css`: Styling for the app theme and interactive elements
- `index.js`: Main app logic, event handling, and saved-word behavior
- `dictionary.js`: Dictionary fetch logic and result rendering
- `README.md`: Project documentation

## API Reference

The app uses the Free Dictionary API: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
