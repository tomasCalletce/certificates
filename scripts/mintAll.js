const hre = require("hardhat");
const path = require('path');
const { NFTStorage,File } = require('nft.storage')
const fs = require('fs')
const mime = require("mime")

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { NFT_STORAGE } = process.env;

// user needs INFURA account and nft.storage account 

// deploy nft contract 

// deploy minter contract that points to the nft contract 

// run mint all with a list objects to mint n nfts

// list of objects, each object is one nft 
const minters = [
  {
    // address of the to be nft owner
    address : "",
    // path of image to add to the nft
    imagePath : "",
    // no use 
    file: "/.png",
  }
]

// add address of the minter contract 
const MINTERcontractAddress = ""


async function main() {
    const mintParamters = await getUrlsANDadress()
    await bachMint(mintParamters)
}

async function bachMint(mintParamters){
    const MinterContract = await hre.ethers.getContractFactory("Minter")
    const minterContract =  MinterContract.attach(MINTERcontractAddress)
    console.log(await minterContract.mintAll(mintParamters[0],mintParamters[1]))
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

async function fileFromPath(filePath) {

	const content = await fs.promises.readFile(filePath)
	const type = mime.getType(filePath)
	
	return new File([content], path.basename(filePath), { type } )
}


// change change attributes of nft
async function saveImage(path){

    const nft = {
        image :  await fileFromPath(path),
        name : "Certificado Speaker Inglés",
        description : "For participating as a speaker at our New Technologies & Digital Experience Fair, which allowed us to inspire and connect with the new technologies and digital tools that are leveraging the digital transformation at Grupo Nutresa.",
        external_url : "https://gruponutresa.com/",
        attributes: [
              {
                "trait_type": "STARTDATE", 
                "value": "19-Sep-2022"
              },
              {
                "trait_type": "ENDDATE", 
                "value": "23-Sep-2022"
              },   
              {
                "trait_type": "TOKENSTANDARD", 
                "value": "ERC721"
              },
              {
                "trait_type": "EVENT", 
                "value": "4ta Feria Virtual de Nuevas Tecnologías y Experiencia Digital de Grupo Nutresa."
              },
              {
                "trait_type": "AUTHOR", 
                "value": "Grupo Nutresa"
              },
              {
                "trait_type": "CREATOR", 
                "value": "Blockchain eX"
              }
        ]
      }
    

    const client = new NFTStorage({ token: NFT_STORAGE })
    const metadata = await client.store(nft)
    console.log('NFT data stored!')
    console.log('Metadata URI: ', metadata.url)
    return metadata.url;
}

main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
