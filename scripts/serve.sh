#!/bin/sh
set -eu

BUNDLE_BIN="${BUNDLE_BIN:-/opt/homebrew/lib/ruby/gems/3.3.0/bin/bundle}"

if [ -x "$BUNDLE_BIN" ]; then
  exec "$BUNDLE_BIN" exec jekyll serve "$@"
fi

exec jekyll serve "$@"
