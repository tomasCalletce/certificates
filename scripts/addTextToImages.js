const Jimp = require('jimp') ;

const images = [
    {
        originalPath : '/Users/tomascalle/Desktop/photos/certificado-B\&M.jpg',
        resultPath : '/Users/tomascalle/Desktop/photos/done.jpg',
        name : "tomas Calle",
        cc : "6724"

    },
    {
        originalPath : '/Users/tomascalle/Desktop/photos/certificado-B\&M.jpg',
        resultPath : '/Users/tomascalle/Desktop/photos/done1.jpg',
        name : "tomas calle",
        cc : "6233"

    }
]

async function main(){
    for (const image of images) {
        textOverlay(image.originalPath,image.resultPath,image.name,image.cc)
    }
}

async function textOverlay(originalPath,resultPath,name,cc) {
   const image = await Jimp.read(originalPath);

   const font1 = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
   const font2 = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);

   image.print(font1,180,80, {
    text: name,
    alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
    alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
    }, image.getWidth()/2,image.getHeight()/2);

    image.print(font2,325,120, {
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



