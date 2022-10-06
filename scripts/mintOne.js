const hre = require("hardhat");
const { getFilesFromPath,Web3Storage } = require('web3.storage')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { STORAGE_WEB_TOKEN } = process.env;


// solo se puede de a 1, porque infura me tira error cuando intento mandar mas de una trans 
// puede ser que no incrementa el nonce o algo de infura. no se aun 

// este codigo sube a ipfs y llama a la funcion mint con el url de ipfs 
const minter = {
        address : "0xB4BdB982988B74F056AE13C01f019A28D70779fA",
        imagePath : "/Users/tomascalle/Desktop/photos/pngtree-blue-sky-and-white-clouds-png-image_4391818.jpeg",
        file: "/pngtree-blue-sky-and-white-clouds-png-image_4391818.jpeg",
}

const contractURL = "0xe4516718069F55f1e22ccd0541242d753F96343c"

async function main() {
    const NFT = await hre.ethers.getContractFactory("ZTPnft")
    const url = saveImage(minter.imagePath,minter.file)
    const nft =  NFT.attach(contractURL)
    console.log("mint nft for: " + minter.address)
    await mint(minter.address,url,nft)

 }
 async function mint(addressOwner,nftURL,NFT){
    NFT.safeMint(addressOwner,nftURL)
 }

 async function saveImage(path,fileName){
  const token = STORAGE_WEB_TOKEN
  const storage = new Web3Storage( {token} )
  const filesToLoad = [path]
  const files = []

  for (const path of filesToLoad) {
    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)
  }

  const cid = await storage.put(files)
  const res = `https://${cid}.ipfs.dweb.link${fileName}`
  console.log("IPFS link: " + res)
  return res
 }
  

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  