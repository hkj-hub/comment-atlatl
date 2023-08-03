#!/bin/bash

# https://note.com/mumumu170/n/n3fea048af5a2
# https://vercel.com/docs/concepts/projects/project-configuration#ignorecommand
echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

# プレビュー環境`release/*`ブランチ と 本番環境の`main`ブランチ の時のみデプロイ
if [[ "$VERCEL_GIT_COMMIT_REF" == release/* || "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  # Proceed with the build
  echo "✅ - Build can proceed"
  exit 1;

else
  # Don't build
  echo "🛑 - Build cancelled"
  exit 0;
fi