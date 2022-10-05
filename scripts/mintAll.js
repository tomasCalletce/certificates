const hre = require("hardhat");
const { getFilesFromPath,Web3Storage } = require('web3.storage')
const path = require('path');
const { url } = require("inspector");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { STORAGE_WEB_TOKEN } = process.env;

const minters = [ 
    {
    address : "0xE7351d0B85f4D88dED9c39C71D1685820680ca8A",
    imagePath : "/Users/tomascalle/Desktop/photos/pngtree-blue-sky-and-white-clouds-png-image_4391818.jpeg",
    file: "/pngtree-blue-sky-and-white-clouds-png-image_4391818.jpeg",
    },
    {
    address : "0xB4BdB982988B74F056AE13C01f019A28D70779fA",
    imagePath : "/Users/tomascalle/Desktop/photos/labs.png",
    file: "/labs.png",
    }
]

const MINTERcontractAddress = "0x143e648D409e9D3C50816e27EF4e4222300b55e6"

async function main() {
    const mintParamters = await getUrlsANDadress()
    await bachMint(mintParamters)
}

async function bachMint(mintParamters){
    const MinterContract = await hre.ethers.getContractFactory("Minter")
    const minterContract =  MinterContract.attach(MINTERcontractAddress)
    await minterContract.mintAll(mintParamters[0],mintParamters[1])
}

async function getUrlsANDadress(){
    let listURLS = []
    let listAdress = []
    let url = "";
    for (const minter of minters) {
        listURLS.push(await saveImage(minter.imagePath,minter.file))
        listAdress.push(minter.address)
    }
    return [listAdress,listURLS];
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
    return res
}


main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
