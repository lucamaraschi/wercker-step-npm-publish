publish () {
  local libraryName=$1;
  local npmEmail=$2;
  local npmKey=$3;
  local projectPath=$WERCKER_SOURCE_DIR;
  node "./bin/npm_publish" $projectPath $libraryName $npmEmail $npmKey $projectPath;
}

main() {
  publish "$LIBRARY_NAME"  "$NPM_EMAIL" "$NPM_KEY";
}
