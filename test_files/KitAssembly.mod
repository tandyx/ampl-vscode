var a1 >=1;
var a2 >=2;
var a3 >=4;
var a4 >=12;
var a5 >=6;
var a6 >=0;

var b1 >=0;
var b2 >=2;
var b3 >=4;
var b4 >=4;
var b5 >=4;
var b6 >=0;

var c1 >=2;
var c2 >=1;
var c3 >=1;
var c4 >=0;
var c5 >=2;
var c6 >=0;

var d1 >=1;
var d2 >=1;
var d3 >=4;
var d4 >=2;
var d5 >=3;
var d6 >=0;

var e1 >=2;
var e2 >=2;
var e3 >=3;
var e4 >=6;
var e5 >=4;
var e6 >=0;

var f1 >=2;
var f2 >=2;
var f3 >=3;
var f4 >=6;
var f5 >=3;
var f6 >=0;

var g1 >=1;
var g2 >=2;
var g3 >=4;
var g4 >=4;
var g5 >=5;
var g6 >=0;

var h1 >=1;
var h2 >=2;
var h3 >=3;
var h4 >=2;
var h5 >=4;
var h6 >=0;

var j1 >=1;
var j2 >=2;
var j3 >=4;
var j4 >=6;
var j5 >=6;
var j6 >=0;

var k1 >=1;
var k2 >=1;
var k3 >=2;
var k4 >=10;
var k5 >=5;
var k6 >=0;

minimize OverageCost: 2*(a6-25) + 1*(b6-14) + 4*(c6-6) + 15*(d6-11) + 2.50*(e6-17) + 4*(f6-16) + 3.50*(g6-16) + 2*(h6-12) + 1.50*(j6-19) + 1.50*(k6-19);

subject to Cars: 0.2*a1 + 0.2*b1 + 1*c1 + 2*d1 + 0.4*e1 + 0.8*f1 + 0.4*g1 + 0.5*h1 + 0.3*j1 + 0.2*k1 >= 12;
subject to Hikers: 0.2*a2 + 0.2*b2 + 1*c2 + 2*d2 + 0.4*e2 + 0.8*f2 + 0.4*g2 + 0.5*h2 + 0.3*j2 + 0.2*k2 >= 10.8;
subject to Campers: 0.2*a3 + 0.2*b3 + 1*c3 + 2*d3 + 0.4*e3 + 0.8*f3 + 0.4*g3 + 0.5*h3 + 0.3*j3 + 0.2*k3 >= 18.9;
subject to Sports: 0.2*a4 + 0.2*b4 + 1*c4 + 2*d4 + 0.4*e4 + 0.8*f4 + 0.4*g4 + 0.5*h4 + 0.3*j4 + 0.2*k4 >= 18.8;
subject to Scouting: 0.2*a5 + 0.2*b5 + 1*c5 + 2*d5 + 0.4*e5 + 0.8*f5 + 0.4*g5 + 0.5*h5 + 0.3*j5 + 0.2*k5 >= 16.8;

subject to AceBandages: a1 + a2 + a3 + a4 + a5 = a6;
subject to BandAids: b1 + b2 + b3 + b4 + b5 = b6;
subject to Flares: c1 + c2 + c3 + c4 + c5 = c6;
subject to Blankets: d1 + d2+ d3 + d4 + d5 = d6;
subject to AdhesiveTape: e1 + e2 + e3 + e4 + e5 = e6;
subject to ColdPacks: f1 + f2 + f3 + f4 + f5 = f6;
subject to SunburnCream: g1 + g2 + g3 + g4 + g5 = g6;
subject to Antiseptic: h1 + h2 + h3 + h4 + h5 = h6;
subject to Caplets: j1 + j2 + j3 + j4 + j5 = j6;
subject to RubberGloves: k1 + k2 + k3 + k4 + k5 = k6;


