set STORES;
set DISTRIBUTION_CENTERS;

param PRICE {i in STORES, j in DISTRIBUTION_CENTERS} >= 0;
param DEMAND {i in STORES} >= 0;
param CAPACITY {j in DISTRIBUTION_CENTERS} >= 0;

var X {i in STORES, j in DISTRIBUTION_CENTERS} >= 0;

minimize COST:
    sum {i in STORES, j in DISTRIBUTION_CENTERS} PRICE[i,j] * X[i,j];

subject to STRORAGE_CONSTRAINTS {i in STORES}:
    sum {j in DISTRIBUTION_CENTERS} X[i,j] >= DEMAND[i];

subject to DISTRIBUTION_CONSTRAINTS {j in DISTRIBUTION_CENTERS}:
    sum {i in STORES} X[i,j] >= CAPACITY[j];