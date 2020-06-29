import { join } from 'path';
import { parsePostImages } from './helpers/parsing';

console.log('Running script in ' + process.cwd());
console.log(process.argv);
const file = process.argv[process.argv.length - 1];
const fullPath = join(process.cwd(), file);
console.log(`Reading file ${fullPath} ...`);

(async () => {
    await parsePostImages(fullPath);
    console.log('Finished');
})();


// const modifications = getModifiedPosts(join(__dirname, '..', 'diff.txt'));
// console.log(modifications);
// if (modifications.length === 0) {
//     console.log('No modified posts. Finishing...')
//     process.exit(0);
// }

// modifications.forEach(async fileInfo => {
//     await parsePostImages(fileInfo); 
// });
// console.log('Finished');