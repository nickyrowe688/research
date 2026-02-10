import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';

console.log("Script started");

const inputFile = path.resolve('charter-fragment.csv');
const outputFile = path.resolve('charter-fragment5.json');

if (!fs.existsSync(inputFile)) {
  console.error("❌ CSV file not found:", inputFile);
  process.exit(1);
}

const records = [];

fs.createReadStream(inputFile, { encoding: 'utf8' })
  .pipe(
    parse({
      columns: true,        // use first row as keys
      bom: true,
      skip_empty_lines: false,
      trim: true,            // trims outer whitespace
      relax_quotes: true,    // tolerate historical oddities
      relax_column_count: true
    })
  )
  .on('data', (row) => {
    records.push(row);
  })
  .on('end', () => {
    fs.writeFileSync(
      outputFile,
      JSON.stringify(records, null, 2),
      'utf8'
    );
    console.log(`✅ Parsed ${records.length} rows`);
    console.log("✅ JSON written to:", outputFile);
  })
  .on('error', (err) => {
    console.error("❌ CSV parse error:", err.message);
  });
