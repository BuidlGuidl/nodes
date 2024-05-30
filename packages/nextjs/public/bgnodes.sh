#!/bin/bash

# TODO: Add Mac and Windows prereq installs (see checkWindowsPrereqs() in index.js)
# TODO: Make sure curl (not default on Linux) and wget (not default on mac) is installed (check windows availability too)

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

if [ "$os_name" = "Linux" ]; then
  echo -e "Updating apt-get packages"
  sudo apt-get update
  sudo apt-get upgrade -y

  echo -e "Checking for dependencies"

  if command -v node >/dev/null 2>&1; then
      echo -e "Node.js is installed. Version:"
      node -v
  else
      echo -e "Installing Node.js"
      cd ~
      curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
      sudo apt install -y nodejs
  fi

  if command -v yarn >/dev/null 2>&1; then
      echo -e "Yarn is installed. Version:"
      yarn -v
  else
      echo -e "Installing Yarn"
      sudo npm i yarn -g
  fi

  if command -v git >/dev/null 2>&1; then
      echo -e "Git is installed. Version:"
      git --version
  else
      echo -e "Installing Git"
      sudo apt-get install git-all -y
  fi

  if command -v lz4 >/dev/null 2>&1; then
      echo -e "LZ4 is installed. Version:"
      lz4 --version
  else
      echo -e "Installing LZ4"
      sudo apt-get install lz4
  fi

  if npm list -g pm2 >/dev/null 2>&1; then
    echo -e "pm2 is installed."
  else
    echo -e "Installing pm2."
    sudo npm install pm2@latest -g
  fi
fi

# if [ "$os_name" = "Darwin" ]; then
#   if npm list -g pm2 >/dev/null 2>&1; then
#     color "36" "pm2 is installed."
#   else
#     color "1" "Installing pm2."
#     npm install pm2@latest -g
#   fi
# fi

if [ ! -d "~/nodes-script" ]; then
  echo -e "Cloning BGNodes repo"
  cd ~
  git clone https://github.com/BuidlGuidl/nodes-script.git
  cd nodes-script
  yarn install
fi

cd ~/nodes-script
node index.js
