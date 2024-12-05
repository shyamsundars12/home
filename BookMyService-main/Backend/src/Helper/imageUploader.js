const cloudinary = require("../config/cloudinary.js");

async function uploadImage (id, folderPath,imageName) {
    let res = null;
    await cloudinary.v2.uploader.upload("src/assets/uploads/" + imageName,
    {folder: folderPath},function (error, result) { res = result});
    return res;
}
module.exports = uploadImage;