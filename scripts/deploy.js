const hre = require("hardhat");

async function main() {
  const NTF = await hre.ethers.getContractFactory("ZTPnft");
  const nft = await NTF.deploy();

  await nft.deployed();

  console.log(
    `deployed to ${nft.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
