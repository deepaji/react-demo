import { spawn } from 'child_process'

class PowerShellExec {
  getLastUpdate () {
    return new Promise((resolve, reject) => {
      try {
        let child = spawn('powershell.exe', ['./powershell/Get-LastUpdate.ps1'])
        child.on('error', function(err) {
          console.error(err)
          resolve({error: err})
        });

        let result = ''

        child.stdout.on('data', data => {
          result += data
          console.log(data.toString())
          var returnedResult = JSON.parse(data.toString())
          console.log(returnedResult.ReadableCreationTime)
        })

        child.stderr.on('data', err => {
          console.error(err)
          reject(err)
        })

        child.on('exit', () => {
          console.log('Powershell script finished!')
          try {
            console.log(returnedResult)

            resolve({
              content: returnedResult,
              status: 'SUCCESS'
            })
          } catch (error) {
            console.log(
              'unable to parse the returned result ' + result.toString()
            )
            reject('unable to parse the returned result')
          }
        })

        child.stdin.end()
        //   exec(
        //     "cmd /K powershell -File ./powershell/Get-LastUpdate.ps1",
        //     (err, stdout, stderr) => {
        //       if (err) {
        //         console.error(err);
        //         reject(err);
        //       }
        //       console.log(data);
        //       resolve(data);
        //     }
        //   );
      }
      catch (e) {
        console.error(e)
        resolve({
          status: 'ERROR',
          error: e
        })
      }
    })
  }

  getDiskSpace () {
    return new Promise((resolve, reject) => {
      try {
        let child = spawn('powershell.exe', ['./powershell/Get-DiskSpace.ps1'])
        child.on('error', function(err) {
          console.error(err)
          resolve({error: err})
        });

        let result = ''

        child.stdout.on('data', data => {
          result += data
          console.log(data.toString())
          var returnedResult = JSON.parse(data.toString())
          console.log(returnedResult.ReadableCreationTime)
        })

        child.stderr.on('data', err => {
          console.error(err)
          reject(err)
        })

        child.on('exit', () => {
          console.log('Powershell script finished!')
          try {
            console.log(returnedResult)

            resolve({
              content: returnedResult,
              status: 'SUCCESS'
            })
          } catch (error) {
            console.log(
              'unable to parse the returned result ' + result.toString()
            )
            reject('unable to parse the returned result')
          }
        })

        child.stdin.end()
        //   exec(
        //     "cmd /K powershell -File ./powershell/Get-LastUpdate.ps1",
        //     (err, stdout, stderr) => {
        //       if (err) {
        //         console.error(err);
        //         reject(err);
        //       }
        //       console.log(data);
        //       resolve(data);
        //     }
        //   );
      }
      catch (e) {
        console.error(e)
        resolve({
          status: 'ERROR',
          error: e
        })
      }
    })
  }

  runStatusCheck () {
    console.log('curr working dir', process.cwd())
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getLastUpdate(),
        this.getDiskSpace()
      ]).then(values => {
        console.log(values)
        resolve(values)
      }).catch(err => {
        console.error(err)
        reject(err)
      })
    })
  }
}

export default new PowerShellExec()
