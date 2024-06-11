#!/bin/bash

# TODO: Add Mac and Windows prereq installs (see checkWindowsPrereqs() in index.js)
# TODO: OpenSSL...
# TODO: Need a sudo apt install for npm after nodejs

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
  # echo -e "Updating apt-get packages"
  # sudo apt-get update
  # sudo apt-get upgrade -y

  echo -e "\nChecking for dependencies"

  if command -v node >/dev/null 2>&1; then
      echo -e "\nNode.js is installed. Version:"
      node -v
  else
      echo -e "\nRun these lines to install Node.js"
      echo -e "curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -"
      echo -e "sudo apt install -y nodejs"
      exit
      # echo -e "\nInstalling Node.js"
      # cd ~
      # curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
      # sudo apt install -y nodejs
  fi

  if command -v yarn >/dev/null 2>&1; then
      echo -e "\nYarn is installed. Version:"
      yarn -v
  else
      echo -e "\nRun this line to install Yarn"
      echo -e "sudo npm i yarn -g"
      exit
      # echo -e "\nInstalling Yarn"
      # sudo npm i yarn -g
  fi

  if command -v git >/dev/null 2>&1; then
      echo -e "\nGit is installed. Version:"
      git --version
  else
      echo -e "\nRun this line to install Git"
      echo -e "sudo apt-get install git-all -y"
      exit
      # echo -e "\nInstalling Git"
      # sudo apt-get install git-all -y
  fi

  # if command -v lz4 >/dev/null 2>&1; then
  #     echo -e "\nLZ4 is installed. Version:"
  #     lz4 --version
  # else
  #     echo -e "\nInstalling LZ4"
  #     sudo apt-get install lz4
  # fi

  # if npm list -g pm2 >/dev/null 2>&1; then
  #   echo -e "\npm2 is installed."
  # else
  #   echo -e "\Run this line to install pm2"
  #   echo -e "sudo npm install pm2@latest -g"
  #   exit
  #   # echo -e "\nInstalling pm2."
  #   # sudo npm install pm2@latest -g
  # fi

  if command -v make >/dev/null 2>&1; then
      echo -e "\nGNU Make is installed. Version:"
      yarn -v
  else
      echo -e "\nRun this line to install GNU Make"
      echo -e "sudo apt-get install build-essential"
      exit
      # echo -e "\nInstalling Yarn"
      # sudo npm i yarn -g
  fi
fi

if [ "$os_name" = "Darwin" ]; then
  echo -e "\nChecking for dependencies"

  if command -v node >/dev/null 2>&1; then
      echo -e "\nNode.js is installed. Version:"
      node -v
  else
      echo -e "\nRun this line to install Node.js"
      echo -e "brew install node"
      exit
  fi

  if command -v yarn >/dev/null 2>&1; then
      echo -e "\nYarn is installed. Version:"
      yarn -v
  else
      echo -e "\nRun this line to install Yarn"
      echo -e "brew install yarn"
      exit
  fi

  if command -v git >/dev/null 2>&1; then
      echo -e "\nGit is installed. Version:"
      git --version
  else
      echo -e "\nRun this line to install Git"
      echo -e "brew install git"
      exit
  fi

  # if npm list -g pm2 >/dev/null 2>&1; then
  #   echo -e "\npm2 is installed."
  # else
  #   echo -e "\nRun this line to install pm2:"
  #   echo "npm i -g pm2"
  #   exit
  # fi

  if command -v make >/dev/null 2>&1; then
      echo -e "\nGNU Make is installed. Version:"
      yarn -v
  else
      echo -e "\nRun this line to install GNU Make"
      echo -e "brew install make"
      exit
      # echo -e "\nInstalling Yarn"
      # sudo npm i yarn -g
  fi

  if command -v gpg >/dev/null 2>&1; then
    echo -e "\ngnupg is installed."
  else
    echo -e "\nRun this line to install gnupg:"
    echo "brew install gnupg"
    exit
  fi

  if perl -MDigest::SHA -e '1' >/dev/null 2>&1; then
    echo -e "\nperl-Digest-SHA is installed."
  else
    echo -e "\nRun these lines to install perl-Digest-SHA"
    echo "brew install perl"
    echo "brew install cpanminus"
    echo "cpanm Digest::SHA"
    exit
  fi
fi

if [ ! -d "$HOME/buidlguidl-client" ]; then
  echo -e "\n🚀 Cloning buidlguidl-client repo"
  cd ~
  git clone https://github.com/BuidlGuidl/buidlguidl-client.git
  cd buidlguidl-client
  yarn install
else
  echo -e "\n⌛️ Updating buidlguidl-client repo"
  cd "$HOME/buidlguidl-client"
  git pull
fi

cd "$HOME/buidlguidl-client"
node index.js
