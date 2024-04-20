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

# Process command-line options
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

echo "Execution client selected: $e"
echo -e "Consensus client selected: $c\n"

os_name=$(uname -s)
echo -e "The operating system is: $os_name\n"

echo -e "Checking for dependencies"
if command -v node >/dev/null 2>&1; then
    echo "Node.js is installed. Version:"
    node -v
else
    echo "Please install node.js (https://nodejs.org/en/download)"
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

if [ ! -d "$HOME/ethereum/consensus" ]; then
    echo "Creating '~/ethereum/consensus'"
    mkdir -p "$HOME/ethereum/consensus"
fi

# if [ "$e" == "geth" ]; then
#     echo "The execution client is Geth."
# elif [ "$e" == "reth" ]; then
#     echo "The execution client is Reth."
# fi

if [ ! -d "$HOME/ethereum/execution" ]; then
    echo "Creating '~/ethereum/execution'"
    mkdir -p "$HOME/ethereum/execution"
fi

if [ "$c" == "prysm" ]; then
  if [ ! -f "$HOME/ethereum/execution/prysm.sh" ]; then
    echo "Installing Prysm."
    cd "$HOME/ethereum/execution"
    curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output prysm.sh && chmod +x prysm.sh
  else
    echo "Prysm is already installed."
  fi
elif [ "$c" == "lighthouse" ]; then
    echo "Installing Lighthouse."
    # Todo: Add Lighthouse install code
fi



# node helloWorld.js