// @ts-nocheck
const path= require('path');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

// при ошибках сертификата
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// require('https').globalAgent.options.rejectUnauthorized = false

const currrentDirFile = path.join(__dirname, './files/');

const sendFile = async(form) => {
  await axios.post(`http://localhost:5001/filetwo`, form, {
    headers: {
      Accept: "application/json",
      "Content-Type":"multipart/form-data",
    }
  })
  .then(() => {
    console.log('Файл успешно отправлен на сервер!')
  })
  .catch((err) => {
    console.log('Ошибка отправки файла =>', err)
  })
}

module.exports = {
  async sendJsonFileOnServer() {

    // вариант при открытии нового браузера
    fs.stat(currrentDirFile + 'data.json', (err, stats) => {
      if (err) {
        console.log("Файла в директории не существует!");
      } else {
        try {
          const form = new FormData();
          const fileToPathImage = currrentDirFile + 'data.json'
          const file = fs.createReadStream(fileToPathImage);
        
          form.append('file', file);
          sendFile(form)
        } catch (error) {
          console.log('Ошибка отправки файла на сервер! =>', error)
        }
      }
    })

    // вариант при режиме отладки
    // fs.stat(currrentDirFile + 'data.txt', (err, stats) => {
    //   if (err) {
    //     console.log("Файла в директории не существует!");
    //   } else {
    //     try {
    //       fs.readFile(currrentDirFile + 'data.txt', 'utf8', (error, fileContent) => {
    //         if (error) {
    //           console.error('Error reading file:', error);
    //         } else {
    //           try {
    //             const form = new FormData();
    //             const fileToPathImage = currrentDirFile + 'data.txt'
    //             const file = fs.createReadStream(fileToPathImage);

    //             form.append('file', file);
    //             sendFile(form)
    //           } catch (error) {
    //             console.error('Error parsing JSON:', error);
    //           }
    //         }
    //       });
    //     } catch (error) {
    //       console.log('Ошибка отправки файла на сервер! =>', error)
    //     }
    //   }
    // })
  
  }
};
