const { execSync } = require("child_process");
const os = require("os");
const fs = require("fs");
const path = require("path");

// Set default values
let executionClient = "geth";
let consensusClient = "prysm";

// Function to display usage information
function showHelp() {
  console.log("Usage: node script.js [options]");
  console.log("");
  console.log("Options:");
  console.log("  -e <client>  Specify the execution client ('geth' or 'reth')");
  console.log("  -c <client>  Specify the consensus client ('prysm' or 'lighthouse')");
  console.log("  -h           Display this help message and exit");
  console.log("");
}

// Function to add color to console output
function color(code, text) {
  // Usage: color "31;5" "string"
  // Some valid values for color:
  // - 5 blink, 1 strong, 4 underlined
  // - fg: 31 red,  32 green, 33 yellow, 34 blue, 35 purple, 36 cyan, 37 white
  // - bg: 40 black, 41 red, 44 blue, 45 purple
  console.log(`\x1b[${code}m${text}\x1b[0m`);
}

// Process command-line arguments
const args = process.argv.slice(2);
args.forEach((val, index) => {
  switch (val) {
    case "-e":
      executionClient = args[index + 1];
      if (!["geth", "reth"].includes(executionClient)) {
        color("31", "Invalid option for -e. Use 'geth' or 'reth'.");
        process.exit(1);
      }
      break;
    case "-c":
      consensusClient = args[index + 1];
      if (!["prysm", "lighthouse"].includes(consensusClient)) {
        color("31", "Invalid option for -c. Use 'prysm' or 'lighthouse'.");
        process.exit(1);
      }
      break;
    case "-h":
      showHelp();
      process.exit(0);
      break;
  }
});

console.log(`Execution client selected: ${executionClient}`);
console.log(`Consensus client selected: ${consensusClient}\n`);

// Check the operating system
if (["darwin", "linux"].includes(os.platform())) {
  // Installation of execution client
  try {
    execSync(`command -v ${executionClient}`, { stdio: "ignore" });
    const version = execSync(`${executionClient} -v`).toString().trim();
    color("36", `${executionClient} is already installed. Version:\n${version}`);
  } catch {
    console.log(`Installing ${executionClient}.`);
    if (executionClient === "geth") {
      execSync("brew tap ethereum/ethereum", { stdio: "inherit" });
      execSync("brew install ethereum", { stdio: "inherit" });
    } else if (executionClient === "reth") {
      execSync("brew install paradigmxyz/brew/reth", { stdio: "inherit" });
    }
  }

  // Setup for consensus client
  const nodeJwtDir = path.join(os.homedir(), "node", "jwt");
  const nodePrysmDir = path.join(os.homedir(), "node", "prysm");
  if (!fs.existsSync(nodeJwtDir)) {
    console.log(`Creating '${nodeJwtDir}'`);
    fs.mkdirSync(nodeJwtDir, { recursive: true });
  }

  try {
    execSync("command -v gpg", { stdio: "ignore" });
  } catch {
    console.log("Installing gpg (required for jwt.hex creation).");
    execSync("brew install gpg", { stdio: "inherit" });
  }

  if (consensusClient === "prysm") {
    const prysmScript = path.join(nodePrysmDir, "prysm.sh");
    if (!fs.existsSync(prysmScript)) {
      console.log("Installing Prysm.");
      if (!fs.existsSync(nodePrysmDir)) {
        console.log(`Creating '${nodePrysmDir}'`);
        fs.mkdirSync(nodePrysmDir, { recursive: true });
      }
      execSync(`curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output ${prysmScript}`);
      execSync(`chmod +x ${prysmScript}`);
      console.log("Creating JWT secret.");
      execSync(
        `${prysmScript} beacon-chain generate-auth-secret`,
        {
          cwd: nodePrysmDir,
        },
        {
          stdio: "inherit",
        },
      );
      fs.renameSync(path.join(nodePrysmDir, "jwt.hex"), path.join(nodeJwtDir, "jwt.hex"));
    } else {
      color("36", "Prysm is already installed.");
    }
  } else if (consensusClient === "lighthouse") {
    try {
      execSync("command -v lighthouse", { stdio: "ignore" });
      const version = execSync("lighthouse --version").toString().trim();
      color("36", `Lighthouse is already installed. Version:\n${version}`);
    } catch {
      console.log("Installing Lighthouse.");
      execSync("brew install lighthouse", { stdio: "inherit" });
    }
  }
} else if (os.platform() === "win32") {
  // Installation of execution client
  try {
    execSync(`where ${executionClient}`, { stdio: "ignore" });
    const version = execSync(`${executionClient} -v`).toString().trim();
    color("36", `${executionClient} is already installed. Version:\n${version}`);
  } catch {
    console.log(`Installing ${executionClient}.`);
    if (executionClient === "geth") {
      console.log("----- TODO: Install Geth -----");
    } else if (executionClient === "reth") {
      console.log("----- TODO: Install Reth -----");
    }
  }

  // Setup for consensus client
  const nodeJwtDir = path.join(os.homedir(), "node", "jwt");
  const nodePrysmDir = path.join(os.homedir(), "node", "prysm");
  if (!fs.existsSync(nodeJwtDir)) {
    console.log(`Creating '${nodeJwtDir}'`);
  }

  try {
    execSync("where gpg", { stdio: "ignore" });
  } catch {
    console.log("Installing gpg (required for jwt.hex creation).");
    console.log("----- TODO: Install gpg -----");
  }

  if (consensusClient === "prysm") {
    const prysmScript = path.join(nodePrysmDir, "prysm.sh");
    if (!fs.existsSync(prysmScript)) {
      console.log("Installing Prysm.");
      if (!fs.existsSync(nodePrysmDir)) {
        console.log(`Creating '${nodePrysmDir}'`);
        fs.mkdirSync(nodePrysmDir, { recursive: true });
      }
      console.log("----- TODO: Download Prysm Exec -----");
      // execSync(`chmod +x ${prysmScript}`);
      console.log("Creating JWT secret.");
      console.log("----- TODO: Create JWT secret -----");
      // execSync(
      //   `${prysmScript} beacon-chain generate-auth-secret`,
      //   {
      //     cwd: nodePrysmDir,
      //   },
      //   {
      //     stdio: "inherit",
      //   }
      // );
      console.log("----- TODO: Move JWT secret -----");
      // fs.renameSync(
      //   path.join(nodePrysmDir, "jwt.hex"),
      //   path.join(nodeJwtDir, "jwt.hex")
      // );
    } else {
      color("36", "Prysm is already installed.");
    }
  } else if (consensusClient === "lighthouse") {
    try {
      execSync("where lighthouse", { stdio: "ignore" });
      const version = execSync("lighthouse --version").toString().trim();
      color("36", `Lighthouse is already installed. Version:\n${version}`);
    } catch {
      console.log("Installing Lighthouse.");
      console.log("----- TODO: Install lighthouse -----");
      // execSync("brew install lighthouse", { stdio: "inherit" });
    }
  }
}
