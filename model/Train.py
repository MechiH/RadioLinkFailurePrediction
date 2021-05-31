import os
import sys
sys.path.insert(1, 'C:\\Users\\MSI\\Desktop\\worksapce\\P2mDeployModel')
from utilities.DataPrep import DataPrep
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


def trainModel():
    (x, y,z,t) = DataPrep(os.getcwd() +'\\Datasets\\testData.xlsx')

    rfc = RandomForestClassifier(verbose=1)
    rfc.fit(x, y)
    p = rfc.predict(x)

    s = accuracy_score(y, p)
    joblib.dump(rfc, 'RLF.model')
    print("Random Forest Classifier Success Rate :", "{:.2f}%".format(100*s))
