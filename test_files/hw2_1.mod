#SETS
set STYLE; #i
set MANUFACTURER; #j
set FOREIGN within MANUFACTURER; #j
#PARAMETERS
param PRICE {i in STYLE, j in MANUFACTURER} >= 0;
param CAPACITY {i in STYLE, j in MANUFACTURER} >= 0;
param ORDER {i in STYLE} >= 0;
param CAPACITY_TOTAL {j in MANUFACTURER} >= 0;
param QUOTA >= 0;
#VARIABLES
var X {i in STYLE, j in MANUFACTURER} >= 0;
# OBJECTIVE FUNCTION
minimize COST: 
    sum {i in STYLE, j in MANUFACTURER} PRICE [i,j] * X[i,j];
#CONSTRAINTS
subject to MAX_ORDER_STYLE {i in STYLE, j in MANUFACTURER}: 
    X[i,j] <= CAPACITY[i,j];
subject to DEMAND {i in STYLE}: 
    sum {j in MANUFACTURER} X[i,j] >= ORDER [i];
subject to MAX_ORDER {j in MANUFACTURER}: 
    sum {i in STYLE} X[i,j] <= CAPACITY_TOTAL [j];
subject to MAX_IMPORT {i in STYLE}:  
    sum {j in FOREIGN} X[i,j] <= QUOTA;