# Playwright + Docker (Chrome / Chromium) Quick Start

This kit gives you two options:
- **Chromium** only (`Dockerfile.chromium`) — simplest, uses the official Playwright image with browsers baked in.
- **Google Chrome Stable** (`Dockerfile.chrome`) — same as above but also installs `google-chrome-stable` and runs tests with `channel: 'chrome'`.

## 1) Build image
```bash
# Chromium
./scripts/build-image.sh chromium

# Google Chrome
./scripts/build-image.sh chrome

# Firefox
./scripts/build-image.sh firefox
```

## 2) Run tests
```bash
# Chromium
./scripts/run-tests.sh chromium

# Google Chrome
./scripts/run-tests.sh chrome

# Firefox
./scripts/run-tests.sh firefox
```

Pass extra args directly to Playwright:
```bash
./scripts/run-tests.sh chrome -- grep "@smoke" --reporter=html
```

## 3) Open a shell (debug inside container)
```bash
./scripts/shell.sh chrome   # or chromium
```

## 4) Stop containers (cleanup)
```bash
./scripts/stop.sh
```

## Headed mode inside Docker
Use xvfb to emulate a display:
```bash
./scripts/run-tests.sh chromium -- --headed
# or
./scripts/run-tests.sh chrome -- --headed
# or 
./scripts/run-tests.sh firefox -- --headed
```
The official image includes everything needed; Playwright will run headless by default.

## Notes
- Make sure your local `@playwright/test` version matches the Docker image tag for best compatibility.
- Volumes `./test-results` and `./playwright-report` are mounted so reports persist on the host.
- We use `--ipc=host` as recommended by the Playwright docs to avoid Chromium crashes under memory pressure.
