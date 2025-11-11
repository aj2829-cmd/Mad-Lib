const express = require('express');
const logger = require('morgan');
const path = require('path');

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Example test route
server.get('/do_a_random', (req, res) => {
  res.send(`Your number is: ${Math.floor(Math.random() * 100) + 1}`);
});

// POST route for Mad Lib
server.post('/ITC505/lab-7/index.html', (req, res) => {
  const { noun, pluralNoun, adjective, verb, place } = req.body;

  if (!noun || !pluralNoun || !adjective || !verb || !place) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out all fields before submitting.</p>
      <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
    return;
  }

  const madLib = `
    Once upon a time, there was a ${adjective} ${noun} who loved to ${verb}.
    Every day, it would travel to ${place} to meet its favorite ${pluralNoun}.
    Their ${adjective} adventures were known throughout the land.
  `;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Your Mad Lib Story</title>
      <link rel="stylesheet" href="/ITC505/lab-7/style.css">
    </head>
    <body>
      <main class="result">
        <h1>Your Mad Lib Story</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html" class="btn">Create Another Story</a>
      </main>
      <footer>
        <p>Last updated: <span id="lastModified"></span></p>
      </footer>
      <script>
        document.getElementById('lastModified').textContent = document.lastModified;
      </script>
    </body>
    </html>
  `);
});

// Port setup
let port = 80;
if (process.argv[2] === 'local') {
  port = 8080;
}

server.listen(port, () => console.log('✅ Ready on localhost!'));
