// @ts-nocheck
const path= require('path');
const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');

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
  
  }
};
