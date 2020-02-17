import numpy as np
import math as math
history = {}


def get_goal_state(n):
    goalstate = []
    for i in range(0, n**2-1):
        goalstate.append(i+1)
    goalstate.append(0)
    return goalstate


def get_state_id(state):
    return str(state)


def move(state, pos, rel_pos):
    new_state = state.copy()
    return swap(new_state, pos, pos + rel_pos)


def swap(state, from_pos, to_pos):
    cache = state[from_pos]
    state[from_pos] = state[to_pos]
    state[to_pos] = cache
    return state


# def compare(arr1, arr2):
#     res = True
#     if not arr1 or not arr2:
#         res = False
#
#     for i in range(0, len(arr1)):
#         if arr1[i] != arr2[i]:
#             res = False
#     return res

def compare(state):
    res = True
    for i in range(0, len(state)-1):
        if state[i] != i+1:
            res = False
    return res


def is_solvable(state):
    """Check if the puzzle is solvable."""
    # count the number of inversions
    # refer to https://github.com/gliderkite/puzzle15/blob/master/puzzle15.py
    inversions = 0
    for i, v in [(i, v) for i, v in enumerate(state) if v != len(state)]:
        j = i + 1
        while j < len(state):
            if state[j] < v:
                inversions += 1
            j += 1
    # check if the puzzle is solvable
    size = int(math.sqrt(len(state)))
    # grid width is odd and number of inversion even -> solvable
    if size % 2 != 0 and inversions % 2 == 0:
        return True
    # grid width is even
    if size % 2 == 0:
        emptyrow = size - state.index(0) // size
        return (emptyrow % 2 != 0) == (inversions % 2 == 0)
    return False


def get_moves(side_size, col, row):
    return {
        'up': {
            'rel_pos': -1*side_size,
            'is_movable': row > 0
        },
        'left': {
            'rel_pos': -1,
            'is_movable': col > 0
        },
        'down': {
            'rel_pos': side_size,
            'is_movable': row < (side_size-1)
        },
        'right': {
            'rel_pos': 1,
            'is_movable': col < (side_size-1)
        },
    }


def get_children(state):
    children = []
    side_size = int(math.sqrt(len(state)))
    pos = state.index(0)
    row = pos // side_size
    col = pos % side_size
    moves = get_moves(side_size, col, row)
    for direction in moves:
        if moves[direction]['is_movable']:
            new_state = move(state, pos, moves[direction]['rel_pos'])
            state_id = get_state_id(state)
            new_state_id = get_state_id(new_state)
            if not (new_state_id in history):
                history[new_state_id] = state_id
                children.append(new_state)

    return children


def trace_back(state):
    state_id = get_state_id(state)
    steps = [state_id]
    if state_id in history:
        previous = history[state_id]
    else:
        previous = False
    i = 0
    while previous and i < 10:
        i = i + 1
        steps.append(previous)
        if previous in history:
            previous = history[previous]
        else:
            previous = False
    return steps[::-1]


def breadth_search(states):
    cost = 0
    steps = []
    children = []
    for state in states:
        cost = cost + 1
        if compare(state):
            print('Bingo!!')
            steps = {'steps': trace_back(state), 'cost': cost}
        else:
            for child in get_children(state):
                children.append(child)
    return steps if ('steps' in steps) else children


def engage(state):
    history[get_state_id(state)] = False
    search = breadth_search([state])
    i = 0
    if is_solvable(state) or True:
        while not ('steps' in search):
            i = i+1
            search = breadth_search(search)
        print('Depth: {}'.format(i))
        print('Cost: {}'.format(search['cost']))
        print('Steps: {}'.format(search['steps']))
    else:
        print('Warning: the given state is not solvable')
    return


engage([1, 0, 2, 4, 5, 7, 3, 8, 9, 6, 11, 12, 13, 10, 14, 15])
