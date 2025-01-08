# Baby Wish List

A Node.js proxy server (for Grist) plus a simple HTML page to display a baby gift list, allowing contributions and tracking states.

## Requirements

1. **Node.js** (version 18+ recommended)
2. **Python** (for the simple local server, if desired)
3. The following Node dependencies:
   - [express](https://www.npmjs.com/package/express)
   - [cors](https://www.npmjs.com/package/cors)
   - [node-fetch](https://www.npmjs.com/package/node-fetch) (or fetch built into Node 18+)
   - Optionally any other packages your `index.js` requires.

## Installation

1. **Clone or download** this repository, then open a terminal in that folder.
2. **Install Node dependencies**:
   ```bash
   npm install express cors node-fetch

## Getting Started

1. **Clone or download** the repository and navigate to the folder in your terminal.

2. **Run the Node server**:
   ```bash
   node index.js
   
This starts the proxy on port 3000 (or whichever port you have configured).

3. Open another terminal (in the same folder) and start a local server for the HTML page:
   ```bash
   python -m http.server 8080
   
 - You can also use any other static server you prefer.
 - This command will serve the current directory at http://localhost:8080.

Open the webpage in your browser by visiting: [Link](http://localhost:8080/index.html)

## Files Overview

- `index.js`
  Node.js server that proxies requests to your Grist API and handles the patch/get logic.
- `index.html` (or a similarly named file)
  Renders the baby wish list, allowing visitors to see which items are needed, contribute, or mark items as purchased.
