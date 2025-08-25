#!/usr/bin/env bash
set -euo pipefail

FLAVOR="${1:-chromium}" # chromium|chrome

IMAGE="playwright-${FLAVOR}"
docker run --rm -it   --name pw-shell-"$FLAVOR"   --init   --ipc=host   -e CI=1   -e PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1   -v "$PWD":/work   -w /work   "$IMAGE"   bash
