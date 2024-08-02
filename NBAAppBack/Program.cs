using System;
using System.Diagnostics;

namespace PythonMethodCaller
{
    class Program
    {
        static void Main(string[] args)
        {
            // Define the path to the Python interpreter
            string pythonPath = "py";
            
            // Specify the path to the Python file and the method to call
            string pythonFile = "NBAApp.py";
            string player = "Alex Caruso";

            // Build the command to execute
            string command = $"{pythonPath} {pythonFile} {player}";

            ProcessStartInfo processInfo = new ProcessStartInfo(pythonPath, command)
            {
                FileName = "cmd.exe",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                CreateNoWindow = true,
                UseShellExecute = false,
                WindowStyle=ProcessWindowStyle.Hidden,
            };

            // Start the process
            Process process = new Process
            {
                StartInfo = processInfo
            };
            process.Start();

            // Read the output from the Python script
            process.StandardInput.WriteLine(command);
            process.StandardInput.Flush();
            process.StandardInput.Close();
            process.WaitForExit();

            Console.WriteLine(process.StandardOutput.ReadToEnd());
        }


    }

}