const hre = require("hardhat");

// add address od nft contract
const NFTcontractAddress = ""

async function main() {
  const NTF = await hre.ethers.getContractFactory("Minter");
  const nft = await NTF.deploy(NFTcontractAddress);

  await nft.deployed();

  console.log(
    `deployed to ${nft.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

