const fs = require('fs');
const path = require('path');

// Delete the old file if it exists
if (fs.existsSync('./public/index.html')) {
    fs.unlinkSync('./public/index.html');
}

// Rename the new file
fs.renameSync('./public/index.html.new', './public/index.html');

console.log('File replaced successfully!');
