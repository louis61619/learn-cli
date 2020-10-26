/**
 * 執行終端命令相關的代碼
 */

// const { spawn } = require('child_process')

// // //ES6的可變參數 將所有參數放入...args中
// // const commandSpawn = (...args) => {
// //   return new Promise((resolve, reject) => {
// //     const childProcess = spawn(...args) //開啟某個進程
// //     childProcess.stdout.pipe(process.stdout); //將輸出流放入CMD面板中
// //     childProcess.stderr.pipe(process.stderr);
// //     childProcess.on("close", () => {
// //       resolve()
// //     })
// //   })
// // }

// const commandSpawn = (...args) => {
//   return new Promise((resolve, reject) => {
//     const childProcess = spawn(...args).spawnSync('npm.cmd', ['install']);
//     childProcess.stdout.pipe(process.stdout);
//     childProcess.stderr.pipe(process.stderr);
//     childProcess.on("close", () => {
//       resolve();
//     })
//   })
// }

// module.exports = {
//   commandSpawn
// }

const { spawn, exec } = require('child_process');


const spawnCommand = (...args) => {
  return new Promise((resole, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resole();
    })
  })
}

const execCommand = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(stdout.replace('\n', ''));
      // console.log(stderr);
      resolve();
    })
  })
}

module.exports = {
  spawn: spawnCommand,
  exec: execCommand
};
