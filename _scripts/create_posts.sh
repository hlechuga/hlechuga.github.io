#!/usr/local/bin/bash

set -eu

TYPE_CATEGORY=0
TYPE_TAG=1

category_count=0
tag_count=0


_read_yaml() {
  local _endline=$(grep -n "\-\-\-" $1 | cut -d: -f 1 | sed -n '2p')
  head -$_endline $1
}



read_date() {
  local _yaml=$(_read_yaml $1)
  echo "$_yaml" | grep "^date:" | awk '{print $2}' 
}


init() {
  if [[ -d _posts ]]; then
    rm -rf _posts
  fi

  mkdir _posts
}


create_posts() {
  local _name=$1
  local _filepath="_posts/$(echo $_name | sed 's/ /-/g' | awk '{print tolower($0)}').html"

  
}

main() {
  init

  for _file in $(ls "raw_posts")
  do
    local _path="raw_posts/$_file"
    local _date=$(read_date "$_path")

    cp raw_posts/$_file _posts/$_date-$_file
  done
}

main
