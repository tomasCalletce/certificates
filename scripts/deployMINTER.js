const hre = require("hardhat");
const NFTcontractAddress = "0xe4516718069F55f1e22ccd0541242d753F96343c"

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
