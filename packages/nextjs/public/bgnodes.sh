#!/bin/bash

# Default values for the options
e="geth"
c="prysm"

# Help function to display usage information
show_help() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -e <client>  Specify the execution client ('geth' or 'reth')"
    echo "  -c <client>  Specify the consensus client ('prysm' or 'lighthouse')"
    echo "  -h           Display this help message and exit"
    echo ""
}

function color() {
    # Usage: color "31;5" "string"
    # Some valid values for color:
    # - 5 blink, 1 strong, 4 underlined
    # - fg: 31 red,  32 green, 33 yellow, 34 blue, 35 purple, 36 cyan, 37 white
    # - bg: 40 black, 41 red, 44 blue, 45 purple
    printf '\033[%sm%s\033[0m\n' "$@"
}

# ---------- Process command-line options ----------
while getopts ":e:c:h" opt; do
  case ${opt} in
    e )
      e=$OPTARG
      # Validate the execution client option
      if [[ $e != "geth" && $e != "reth" ]]; then
        color "31" "Invalid option for -e. Use 'geth' or 'reth'."
        exit 1
      fi
      ;;
    c )
      c=$OPTARG
      # Validate the consensus client option
      if [[ $c != "prysm" && $c != "lighthouse" ]]; then
        color "31" "Invalid option for -c. Use 'prysm' or 'lighthouse'."
        exit 1
      fi
      ;;
    h )
      show_help
      exit 0
      ;;
    \? )
      color "31" "Invalid option: -$OPTARG"  1>&2
      show_help
      exit 1
      ;;
    : )
      color "31" "Option -$OPTARG requires an argument."  1>&2
      exit 1
      ;;
  esac
done
# ---------- Process command-line options ----------

echo "Execution client selected: $e"
echo -e "Consensus client selected: $c\n"

os_name=$(uname -s)

# -------------------- For Linux/MacOS --------------------
if [ "$os_name" = "Darwin" ] || [ "$os_name" = "Linux" ]; then
  # ---------- Check For Dependencies ----------
  echo -e "Checking for dependencies"

  if command -v node >/dev/null 2>&1; then
      node_version=$(node -v | cut -d 'v' -f 2 | awk -F '.' '{print $1 "." $2}')

      if awk "BEGIN {exit !($node_version >= 18.17)}"; then
          color "36" "Node.js is installed. Version:"
          node -v
      else
          color "31" "Node.js version is less than 18.17. Please update to at least v18.17 (https://nodejs.org/en/download)"
          exit 1
      fi
  else
      color "31" "Please install Node.js (https://nodejs.org/en/download)"
      exit 1
  fi
  echo -e "\n"
  # ---------- Check For Dependencies ----------
fi
# -------------------- For Linux /MacOS --------------------

curl http://localhost:3000/bgnodes.js -o ~/bgnodes.js
node ~/bgnodes.js -e $e -c $c