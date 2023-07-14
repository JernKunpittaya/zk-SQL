import { task } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });

const { SEPOLIA_PRIVATE_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      gas: 100000000,
      blockGasLimit: 0x1fffffffffffff,
    },
    testnet: {
      url: "https://eth-sepolia.g.alchemy.com/v2/KoQXj-94RYgkSZkTu1cYBpVllMAXct4K",
      chainId: 11155111,
      accounts: [`${SEPOLIA_PRIVATE_KEY}`],
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./lib/test",
    cache: "./cache",
    artifacts: "./lib/artifacts",
  },
  typechain: {
    outDir: "./lib/types/typechain",
    target: "ethers-v5",
  },
  mocha: {
    timeout: 100000000,
  },
};
