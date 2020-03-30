/* eslint-disable no-plusplus */
import xlsx from 'node-xlsx';

class ExcelController {
  async store(req, res) {
    const obj = xlsx.parse(req.file.path);
    const rows = [];
    const writeStr = [];

    for (let i = 0; i < obj.length; i++) {
      const sheet = obj[i];
      // loop through all rows in the sheet
      for (let j = 0; j < sheet.data.length; j++) {
        // add the row to the rows array
        rows.push(sheet.data[j]);
      }
    }

    for (let i = 0; i < rows.length; i++) {
      if (
        writeStr &&
        writeStr.length > 0 &&
        writeStr.some((x) => x.desc === rows[i][0])
      ) {
        writeStr.forEach((x) => {
          if (x.desc === rows[i][0]) {
            x.total += rows[i][1];
          }
        });
      } else {
        writeStr.push({ desc: rows[i][0], total: rows[i][1] });
      }
    }

    return res.json({
      writeStr,
    });
  }
}

export default new ExcelController();
