require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const sepolia_url = process.env.Sepolia_NETWORK_URL || "ghfh";
const PRIVATE_KEY_TEACHER = process.env.PRIVATE_KEY_TEACHER || "jhghjgh";
const PRIVATE_KEY_MENTOR = process.env.PRIVATE_KEY_MENTOR || "jhghjgh";
const PRIVATE_KEY_STUDENT = process.env.PRIVATE_KEY_STUDENT || "jhghjgh";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    sepolia: {
      url: sepolia_url,
      accounts: [
        `0x${PRIVATE_KEY_TEACHER}`,
        `0x${PRIVATE_KEY_MENTOR}`,
        `0x${PRIVATE_KEY_STUDENT}`
      ]
    }
  },
};
