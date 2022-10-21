// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dd93u8fa5', 
    api_key: '297992195742121', 
    api_secret: 'Z4VYAVCx_cMtGCatWyv8mjcgp0E' 
  });

module.exports = cloudinary;
