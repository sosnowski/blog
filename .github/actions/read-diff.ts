import { readFileSync } from 'fs';
import { join } from 'path';

console.log('Running script in ' + process.cwd());
console.log('Reading file...');
const data = readFileSync(join(process.cwd(), 'diff.txt'), {
    encoding: 'utf8'
});
console.log('File data:');
console.log(data);

console.log('Finished');