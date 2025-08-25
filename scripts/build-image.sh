#!/usr/bin/env bash
set -euo pipefail

FLAVOR="${1:-chromium}" # chromium|chrome
case "$FLAVOR" in
  chromium)
    docker build -t playwright-chromium -f Dockerfile.chromium .
    ;;
  chrome)
    docker build -t playwright-chrome -f Dockerfile.chrome .
    ;;
  *)
    echo "Unknown flavor: $FLAVOR (use 'chromium' or 'chrome')" >&2
    exit 1
    ;;
esac
