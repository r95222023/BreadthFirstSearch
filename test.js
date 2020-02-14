const NPuzzle = require('./nPuzzle');
initState = {'8-6-7-2-5-4-3-0-1': null};
// initState = {'1-2-3-4-0-5-7-8-6': null};

eightpuzzle = new NPuzzle(initState);
state= [8,0,1,3,4,7,2,6,5];
// test = npuzzle.move([2,1,3,4,5,6,7,8,0], 8,-1)
//console.log(test)
//console.log(state)
eightpuzzle.engage();

initState = {'1-2-3-4-5-0-7-8-9-6-10-12-13-14-11-15': null};
//
fifteenpuzzle = new NPuzzle(initState);
fifteenpuzzle.engage();