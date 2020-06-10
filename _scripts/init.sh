set -eu

CATEGORIES=true
TAGS=true
LASTMOD=true

WORK_DIR=$(dirname $(dirname $(realpath "$0")))


update_files() {
  bash _scripts/create_pages.sh

  find . | grep -E "(__pycache__|\.pyc|\.pyo$)" | xargs rm -rf
}


main() {

  cd $WORK_DIR


  update_files

  # commit
}

main
