#!/bin/bash

# Create a Sentry release and upload sources/source maps:
#  ./upload-sourcemaps.sh
#
# Delete all sources/source maps of the current release:
#  ./upload-sourcemaps.sh delete
#
# Prerequisites:
#  * The sentry-cli must be present
#    (see https://docs.sentry.io/cli/installation/)
#  * Provide the following settings as env variables or
#    in a .env file in the same directory:
#      SENTRY_URL=https://sentry.puzzle.ch
#      SENTRY_ORG=pitc
#      SENTRY_PROJECT=<slug of the sentry project>
#      SENTRY_AUTH_TOKEN=<token>


# Release identifier, usually current commit hash
VERSION=`git rev-parse HEAD`

# Directory with the minified source files (.js) and their
# corresponding source maps (.map)
NPM_BIN=`npm bin`
SOURCES_PATH=`$NPM_BIN/ng config "projects.$($NPM_BIN/ng config defaultProject).architect.build.options.outputPath"`

# URL prefix, '~' stands for the protocol/hostname part
# (trailing slash is mandatory!)
URL_PREFIX="~/"


if [ "$1" == "delete" ]; then
  sentry-cli releases files $VERSION delete --all
else
  # sentry-cli releases new $VERSION

  # The upload-sourcemaps command implicitly creates a release if not
  # existing, `releases new` is therefore not necessary if only
  # uploading sourcemaps
  sentry-cli releases files $VERSION upload-sourcemaps \
             --ext=.js \
             --ext=.map \
             --no-rewrite \
             $SOURCES_PATH
             # --url-prefix="$URL_PREFIX" \

  sentry-cli releases set-commits $VERSION --auto
  sentry-cli releases finalize $VERSION
fi
