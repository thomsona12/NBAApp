import sys
from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail
from nba_api.stats.endpoints import shotchartleaguewide
import pandas as pd
# Storing Directory for All Players
player_dictionary = players.get_players()

if __name__ == '__main__':
    # Check if the player name is provided as a command-line argument
    if len(sys.argv) > 1:
        for i in range (1 ,len(sys.argv)-1):
            player_name = sys.argv[i]+ " "
        player_name+= sys.argv[len(sys.argv)-1]
    else:
        player_name = input("Enter the player's name: ")

def get_shot_data(player_full_name):
    player_dictionary = players.get_players()
     
    player_info = next((player for player in player_dictionary if player['full_name'] == player_full_name), None)
    if player_info is None:
        print(f"No player found with the name '{player_full_name}'.")
        return
    player_id = player_info['id']
    print(player_id)

    league_shotchart = shotchartleaguewide.ShotChartLeagueWide(league_id='00',season='2022-23')
    
    player_shotlog = shotchartdetail.ShotChartDetail(team_id = 0, player_id = player_id, 
                                                 context_measure_simple = 'FGA',
                                                 season_nullable= '2022-23', 
                                                 season_type_all_star = ['Regular Season', 'Playoffs'])
    
    player_df = player_shotlog.get_data_frames()[0]
    player_df.to_csv(f'{player_full_name}.csv')
    league_df = league_shotchart.get_data_frames()[0]
    league_df.to_csv('league_shotchart.csv')
    return player_df.head()



get_shot_data(player_name)
