/* eslint-disable no-plusplus */
import xlsx from 'node-xlsx';

class ExcelController {
  async store(req, res) {
    const obj = xlsx.parse(req.file.path);
    const rows = [];
    let writeStr = {
      desc: '',
      total: 0,
    };

    for (let i = 0; i < obj.length; i++) {
      const sheet = obj[i];
      // loop through all rows in the sheet
      for (let j = 0; j < sheet.data.length; j++) {
        // add the row to the rows array
        rows.push(sheet.data[j]);
      }
    }
    console.log(rows);
    for (let i = 0; i < rows.length; i++) {
      console.log(rows[i][1]);
      if (writeStr.desc) writeStr += `${rows[i].join(',')}\n`;
    }

    return res.json({
      writeStr,
    });
  }
}

export default new ExcelController();
