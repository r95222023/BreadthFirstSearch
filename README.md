# BreadthFirstSearch
Breadth-first search algorithm for n-puzzle games.

- **Source code:** https://github.com/r95222023/BreadthFirstSearch

It provides:

- a brute force Breadth-first search algorithm for n-puzzle games (8-puzzle, 15-puzzle etc)
- initial state parameter for parallel computation
- solvable check


Usage:
For Python, simply import from the file and initialize the class with a history or an empty dict.
Then run engage method to compute.

    from PyNPuzzle import NPuzzle
    
    fifteen_puzzle = NPuzzle({})
    fifteen_puzzle.engage([1, 0, 2, 4, 5, 7, 3, 8, 9, 6, 11, 12, 13, 10, 14, 15])
    
tests can then be run after installation of Python with:

    python run.py
    
For NodeJS, tests can then be run after installation of NodeJs with:

    node run
