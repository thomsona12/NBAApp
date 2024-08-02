using Microsoft.AspNetCore.Mvc;
using NBAAppWeb.Models;
using System.Diagnostics;
using System.IO;

namespace NBAAppWeb.Controllers
{
    public class PlayerController : Controller
    {
        // GET: Player/Index
        public ActionResult Index()
        {
            return View();
        }

        // POST: Player/GetShotData
        [HttpPost]
        public ActionResult GetShotData(string playerName)
        {
            // Validate the input or handle any error conditions
            if (string.IsNullOrEmpty(playerName))
            {
                ModelState.AddModelError("playerName", "Please enter a player name.");
                return View("~/Views/Home/ShotChart.cshtml");
            }


            List<ShotData> shotDataList = ParseCsvToShotDataList(CallConsoleApp(playerName));
            List<LeagueShotData> leagueShotDataList = ParseCsvToLeagueShotDataList(System.IO.File.ReadAllText("league_shotchart.csv"));
            ViewBag.FGAverage = Math.Round(getFGAverage(shotDataList) * 100, 2) + "%";
            ViewBag.ThreeAverage = Math.Round(getThreeAverage(shotDataList) * 100, 2) + "%";
            ViewBag.PaintAverage = Math.Round(getPaintAverage(shotDataList) * 100, 2) + "%";
            ViewBag.RMidAverage = Math.Round(getRMidAverage(shotDataList) * 100, 2) + "%";
            ViewBag.LMidAverage = Math.Round(getLMidAverage(shotDataList) * 100, 2) + "%";
            ViewBag.RCenMidAverage = Math.Round(getRCenMidAverage(shotDataList) * 100, 2) + "%";
            ViewBag.LCenMidAverage = Math.Round(getLCenMidAverage(shotDataList) * 100, 2) + "%";
            ViewBag.CenMidAverage = Math.Round(getCenMidAverage(shotDataList) * 100, 2) + "%";
            ViewBag.RThreeAverage = Math.Round(getRThreeAverage(shotDataList) * 100, 2) + "%";
            ViewBag.LThreeAverage = Math.Round(getLThreeAverage(shotDataList) * 100, 2) + "%";
            ViewBag.RWingThreeAverage = Math.Round(getRWingThreeAverage(shotDataList) * 100, 2) + "%";
            ViewBag.LWingThreeAverage = Math.Round(getLWingThreeAverage(shotDataList) * 100, 2) + "%";
            ViewBag.CenThreeAverage = Math.Round(getCenThreeAverage(shotDataList) * 100, 2) + "%";
            ViewBag.PlayerName = playerName;
            ViewBag.LeagueAverages = getLeagueShotAverages(leagueShotDataList);
            // Pass the shot data list to the view
            ViewBag.ShotDataList = shotDataList;
            ViewBag.LeagueShotDataList = leagueShotDataList;

            return View("~/Views/Home/ShotChart.cshtml");
        }

        // Simulate calling your console app's functionality
        private string CallConsoleApp(string playerName)
        {
            // Define the path to the Python interpreter
            string pythonPath = "py";

            // Specify the path to the Python file and the method to call
            string pythonFile = "NBAApp.py";

            // Build the command to execute
            string command = $"{pythonPath} {pythonFile} {playerName}";

            ProcessStartInfo processInfo = new ProcessStartInfo(pythonPath, command)
            {
                FileName = "cmd.exe",
                RedirectStandardInput = true,
                RedirectStandardOutput = true,
                CreateNoWindow = true,
                UseShellExecute = false,
                WindowStyle = ProcessWindowStyle.Hidden,
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

            process.StandardOutput.ReadToEnd();
            return System.IO.File.ReadAllText(playerName + ".csv");
        }
        private List<ShotData> ParseCsvToShotDataList(string csvData)
        {
            // Implement the logic to parse the CSV data and convert it into a List of objects
            List<ShotData> shotDataList = new List<ShotData>();

            // Split the CSV data by lines
            string[] lines = csvData.Split(Environment.NewLine);

            // Skip the header line if necessary
            bool skipHeader = true;

            foreach (string line in lines)
            {
                // Skip the header line
                if (skipHeader)
                {
                    skipHeader = false;
                    continue;
                }
                if (line == "")
                {
                    break;
                }

                // Split the line into columns
                string[] columns = line.Split(',');

                // Create a ShotData object and populate its properties
                ShotData shotData = new ShotData
                {
                    // Populate the properties with the CSV column values
                    // Adjust the property names and indices based on your CSV structure
                    GRID_TYPE = columns[1],
                    GAME_ID = columns[2],
                    GAME_EVENT_ID = columns[3],
                    PLAYER_ID = columns[4],
                    PLAYER_NAME = columns[5],
                    TEAM_ID = columns[6],
                    TEAM_NAME = columns[7],
                    PERIOD = columns[8],
                    MINUTES_REMAINING = columns[9],
                    SECONDS_REMAINING = columns[10],
                    EVENT_TYPE = columns[11],
                    ACTION_TYPE = columns[12],
                    SHOT_TYPE = columns[13],
                    SHOT_ZONE_BASIC = columns[14],
                    SHOT_ZONE_AREA = columns[15],
                    SHOT_ZONE_RANGE = columns[16],
                    SHOT_DISTANCE = columns[17],
                    LOC_X = columns[18],
                    LOC_Y = columns[19],
                    SHOT_ATTEMPTED_FLAG = columns[20],
                    SHOT_MADE_FLAG = columns[21],
                    GAME_DATE = columns[22],
                    HTM = columns[23],
                    VTM = columns[24],
                };

                // Add the ShotData object to the list
                shotDataList.Add(shotData);
            }

            return shotDataList;
        }
        private List<LeagueShotData> ParseCsvToLeagueShotDataList(string csvData)
        {
            // Implement the logic to parse the CSV data and convert it into a List of objects
            // You can use libraries like CsvHelper or implement custom logic to achieve this

            // Example implementation:
            List<LeagueShotData> shotDataList = new List<LeagueShotData>();

            // Split the CSV data by lines
            string[] lines = csvData.Split(Environment.NewLine);

            // Skip the header line if necessary
            bool skipHeader = true;

            foreach (string line in lines)
            {
                // Skip the header line
                if (skipHeader)
                {
                    skipHeader = false;
                    continue;
                }
                if (line == "")
                {
                    break;
                }

                // Split the line into columns
                string[] columns = line.Split(',');

                // Create a ShotData object and populate its properties
                LeagueShotData shotData = new LeagueShotData
                {
                    // Populate the properties with the CSV column values
                    // Adjust the property names and indices based on your CSV structure


                    GRID_TYPE = columns[1],
                    SHOT_ZONE_BASIC = columns[2],
                    SHOT_ZONE_AREA = columns[3],
                    SHOT_ZONE_RANGE = columns[4],
                    FGA = columns[5],
                    FGM = columns[6],
                    FG_PCT = columns[7]
                };

                // Add the ShotData object to the list
                shotDataList.Add(shotData);
            }

            return shotDataList;
        }
        private double getFGAverage(List<ShotData> shotData)
        {
            double average = 0.0;
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_MADE_FLAG.Equals("1"))
                {
                    average++;
                }
            }
            average /= shotData.Count;
            return average;
        }
        private double getThreeAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_TYPE.Equals("3PT Field Goal"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getPaintAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("In The Paint (Non-RA)") || sh.SHOT_ZONE_BASIC.Equals("Restricted Area"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getRMidAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Right Side(R)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getLMidAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Left Side(L)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getRCenMidAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Right Side Center(RC)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getLCenMidAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Left Side Center(LC)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getCenMidAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Center(C)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getRThreeAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Right Corner 3"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getLThreeAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Left Corner 3"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getRWingThreeAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Above the Break 3") || sh.SHOT_ZONE_BASIC.Equals("Right Side Center(RC)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getLWingThreeAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Above the Break 3") || sh.SHOT_ZONE_BASIC.Equals("Left Side Center(LC)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private double getCenThreeAverage(List<ShotData> shotData)
        {
            List<ShotData> tempShotData = new List<ShotData>();
            foreach (ShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Above the Break 3") || sh.SHOT_ZONE_BASIC.Equals("Center(C)"))
                {
                    tempShotData.Add(sh);
                }
            }
            return getFGAverage(tempShotData);
        }
        private Dictionary<string, string> getLeagueShotAverages(List<LeagueShotData> shotData)
        {
            Dictionary<string, string> averages = new Dictionary<string, string>();
            double tempPaintData = 0.0;
            double tempMidCenData = 0.0;
            double tempMidLData = 0.0;
            double tempMidRData = 0.0;

            foreach (LeagueShotData sh in shotData)
            {
                if (sh.SHOT_ZONE_BASIC.Equals("Above the Break 3") && sh.SHOT_ZONE_AREA.Equals("Center(C)"))
                {
                    averages.Add("CenterThree", Math.Round(double.Parse(sh.FG_PCT) * 100, 2) + "%");
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Above the Break 3") && sh.SHOT_ZONE_AREA.Equals("Left Side Center(LC)"))
                {
                    averages.Add("LWingThree", Math.Round(double.Parse(sh.FG_PCT) * 100, 2) + "%");
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Above the Break 3") && sh.SHOT_ZONE_AREA.Equals("Right Side Center(RC)"))
                {
                    averages.Add("RWingThree", Math.Round(double.Parse(sh.FG_PCT) * 100, 2) + "%");
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("In The Paint (Non-RA)")|| sh.SHOT_ZONE_BASIC.Equals("Restricted Area"))
                {
                    tempPaintData += double.Parse(sh.FG_PCT);
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Left Corner 3"))
                {
                    averages.Add("LCornerThree", Math.Round(double.Parse(sh.FG_PCT) * 100, 2) + "%");
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Right Corner 3"))
                {
                    averages.Add("RCornerThree", Math.Round(double.Parse(sh.FG_PCT) * 100, 2) + "%");
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Center(C)"))
                {
                    tempMidCenData += double.Parse(sh.FG_PCT);
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Left Side Center(LC)"))
                {
                    averages.Add("LCenMid", Math.Round(double.Parse(sh.FG_PCT) * 100, 2) + "%");
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Right Side Center(RC)"))
                {
                    averages.Add("RCenMid", Math.Round(double.Parse(sh.FG_PCT) * 100, 2) + "%");
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Left Side(L)"))
                {
                    tempMidLData += double.Parse(sh.FG_PCT);
                }
                else if (sh.SHOT_ZONE_BASIC.Equals("Mid-Range") && sh.SHOT_ZONE_AREA.Equals("Right Side(R)"))
                {
                    tempMidRData += double.Parse(sh.FG_PCT);
                }

            }
            averages.Add("Paint",Math.Round(tempPaintData / 5 * 100, 2) + "%");
            averages.Add("CenMid", Math.Round(tempMidCenData / 2 * 100, 2) + "%");
            averages.Add("LMid", Math.Round(tempMidLData / 2 * 100, 2) + "%");
            averages.Add("RMid", Math.Round(tempMidRData / 2 * 100, 2) + "%");
            return averages;
        }

    }
}
