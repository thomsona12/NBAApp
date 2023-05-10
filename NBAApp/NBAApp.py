from nba_api.stats.static import players
from nba_api.stats.endpoints import shotchartdetail
import pandas as pd
# Storing Directory for All Players
player_dictionary = players.get_players()
# Returning first 5 players in player_dictionary
#print(player_dictionary[0:5], end="\n")
#lebron = [player for player in player_dictionary if player['full_name'] == 'LeBron James']
#print(lebron, end="\n")
#shotlog_lebron = shotchartdetail.ShotChartDetail(team_id = 0, player_id = '2544', 
#context_measure_simple = 'FGA', 
#season_type_all_star = ['Regular Season', 'Playoffs'])
#lebron_df = shotlog_lebron.get_data_frames()[0]
#lebron_df.head(10)
#lebron_df.to_csv('LeBron_James.csv')
#LeBron = pd.read_csv('LeBron_James.csv')

def get_shot_data(player_full_name):
    player_dictionary = players.get_players()
     
    player_info = [player for player in player_dictionary if player['full_name'] == player_full_name][0]
    player_id = player_info['id']
    print(player_id)
    
    player_shotlog = shotchartdetail.ShotChartDetail(team_id = 0, player_id = player_id, 
                                                 context_measure_simple = 'FGA', 
                                                 season_type_all_star = ['Regular Season', 'Playoffs'])
    
    player_df = player_shotlog.get_data_frames()[0]
    player_df.to_csv(f'{player_full_name}.csv')
    return player_df.head()

get_shot_data('Alex Caruso')