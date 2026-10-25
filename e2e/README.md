# Selenium UI Tests

The JavaScript Selenium suite exercises JobTrack through a real Chrome browser. It covers opening the site, adding an application, company search, status filtering, status updates, editing, and deletion.

## Requirements

- Node.js 20 or newer and npm.
- Google Chrome installed.
- Dependencies installed with `npm install`.
- A locally running JobTrack development server.

Selenium Manager is included with Selenium WebDriver and normally locates or obtains the matching Chrome driver automatically. A restricted network may require a compatible ChromeDriver already available on the machine.

## Run the tests

In the first terminal, start the application:

```bash
npm run dev -- --host 127.0.0.1
```

Wait until Vite reports `http://127.0.0.1:5173`. In a second terminal, run:

```bash
npm run test:e2e
```

To test another local URL, set `JOBTRACK_BASE_URL` before running the command. PowerShell example:

```powershell
$env:JOBTRACK_BASE_URL='http://127.0.0.1:4173'
npm.cmd run test:e2e
```

## Expected result

The command launches headless Chrome and reports seven passing tests. Every test resets `jobtrack-applications` in LocalStorage, so results are isolated and do not depend on manually entered browser data. A failure reports the scenario and Selenium stack trace and exits with a non-zero status.
