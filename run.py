from PyNPuzzle import NPuzzle

fifteen_puzzle = NPuzzle({})
fifteen_puzzle.engage([1, 0, 2, 4, 5, 7, 3, 8, 9, 6, 11, 12, 13, 10, 14, 15])

# result:
# Bingo!!
# Memory Usage: 3760 bytes
# {'Depth': 7, 'Number of Nodes expanded': 207, 'Moves:': ['right', 'down', 'left', 'down', 'down', 'right', 'right'],
# 'Steps': ['[1, 0, 2, 4, 5, 7, 3, 8, 9, 6, 11, 12, 13, 10, 14, 15]', '[1, 2, 0, 4, 5, 7, 3, 8, 9, 6, 11, 12, 13, 10, 14, 15]',
# '[1, 2, 3, 4, 5, 7, 0, 8, 9, 6, 11, 12, 13, 10, 14, 15]', '[1, 2, 3, 4, 5, 0, 7, 8, 9, 6, 11, 12, 13, 10, 14, 15]',
# '[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 10, 14, 15]', '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 14, 15]',
# '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15]', '[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]']}
# Time taken: 0.011642217636108398 seconds


fifteen_puzzle = NPuzzle({})
fifteen_puzzle.engage([1, 0, 2, 4, 5, 7, 3, 8, 9, 6, 11, 12, 13, 10, 14, 15])

eitht_puzzle = NPuzzle({})