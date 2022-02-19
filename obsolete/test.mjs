import { readdir } from 'fs';

async function getDirContent(dirname) {

     return new Promise((resolve, reject) => {
          readdir(dirname, (err, files) => {
               if (err) reject(err);

               console.log(files);
               resolve(files);
          })
     })
}


getDirContent('./accs')
