import sharp from 'sharp';

export const processOverlay = async (back?: any, fore?: any) => {
  try {
    const metadata = await sharp(back).metadata();

    if (!metadata) throw Error('Sharp Error: Image not found');

    if (metadata && metadata.height) {
      const resize = await sharp(fore)
        .resize({
          width: Math.floor(metadata?.height * 0.5),
          height: Math.floor(metadata?.height * 0.5),
        })
        .toBuffer();

      return await sharp(back)
        .composite([
          {
            input: resize,
            top: Math.floor(metadata.height * 0.25),
            left: Math.floor(metadata.height * 0.25),
          },
        ])
        .toBuffer();
    }

    throw Error('Sharp Error: processing error');
  } catch (error: any) {
    throw Error(error.message);
  }
};
