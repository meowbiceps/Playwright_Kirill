#!/usr/bin/env bash
set -euo pipefail

FLAVOR="${1:-chromium}" # chromium|chrome|firefox
shift || true

EXTRA_ARGS=("$@")

case "$FLAVOR" in
  chromium)
    IMAGE="playwright-chromium"
    DEFAULT_CMD=(npx playwright test --project=chromium)
    ;;
  chrome)
    IMAGE="playwright-chrome"
    DEFAULT_CMD=(npx playwright test --project=chrome)
    ;;
  firefox)
    IMAGE="playwright-chromium" # Firefox already included in Playwright image
    DEFAULT_CMD=(npx playwright test --project=firefox)
    ;;
  *)
    echo "Unknown flavor: $FLAVOR (use chromium|chrome|firefox)" >&2
    exit 1
    ;;
esac

mkdir -p test-results playwright-report

docker run --rm -it   --name pw-tests-"$FLAVOR"   --init   --ipc=host   -e CI=1   -e PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1   -v "$PWD":/work   -v "$PWD"/test-results:/work/test-results   -v "$PWD"/playwright-report:/work/playwright-report   -w /work   "$IMAGE"   "${DEFAULT_CMD[@]}" "${EXTRA_ARGS[@]}"
