import { Hono } from "hono";

const app = new Hono();

const jokes = [
  {
    setup: "Why don't scientists trust atoms?",
    punchline: "Because they make up everything!"
  },
  {
    setup: "What do you call a bear with no teeth?",
    punchline: "A gummy bear!"
  },
  {
    setup: "Why did the scarecrow win an award?",
    punchline: "Because he was outstanding in his field!"
  },
  {
    setup: "What do you call a fake noodle?",
    punchline: "An impasta!"
  },
  {
    setup: "Why did the bicycle fall over?",
    punchline: "Because it was two-tired!"
  },
  {
    setup: "What do you call cheese that isn't yours?",
    punchline: "Nacho cheese!"
  },
  {
    setup: "Why couldn't the leopard play hide and seek?",
    punchline: "Because he was always spotted!"
  },
  {
    setup: "What did the ocean say to the beach?",
    punchline: "Nothing, it just waved!"
  }
];

app.get("/", (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Joke Telling App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
          }
          h1 {
            font-size: 2.5em;
            margin-bottom: 30px;
          }
          .joke-container {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin: 20px 0;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          }
          .setup {
            font-size: 1.5em;
            margin-bottom: 20px;
            font-weight: bold;
          }
          .punchline {
            font-size: 1.3em;
            color: #ffd700;
            display: none;
            margin-top: 20px;
          }
          button {
            background: #ffd700;
            color: #333;
            border: none;
            padding: 15px 30px;
            font-size: 1.1em;
            border-radius: 25px;
            cursor: pointer;
            margin: 10px;
            font-weight: bold;
            transition: transform 0.2s;
          }
          button:hover {
            transform: scale(1.05);
          }
          button:active {
            transform: scale(0.95);
          }
        </style>
      </head>
      <body>
        <h1>Joke Telling App</h1>
        <div class="joke-container">
          <div class="setup" id="setup">Click the button to get a joke!</div>
          <div class="punchline" id="punchline"></div>
        </div>
        <button onclick="getJoke()">Tell Me a Joke</button>
        <button onclick="showPunchline()" id="punchlineBtn" style="display: none;">Show Punchline</button>

        <script>
          let currentJoke = null;

          async function getJoke() {
            const response = await fetch('/api/joke');
            const joke = await response.json();
            currentJoke = joke;

            document.getElementById('setup').textContent = joke.setup;
            document.getElementById('punchline').textContent = joke.punchline;
            document.getElementById('punchline').style.display = 'none';
            document.getElementById('punchlineBtn').style.display = 'inline-block';
          }

          function showPunchline() {
            document.getElementById('punchline').style.display = 'block';
            document.getElementById('punchlineBtn').style.display = 'none';
          }
        </script>
      </body>
    </html>
  `);
});

app.get("/api/joke", (c) => {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  return c.json(randomJoke);
});

Deno.serve({
  port: 8080,
  handler: app.fetch,
  onListen: () => {
    console.log("Server is running on port 8080");
  },
});
