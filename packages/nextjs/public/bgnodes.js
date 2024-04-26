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

const jwtDir = path.join(os.homedir(), "bgnode", "jwt");
if (!fs.existsSync(jwtDir)) {
  console.log(`Creating '${jwtDir}'`);
  fs.mkdirSync(jwtDir, { recursive: true });
}

if (["darwin", "linux"].includes(os.platform())) {
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

  try {
    execSync("command -v gpg", { stdio: "ignore" });
  } catch {
    console.log("Installing gpg (required for jwt.hex creation).");
    execSync("brew install gpg", { stdio: "inherit" });
  }

  if (consensusClient === "prysm") {
    const prysmDir = path.join(os.homedir(), "bgnode", "prysm");
    const prysmScript = path.join(prysmDir, "prysm.sh");
    if (!fs.existsSync(prysmScript)) {
      console.log("Installing Prysm.");
      if (!fs.existsSync(prysmDir)) {
        console.log(`Creating '${prysmDir}'`);
        fs.mkdirSync(prysmDir, { recursive: true });
      }
      execSync(`curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output ${prysmScript}`);
      execSync(`chmod +x ${prysmScript}`);
      console.log("Creating JWT secret.");
      execSync(
        `${prysmScript} beacon-chain generate-auth-secret`,
        {
          cwd: prysmDir,
        },
        {
          stdio: "inherit",
        },
      );
      fs.renameSync(path.join(prysmDir, "jwt.hex"), path.join(jwtDir, "jwt.hex"));
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
  try {
    const output = execSync("git --version", { encoding: "utf-8" }); // ensures the output is a string
    console.log("Git is installed:", output);
  } catch (error) {
    console.error("Please install Git (https://git-scm.com/downloads).");
  }

  if (executionClient === "geth") {
    const gethDir = path.join(os.homedir(), "bgnode", "geth");
    const gethScript = path.join(gethDir, "geth.exe");
    if (!fs.existsSync(gethScript)) {
      console.log("Installing Geth.");
      if (!fs.existsSync(gethDir)) {
        console.log(`Creating '${gethDir}'`);
        fs.mkdirSync(gethDir, { recursive: true });
      }
      execSync(
        `cd ${gethDir} && curl https://gethstore.blob.core.windows.net/builds/geth-windows-amd64-1.14.0-87246f3c.zip --output geth.zip`,
        { stdio: "inherit" },
      );
      execSync(`cd ${gethDir} && tar -xf ${gethDir}/geth.zip`, { stdio: "inherit" });
      execSync(`cd ${gethDir}/geth-windows-amd64-1.14.0-87246f3c && move geth.exe .. `, { stdio: "inherit" });
      execSync(`cd ${gethDir} && del geth.zip && rd /S /Q geth-windows-amd64-1.14.0-87246f3c`, { stdio: "inherit" });
    } else {
      color("36", "Geth is already installed.");
    }
  } else if (executionClient === "reth") {
    const rethDir = path.join(os.homedir(), "bgnode", "reth");
    const rethScript = path.join(rethDir, "reth.exe");
    if (!fs.existsSync(rethScript)) {
      console.log("Installing Reth.");
      if (!fs.existsSync(rethDir)) {
        console.log(`Creating '${rethDir}'`);
        fs.mkdirSync(rethDir, { recursive: true });
      }
      execSync(
        `cd ${rethDir} && curl -LO https://github.com/paradigmxyz/reth/releases/download/v0.2.0-beta.6/reth-v0.2.0-beta.6-x86_64-pc-windows-gnu.tar.gz`,
        { stdio: "inherit" },
      );
      execSync(`cd ${rethDir} && tar -xzf ${rethDir}/reth-v0.2.0-beta.6-x86_64-pc-windows-gnu.tar.gz`, {
        stdio: "inherit",
      });
      execSync(`cd ${rethDir} && del reth-v0.2.0-beta.6-x86_64-pc-windows-gnu.tar.gz`, { stdio: "inherit" });
    } else {
      color("36", "Reth is already installed.");
    }
  }

  if (consensusClient === "prysm") {
    const prysmDir = path.join(os.homedir(), "bgnode", "prysm");
    const prysmScript = path.join(prysmDir, "prysm.bat");
    if (!fs.existsSync(prysmScript)) {
      console.log("Installing Prysm.");
      if (!fs.existsSync(prysmDir)) {
        console.log(`Creating '${prysmDir}'`);
        fs.mkdirSync(prysmDir, { recursive: true });
      }
      execSync(
        `cd ${prysmDir} && curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.bat --output prysm.bat`,
        { stdio: "inherit" },
      );
      execSync("reg add HKCU\\Console /v VirtualTerminalLevel /t REG_DWORD /d 1", { stdio: "inherit" });
      console.log("Creating JWT secret.");
      execSync(`cd ${prysmDir} && prysm.bat beacon-chain generate-auth-secret`, { stdio: "inherit" });
      fs.renameSync(path.join(prysmDir, "jwt.hex"), path.join(jwtDir, "jwt.hex"));
    } else {
      color("36", "Prysm is already installed.");
    }
  } else if (consensusClient === "lighthouse") {
    const lighthouseDir = path.join(os.homedir(), "bgnode", "lighthouse");
    const lighthouseScript = path.join(lighthouseDir, "lighthouse.exe");
    if (!fs.existsSync(lighthouseScript)) {
      console.log("Installing Lighthouse.");
      if (!fs.existsSync(lighthouseDir)) {
        console.log(`Creating '${lighthouseDir}'`);
        fs.mkdirSync(lighthouseDir, { recursive: true });
      }
      execSync(
        `cd ${lighthouseDir} && curl -LO https://github.com/sigp/lighthouse/releases/download/v5.1.3/lighthouse-v5.1.3-x86_64-windows.tar.gz`,
        { stdio: "inherit" },
      );
      execSync(`cd ${lighthouseDir} && tar -xzf ${lighthouseDir}/lighthouse-v5.1.3-x86_64-windows.tar.gz`, {
        stdio: "inherit",
      });
      execSync(`cd ${lighthouseDir} && del lighthouse-v5.1.3-x86_64-windows.tar.gz`, { stdio: "inherit" });
      // console.log("Creating JWT secret.");
      // execSync( `cd ${lighthouseDir} && prysm.bat beacon-chain generate-auth-secret`, { stdio: "inherit", } );
      // fs.renameSync(
      //   path.join(lighthouseDir, "jwt.hex"),
      //   path.join(jwtDir, "jwt.hex")
      // );
    } else {
      color("36", "Lighthouse is already installed.");
    }
  }
}