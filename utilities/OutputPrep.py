from collections import Counter
from datetime import datetime
import numpy as np
import pandas as pd
from pandas.core.common import flatten

def outpuData(x,prediction,z,temp):
  
    vizualizationData= pd.concat([z['datetime'],x],axis=1)
    output= pd.concat([z['datetime'],pd.DataFrame(prediction,columns=['prediction'])],axis=1)
    temp=pd.concat([z['datetime'],temp],axis=1)


    ouputCountTruePerDay=output[output['prediction']==True].groupby('datetime').count().values.tolist()
    ouputflatten = [val for sublist in ouputCountTruePerDay for val in sublist]

    vizualizationData=vizualizationData.groupby('datetime').mean()
    vizualizationData.update(vizualizationData.div(vizualizationData.sum(axis=0),axis=1))
    vizualizationData=(vizualizationData*100).apply(np.ceil)

    tempMeanPerDay=temp.fillna(method='ffill').groupby('datetime').mean().apply(np.ceil)
    output= pd.concat([z['site_id'],pd.DataFrame(prediction,columns=['prediction'])],axis=1).values.tolist()
    ouputAllflatten = [val for sublist in output for val in sublist]

    # Count
    kpisCount=vizualizationData.shape[0]
    WeatherCount=tempMeanPerDay.shape[0]
    SiteCount=z['site_id'].value_counts().shape[0]

    date=[element.strftime('%Y-%m-%d') for element in z['datetime'].dt.date.drop_duplicates().values.tolist()]
    months=Counter([ datetime.strptime(element, '%Y-%m-%d').month for element in date]).most_common()
    somme=sum(j for i, j in months)
    MonthConversion = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

    months = [list(ele) for ele in months]

    for i in months:
        i[1]=i[1]/somme
        i[0]=MonthConversion[i[0]]


    ouputflatten.extend([0]*(len(date)-len(ouputflatten)))

    Counters=[SiteCount,WeatherCount,kpisCount,sum(ouputflatten)]

    payload={
        "bbe":vizualizationData['bbe'].values.tolist(),
        "severaly_error_second":(vizualizationData['severaly_error_second']/vizualizationData['severaly_error_second'].sum()).values.tolist(),
        "error_second":vizualizationData['error_second'].values.tolist(),
        "unavail_second":vizualizationData['unavail_second'].values.tolist(),
        "avail_time":vizualizationData['avail_time'].values.tolist(),
        "rlfPerDat":ouputflatten,
        "humidity":tempMeanPerDay['meanHumidity'].values.tolist(),
        "temperature":tempMeanPerDay['meanTemperature'].values.tolist(),
        "windSpeed":tempMeanPerDay['wind_speed_day1'].values.tolist(),
        "date":date,
        'output':ouputAllflatten,
        "Counters":Counters,
        "months":months
    }
    return payload
    
    
    
    