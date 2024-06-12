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

echo "🕸 Execution client selected: $e"
echo -e "🕸 Consensus client selected: $c\n"

os_name=$(uname -s)

if [ "$os_name" = "Linux" ]; then
  echo -e "\n💪 Updating apt-get packages"
  sudo apt-get update
  sudo apt-get upgrade -y

  echo -e "\n🕵️ Checking for dependencies\n"

  if command -v node >/dev/null 2>&1; then
      echo -e "\n✅ Node is installed. Version:"
      node -v
  else
    read -r -p "❓ Node is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "\n💪 Installing Node"
        cd ~
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt install -y nodejs
    else
      echo -e "\n👎 Node installation canceled.\n"
    fi
  fi

  if command -v npm >/dev/null 2>&1; then
    echo -e "\n✅ NPM is installed. Version:"
    npm -v
  else
    read -r -p "❓ NPM is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "\n💪 Installing NPM"
        sudo apt install npm
    else
      echo -e "\n👎 NPM installation canceled.\n"
    fi
  fi

  if command -v yarn >/dev/null 2>&1; then
      echo -e "\n✅ Yarn is installed. Version:"
      yarn -v
  else
    read -r -p "❓ Yarn is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "\n💪 Installing Yarn"
        sudo npm i yarn -g
    else
      echo -e "\n👎 Yarn installation canceled.\n"
    fi
  fi

  if command -v git >/dev/null 2>&1; then
      echo -e "\n✅ Git is installed. Version:"
      git --version
  else
    read -r -p "❓ Git is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "\n💪 Installing Git"
        sudo apt-get install git-all -y
    else
      echo -e "\n👎 Git installation canceled.\n"
    fi
  fi

  if command -v make >/dev/null 2>&1; then
      echo -e "\n✅ GNU Make is installed. Version:"
      make -v
  else
    read -r -p "❓ GNU Make is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "\n💪 Installing GNU Make"
        sudo apt-get install build-essential
    else
      echo -e "\n👎 GNU Make installation canceled.\n"
    fi
  fi
fi

if [ "$os_name" = "Darwin" ]; then
  echo -e "\n🕵️ Checking for dependencies\n"

  if command -v node >/dev/null 2>&1; then
      echo -e "\n✅ Node is installed. Version:"
      node -v
  else
    read -r -p "❓ Node is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      echo -e "\n💪 Installing Node"
      brew install node
    else
      echo -e "\n👎 Node installation canceled.\n"
    fi
  fi

  if command -v yarn >/dev/null 2>&1; then
      echo -e "\n✅ Yarn is installed. Version:"
      yarn -v
  else
    read -r -p "❓ Yarn is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      echo -e "\n💪 Installing Yarn"
      brew install yarn
    else
      echo -e "\n👎 Yarn installation canceled.\n"
    fi
  fi

  if command -v git >/dev/null 2>&1; then
      echo -e "\n✅ Git is installed. Version:"
      git --version
  else
    read -r -p "❓ Git is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      echo -e "\n💪 Installing Git"
      brew install git
    else
      echo -e "\n👎 Git installation canceled.\n"
    fi
  fi

  if command -v make >/dev/null 2>&1; then
      echo -e "\n✅ GNU Make is installed. Version:"
      make -v
  else
    read -r -p "❓ GNU Make is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      echo -e "\n💪 Installing GNU Make"
      brew install make
    else
      echo -e "\n👎 GNU Make installation canceled.\n"
    fi
  fi

  if command -v gpg >/dev/null 2>&1; then
    echo -e "\n✅ gnupg is installed."
  else
    read -r -p "❓ gnupg is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo -e "\n💪 Installing gnupg"
        brew install gnupg
    else
      echo -e "\n👎 gnupg installation canceled.\n"
    fi
  fi

  if perl -MDigest::SHA -e '1' >/dev/null 2>&1; then
    echo -e "\n✅ Perl-Digest-SHA is installed."
  else
    read -r -p "❓ Perl-Digest-SHA is not installed. Do you want to install it? [y/n] " response
    if [[ "$response" =~ ^[Yy]$ ]]; then
      echo -e "\n💪 Installing perl-Digest-SHA"
      brew install perl
      brew install cpanminus
      cpanm Digest::SHA
    else
      echo -e "\n👎 Perl-Digest-SHA installation canceled.\n"
    fi
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

