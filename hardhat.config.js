require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { INFURA_API_LINK, SIGNER_PRIVATE_KEY } = process.env;

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key

// Replace this private key with your Goerli account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "matic",
  networks: {
    matic: {
      url: INFURA_API_LINK,
      accounts: [SIGNER_PRIVATE_KEY]
    }
  }
};