import numpy as np
import pandas as pd
from pandas.core.common import flatten

def outpuData(x,prediction,z,temp):
    normalized_x=x.apply(np.ceil)
  
    vizualizationData= pd.concat([z['datetime'],normalized_x],axis=1)
    output= pd.concat([z['datetime'],pd.DataFrame(prediction,columns=['prediction'])],axis=1)
    temp=pd.concat([z['datetime'],temp],axis=1)

    ouputCountTruePerDay=output[output['prediction']==True].groupby('datetime').count().values.tolist()
    ouputflatten = [val for sublist in ouputCountTruePerDay for val in sublist]

    vizualizationData=vizualizationData.groupby('datetime').mean()
    vizualizationData.update(vizualizationData.div(vizualizationData.sum(axis=0),axis=1))
    vizualizationData=(vizualizationData*100).astype(int)

    tempMeanPerDay=temp.fillna(method='ffill').groupby('datetime').mean().astype(int)
    print(print(temp.tail(50)))
    
    payload={
        "bbe":vizualizationData['bbe'].values.tolist(),
        "severaly_error_second":(vizualizationData['severaly_error_second']/vizualizationData['severaly_error_second'].sum()).values.tolist(),
        "error_second":vizualizationData['error_second'].values.tolist(),
        "unavail_second":vizualizationData['unavail_second'].values.tolist(),
        "avail_time":vizualizationData['avail_time'].values.tolist(),
        "rlfPerDat":ouputflatten,
        "tempPerDayMean":tempMeanPerDay.values.tolist()
    }
    return payload
    
    
    
    