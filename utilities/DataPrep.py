# -*- coding: utf-8 -*-

import copy
import os
import numpy as np
import pandas as pd


def DataPrep(path):
    # Upload Data
    xlsx = pd.ExcelFile(path)
    sheets = pd.read_excel(xlsx, sheet_name=None, index_col=0,
                           na_filter=True, convert_float=False)

    met_stations = sheets['met-stations']
    met_forecast = sheets['met-forecast']
    rl_kpis = sheets['rl-kpis']
    distances = sheets['distances']

    # Station names
    stations = met_stations['station_no'].tolist()
    met_forecast['meanTemperature']=met_forecast[['temp_max_day1','temp_min_day1']].mean(axis=1)
    met_forecast['meanTemperature']=met_forecast['meanTemperature'].fillna(met_forecast['meanTemperature'].mean())
    met_forecast['meanHumidity']=met_forecast[['humidity_max_day1','humidity_min_day1']].mean(axis=1)
    met_forecast['meanHumidity']=met_forecast['meanHumidity'].fillna(met_forecast['meanHumidity'].mean())
    met_forecast['wind_speed_day1']=met_forecast['wind_speed_day1'].fillna(met_forecast['wind_speed_day1'].mean())
    # Forecast dates
    met_forecast_work = met_forecast[[
        'station_no', 'datetime']]
    meteo = copy.deepcopy(met_forecast_work[['station_no', 'datetime']])
    temp =  met_forecast[['meanTemperature','meanHumidity','wind_speed_day1']]
    meteo = pd.concat([meteo, temp], axis=1)
    meteo = meteo.groupby(by=['station_no', 'datetime'], as_index=False).agg(
        lambda x: 1 if sum(x) > 1 else sum(x))

    def find_nearest_stations(site_id: str, distances: pd.DataFrame, stations: list, k: int = 1) -> str:
        temp = distances[[site_id]].sort_values(by=[site_id])
        temp = temp.loc[[x for x in temp.index if x in stations]].head(k)
        return list(temp.index)

        
    rl_kpis_work = rl_kpis[["site_id", "datetime", "severaly_error_second",
                            "error_second", "unavail_second", "avail_time", "bbe", "rlf"]]
    rl_kpis_work['nearest_station'] = [find_nearest_stations(
        site_id, distances, stations)[0] for site_id in rl_kpis['site_id']]
    rl_kpis_work['forecast_datetime'] = [
        x - pd.Timedelta(days=1) for x in rl_kpis_work['datetime']]
    meteo['datetime'] = [pd.Timestamp(x) for x in meteo['datetime']]
    rl_kpis_work['forecast_datetime'] = [pd.Timestamp(
        x) for x in rl_kpis_work['forecast_datetime']]

    # Modify name to merge
    meteo.rename(columns={'datetime': 'forecast_datetime',
                 'station_no': 'nearest_station'}, inplace=True)
    # Replacing Nearest Stations without Forecast

    # weather station names.
    ws = [i for i in distances.index if 'WS' in i]

    # distances to weather stations with forecast.
    ws_with_forecast = np.intersect1d(
        rl_kpis_work['nearest_station'].unique(), meteo['nearest_station'].unique())
    distances_ws_with_forecast = distances.loc[ws, ws_with_forecast].copy()

    # weather stations without forecast.
    ws_without_forecast = np.setdiff1d(
        rl_kpis_work['nearest_station'].unique(), meteo['nearest_station'].unique())
    ws_replacement = [(i, distances_ws_with_forecast.loc[i].index[distances_ws_with_forecast.loc[i].argmin()])
                      for i in ws_without_forecast]

    # replacing in dataset.
    for i in ws_replacement:
        rl_kpis_work.loc[rl_kpis_work['nearest_station']
                         == i[0], 'nearest_station'] = i[1]

    merged_df = pd.merge(rl_kpis_work, meteo,
                         on=['nearest_station', 'forecast_datetime'],
                         validate='m:m')
    # Preparing Data For vizulasation
    x = merged_df.drop(
        columns=['rlf', 'site_id', 'nearest_station', 'datetime', 'forecast_datetime'])
    y = merged_df['rlf']
    z = merged_df[['site_id','datetime']]
    return x, y,z,temp

