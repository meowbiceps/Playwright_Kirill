#!/usr/bin/env bash
# Stops and removes a running test container if present.
set -euo pipefail
for name in pw-tests-chromium pw-tests-chrome pw-shell-chromium pw-shell-chrome; do
  if docker ps -a --format '{{.Names}}' | grep -q "^${name}$"; then
    docker rm -f "${name}" >/dev/null 2>&1 || true
    echo "Removed ${name}"
  fi
done
