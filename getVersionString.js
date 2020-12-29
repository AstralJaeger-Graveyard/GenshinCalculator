'use strict';

const fs = require('fs');
const os = require('os');
const gitCommitId = require('git-commit-id');

function patchFile(file) {
  let lines = file.split('\n');
  let i = 0
  for (let line of lines){
    if (line.trim().startsWith('version')){
      lines[i] = line.replace('\"\"', `\"${commitId}\"`);
      console.log(`Line ${i}: ${lines[i].trim()}`);
      break;
    }
    i++;
  }
  return lines.join('');
}

const devPath = 'src/environments/environment.ts';
const prodPath = 'src/environments/environment.prod.ts';
const rawFile = fs.readFileSync(devPath, 'utf8');
const rawProdFile = fs.readFileSync(prodPath, 'utf8');

const commitId = gitCommitId();
console.log(`Commit ID: ${commitId}`);

let newContent = patchFile(rawFile);
let newProdContent = patchFile(rawProdFile);

fs.writeFileSync(devPath, newContent);
fs.writeFileSync(prodPath, newProdContent);
console.log('Successfully patched version string into environment files!');
