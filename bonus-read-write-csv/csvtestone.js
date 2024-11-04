const ObjectsToCsv = require('objects-to-csv');

const currentTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return `${hours}${minutes}${seconds}${milliseconds}`
}

const data = [
  {code: 'CA', name: 'California'},
  {code: 'TX', name: 'Texas'},
  {code: 'NY', name: 'New York'},
];

(async () => {
  const csv = new ObjectsToCsv(data);

  let uniqueName = currentTime() + 'csvtestone.csv';
 
  await csv.toDisk(uniqueName);
 
  console.log(await csv.toString());
})();
