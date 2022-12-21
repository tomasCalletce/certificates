const { NFTStorage,File } = require('nft.storage')
const fs = require('fs')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const { NFT_STORAGE } = process.env;

async function main(){
    const client = new NFTStorage({token : NFT_STORAGE})
    const metadata = await client.store({
        name : "Bootcamp de Blockchain al Metaverso",
        description : "Certificado Blockchain al Metaverso",
        image : new File([fs.readFileSync("/Users/tomascalle/Desktop/photos/doneImages/BEMP.png")],"BEMP.png",{type: "image/png"})
    })

    console.log(metadata.url)
    console.log(metadata.data)
}

main()