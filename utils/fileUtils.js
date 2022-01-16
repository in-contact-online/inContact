const fs = require("fs");

async function createFile(filePath, status) {
     const header = 'phone,user,username,was_online,check_date\r\n';
     const content = header + status;
     console.log(content);
     return fs.writeFile(filePath, content, (err) => {
          if (err)
               console.error('Create File Error:', err);
          else {
               console.log(`File ${filePath} written successfully.`);
          }
     })
}

async function appendToFile(file, content) {
     console.log(content);
     return fs.appendFile(file, content, (err) => {
          if (err) {
               console.error(err);
          } else {
               console.log(`${new Date().toISOString()}: "${file}" append successfully.`);
          }
     });
}

function fileExist(path) {
     return fs.existsSync(path);
}

module.exports = {
     fileExist,
     createFile,
     appendToFile,
}
