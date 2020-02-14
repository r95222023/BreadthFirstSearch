# BreadthFirstSearch
Breadth-first search algorithm for n-puzzle games.

It provides:

- a brute force Breadth-first search algorithm for n-puzzle games
- initial state parameter for parallel computation
- solvable check


Usage:
    const NPuzzle = require('./nPuzzle');
    initState = {'8-6-7-2-5-4-3-0-1': null};
    eightpuzzle = new NPuzzle(initState);
    eightpuzzle.engage();

for 8 puzzle:
'1-2-3-4-5-6-7-8-0' represent
  123
  456
  780
and similar for 15 puzzle.

Tests can then be run after installation of NodeJs with:

    node test
