const Jimp = require('jimp') ;

// add text to images

const images = eturn [
    {   
        // path of original image
        originalPath : '',
        // path of new image
        resultPath : '',
        // name to print in image
        name : "",
        // numbers to print in image
        cc : ""
    }
]

async function main(){
    for (const image of images) {
        textOverlay(image.originalPath,image.resultPath,image.name,image.cc)
    }
}

async function textOverlay(originalPath,resultPath,name,cc) {
   const image = await Jimp.read(originalPath);

   const font1 = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
   const font2 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

   image.print(font1,5,164, {
    text: name,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, image.getWidth(),image.getHeight()/2);

    image.print(font2,525,217, {
    text: cc,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, image.getWidth()/2,image.getHeight()/2);

   await image.writeAsync(resultPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});



