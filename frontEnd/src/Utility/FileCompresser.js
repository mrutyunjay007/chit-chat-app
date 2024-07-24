import imageCompression from "browser-image-compression";

async function fileCompresser(file) {
  try {
    const imageFile = file;

    //conver image size in kB
    const imageSize = Math.round(imageFile.size / 1024);

    // more than 1.5Mb not allow
    if (imageSize > 1536) {
      console.log("more than 1.5MB is not allow");
      return;
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    // file comression
    const compressedFile = await imageCompression(imageFile, options);

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
export default fileCompresser;
