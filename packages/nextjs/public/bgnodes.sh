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

# ---------- Process command-line options ----------
while getopts ":e:c:h" opt; do
  case ${opt} in
    e )
      e=$OPTARG
      # Validate the execution client option
      if [[ $e != "geth" && $e != "reth" ]]; then
        echo "Invalid option for -e. Use 'geth' or 'reth'."
        exit 1
      fi
      ;;
    c )
      c=$OPTARG
      # Validate the consensus client option
      if [[ $c != "prysm" && $c != "lighthouse" ]]; then
        echo "Invalid option for -c. Use 'prysm' or 'lighthouse'."
        exit 1
      fi
      ;;
    h )
      show_help
      exit 0
      ;;
    \? )
      echo "Invalid option: -$OPTARG" 1>&2
      show_help
      exit 1
      ;;
    : )
      echo "Option -$OPTARG requires an argument." 1>&2
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
      echo "Homebrew is installed. Version:"
      brew -v
  else
      echo "Please install Homebrew (https://brew.sh)"
      exit 1
  fi

  if command -v node >/dev/null 2>&1; then
      node_version=$(node -v | cut -d 'v' -f 2 | awk -F '.' '{print $1 "." $2}')

      if awk "BEGIN {exit !($node_version >= 18.17)}"; then
          echo "Node.js is installed. Version:"
          node -v
      else
          echo "Node.js version is less than 18.17. Please update to at least v18.17 (https://nodejs.org/en/download)"
          exit 1
      fi
  else
      echo "Please install Node.js (https://nodejs.org/en/download)"
      exit 1
  fi

  if command -v yarn >/dev/null 2>&1; then
      echo "Yarn is installed. Version:"
      yarn -v
  else
      echo "Please install yarn (https://yarnpkg.com/getting-started/install)"
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
      echo "Geth is already installed. Version:"
      geth -v
    fi
  elif [ "$e" == "reth" ]; then
      echo "Installing Reth."
      # Todo: Add reth install code
  fi
  # ---------- Install Execution Client ----------

  # ---------- Install Consensus Client ----------
  if [ ! -d "$HOME/ethereum/jwt" ]; then
    echo "Creating '~/ethereum/jwt'"
    mkdir -p "$HOME/ethereum/jwt"
  fi

  if [ "$c" == "prysm" ]; then
    if [ ! -f "$HOME/ethereum/prysm/prysm.sh" ]; then
      echo "Installing Prysm."
      if [ ! -d "$HOME/ethereum/prysm" ]; then
        echo "Creating '~/ethereum/prysm'"
        mkdir -p "$HOME/ethereum/prysm"
      fi
      cd "$HOME/ethereum/prysm"
      curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh

      if ! command -v gpg >/dev/null 2>&1; then
        echo "Installing gpg (required for jwt.hex creation)."
        brew install gpg
      fi

      echo "Creating JWT secret."
      ./prysm.sh beacon-chain generate-auth-secret
      mv jwt.hex ../jwt/jwt.hex
    else
      echo "Prysm is already installed."
    fi
  elif [ "$c" == "lighthouse" ]; then
      echo "Installing Lighthouse."
      # Todo: Add Lighthouse install code
  fi
  # ---------- Install Consensus Client ----------
fi
# -------------------- For Linux /MacOS --------------------

# ./prysm.sh beacon-chain --execution-endpoint=http://localhost:8551 --mainnet --jwt-secret=/home/buidlguidl/ethereum/jwt.hex --grpc-gateway-host=0.0.0.0 --grpc-gateway-port=3500
# geth --mainnet --http --http.api eth,net,engine,admin --http.addr 0.0.0.0 --authrpc.jwtsecret=../jwt.hex --syncmode full

# node helloWorld.js