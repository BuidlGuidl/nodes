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
  
  if command -v brew >/dev/null 2>&1; then
      color "36" "Homebrew is installed. Version:"
      brew -v
  else
      color "31" "Please install Homebrew (https://brew.sh)"
      exit 1
  fi

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

  if command -v yarn >/dev/null 2>&1; then
      color "36" "Yarn is installed. Version:"
      yarn -v
  else
      color "31" "Please install yarn (https://yarnpkg.com/getting-started/install)"
      exit 1
  fi
  echo -e "\n"
  # ---------- Check For Dependencies ----------

  # ---------- Install Execution Client ----------
  if [ "$e" == "geth" ]; then
    if ! command -v geth >/dev/null 2>&1; then
      echo "Installing Geth."
      brew tap ethereum/ethereum
      brew install ethereum
    else
      color "36" "Geth is already installed. Version:"
      geth -v
    fi
  elif [ "$e" == "reth" ]; then
    if ! command -v reth >/dev/null 2>&1; then
      echo "Installing Reth."
      brew install paradigmxyz/brew/reth
    else
      color "36" "Reth is already installed. Version:"
      reth --version
    fi
  fi
  # ---------- Install Execution Client ----------

  # ---------- Install Consensus Client ----------
  if [ ! -d "$HOME/node/jwt" ]; then
    echo "Creating '~/node/jwt'"
    mkdir -p "$HOME/node/jwt"
  fi

  if ! command -v gpg >/dev/null 2>&1; then
    echo "Installing gpg (required for jwt.hex creation)."
    brew install gpg
  fi

  if [ "$c" == "prysm" ]; then
    if [ ! -f "$HOME/node/prysm/prysm.sh" ]; then
      echo "Installing Prysm."
      if [ ! -d "$HOME/node/prysm" ]; then
        echo "Creating '~/node/prysm'"
        mkdir -p "$HOME/node/prysm"
      fi
      cd "$HOME/node/prysm"
      curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
      echo "Creating JWT secret."
      ./prysm.sh beacon-chain generate-auth-secret
      mv jwt.hex ../jwt/jwt.hex
    else
      color "36" "Prysm is already installed."
    fi
  elif [ "$c" == "lighthouse" ]; then
    if ! command -v lighthouse >/dev/null 2>&1; then
      echo "Installing Lighthouse."
      brew install lighthouse
    else
      color "36" "Lighthouse is already installed. Version:"
      lighthouse --version
    fi
  fi
  # ---------- Install Consensus Client ----------
fi
# -------------------- For Linux /MacOS --------------------

# cd ~/node/prysm
# ./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --mainnet --jwt-secret=~/node/jwt/jwt.hex --grpc-gateway-host=0.0.0.0 --grpc-gateway-port=3500
# geth --mainnet --http --http.api eth,net,engine,admin --http.addr 0.0.0.0 --authrpc.jwtsecret=~/node/jwt/jwt.hex --syncmode full

# node helloWorld.js