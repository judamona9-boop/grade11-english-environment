[README.txt](https://github.com/user-attachments/files/34223891/README.txt)
# Grade 11 English Learning Environment — Prototype

## Files
- `index.html`: page structure and learning content
- `styles.css`: responsive visual design
- `script.js`: navigation, language toggle, sample practice, prompt copying, and Milo demo

## Run locally
Open `index.html` in a modern browser. Some browser features (such as clipboard access) work best over HTTPS or localhost.

## Important limitations
- Milo is a local demo with sample responses. It is NOT connected to Gemini or another live AI service.
- The feedback form creates a local text file; it does not collect or store research data.
- Sample practice tasks are illustrative. Check and align all learning material with the official Grade 11 Palestine Unit 3 and Unit 4 textbook, approved audio, and your research instruments before student use.
- The quiz questions are sample questions, not a validated achievement test.
- Do not place an API key in browser JavaScript. For a live AI assistant, create a backend/serverless function and store the API key securely there.
- To publish as a standalone website, deploy these files to a static host (e.g. GitHub Pages, Netlify, or Firebase Hosting). To use inside Google Sites, host the site first and then use Insert > Embed > URL. Google Sites cannot directly replace its native pages with raw HTML/CSS/JS.
- Connect an approved Google Form or other authorized research collection method before gathering participant feedback.

## Suggested next steps
1. Replace placeholder/sample tasks with verified content from Units 3 and 4.
2. Add teacher-approved audio files and transcripts.
3. Connect the feedback button to the approved questionnaire.
4. If required, integrate a secured backend for the Milo assistant.
5. Test on student devices, accessibility, and connectivity before the study.


VISUAL UPDATE
- Added a welcoming animated start screen, colourful gradient design, motion effects and photography.
- Added optional cheerful background tones and feedback chimes. Audio is off by default and starts only when a user clicks the music button, because browsers block automatic sound.
- Photos and Google Fonts are loaded from the internet, so they need an internet connection.
- The background music is a simple original synthesized melody, not a downloaded song.
- The site is still a prototype. Milo uses sample responses, and the feedback form only downloads a local text file; it does not collect or send student data.
