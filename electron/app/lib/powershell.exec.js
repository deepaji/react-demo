import { spawn } from "child_process";

class PowerShellExec {
  runStatusCheck() {
    console.log("curr working dir", process.cwd());
    return new Promise((resolve, reject) => {
      let child = spawn("powershell.exe", ["./powershell/Get-LastUpdate.ps1"]);

      let result = "";

      child.stdout.on("data", data => {
        result += data;
        console.log(data.toString());
        var returnedResult = JSON.parse(data.toString());
        console.log(returnedResult.ReadableCreationTime);
      });

      child.stderr.on("data", err => {
        console.error(err);
        reject(err);
      });

      child.on("exit", () => {
        console.log("Powershell script finished!");
        try {
          console.log(returnedResult);

          resolve("done");
        } catch (error) {
          console.log(
            "unable to parse the returned result " + result.toString()
          );
          reject("unable to parse the returned result");
        }
      });

      child.stdin.end();
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
    });
  }
}

export default new PowerShellExec();
