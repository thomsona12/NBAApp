namespace NBAAppWeb.Models
{
    public class ShotData
    {
        
        public string GRID_TYPE { get; set; }
        public string GAME_ID { get; set; }
        public string GAME_EVENT_ID { get; set; }
        public string PLAYER_ID { get; set; }
        public string PLAYER_NAME { get; set; }
        public string TEAM_ID { get; set; }
        public string TEAM_NAME { get; set; }
        public string PERIOD { get; set; }
        public string MINUTES_REMAINING { get; set; }
        public string SECONDS_REMAINING { get; set; }
        public string EVENT_TYPE { get; set; }
        public string ACTION_TYPE { get; set; }
        public string SHOT_TYPE { get; set; }
        public string SHOT_ZONE_BASIC { get; set; }
        public string SHOT_ZONE_AREA { get; set; }
        public string SHOT_ZONE_RANGE { get; set; }
        public string SHOT_DISTANCE { get; set; }
        public string LOC_X { get; set; }
        public string LOC_Y { get; set; }
        public string SHOT_ATTEMPTED_FLAG { get; set; }
        public string SHOT_MADE_FLAG { get; set; }
        public string GAME_DATE { get; set; }
        public string HTM { get; set; }
        public string VTM { get; set; }
    }
}
