'use strict';

function getGoalState(n){
    let goalState = [];
    for(let i=0; i<(n-1); i++){
        goalState.push(i+1);
    }
    goalState.push(0);
    return goalState;
}

function move(state, pos, relPos) {
    let newState;
    newState = state.slice(); //copy state
    swap(newState, pos, pos + relPos);
    return newState;
}

function swap(state, from, to) {
    let cache = state[from];
    state[from] = state[to];
    state[to] = cache;
}

function compare(arr1, arr2) {
    if (!arr1 || !arr2) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

function getStateId(state){
    return state.join('-');
}

class NPuzzle {
    constructor(init) {
        //EX: init = {213456780: null} for initial state [2,1,3,4,5,6,7,8,0]
        let n =0;
        let initStates = [];
        for (let key in init){
            const initState = key.split('-');
            initState.forEach((num, index)=>{
                initState[index] = Number(num)
            });
            initStates.push(initState);
            n = initState.length;
        }

        const that = this;
        const sideSize = Math.sqrt(n);
        const moves = [
            {
                to: 'up', relPos: -1*sideSize, isMovable: (row, col) => {
                    return (row > 0)
                }
            },
            {
                to: 'left', relPos: -1, isMovable: (row, col) => {
                    return (col > 0)
                }
            },
            {
                to: 'down', relPos: sideSize, isMovable: (row, col) => {
                    return (row < (sideSize - 1))
                }
            },
            {
                to: 'right', relPos: 1, isMovable: (row, col) => {
                    return (col < (sideSize - 1))
                }
            }
        ];
        this.states = init || {};
        this.cost = 0;
        this.goalState = getGoalState(n);
        this.move = move;
        this.getChildren = (state) => {
            //let state = that.states[stateId].s;
            let newState;
            let children = [];
            let pos = state.indexOf(0);
            let row = Math.floor(pos / sideSize);
            let col = pos % sideSize;
            let stateId = getStateId(state);
            moves.forEach((direction) => {
                if (direction.isMovable(row, col)) {
                    newState = move(state, pos, direction.relPos);
                    const newStateId = getStateId(newState);
                    if (typeof that.states[newStateId] === 'undefined') {
                        that.states[newStateId] = stateId; //trace back to last state for later use
                        children.push(newState);
                    }
                }
            });
            return children;
        };
        this.traceBack = (state) => {
            const stateId = getStateId(state);
            let steps = [stateId];
            let previous = that.states[stateId];
            while (previous) {
                steps.push(previous);
                previous = that.states[previous];
            }
            return steps;
        };
        this.breadthSearch = (states) => {
            let steps, children = [];
            states.forEach((state) => {
                this.cost++;
                if (compare(that.goalState, state)) {
                    console.log('Bingo!!');
                    steps= {steps: that.traceBack(state).reverse()};
                } else {
                    that.getChildren(state).forEach((childState) => {
                        children.push(childState);
                    })
                }
            });
            return steps || children
        };
        this.engage = (states) => {
            const startTime = new Date();
            let search = that.breadthSearch(initStates || states);
            let i= 0;
            console.log(`start with: ${initStates}`);
            while (search.length) {
                i++;
                search = that.breadthSearch(search);
                console.log(`depth: ${i}`)
            }
            const endTime = new Date();
            console.log(`Total time: ${endTime-startTime}ms`);
            console.log(`Cost: ${that.cost} steps.`);
            console.log(`Depth: ${search.steps.length}`);
            console.log(`Solution: ${JSON.stringify(search.steps)}`);
            return search;
        }
    }
}



/* This post on stackexchange explained the condition when a puzzle
   is unsolvable http://math.stackexchange.com/a/838818
*/
function checkSolvable(state) {
    var pos = state.indexOf(0);
    var _state = state.slice();
    _state.splice(pos,1);
    var count = 0;
    for (var i = 0; i < _state.length; i++) {
        for (var j = i + 1; j < _state.length; j++) {
            if (_state[i] > _state[j]) {
                count++;
            }
        }
    }
    return count % 2 === 0;
}

/* Fisher-Yates shuffle http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle*/
function shuffle(array) {
    var size = array.length;
    var rand;
    for (var i = 1; i < size; i += 1) {
        rand = Math.round(Math.random() * i);
        swap(array, rand, i);
    }
    return array;
}

function generatePuzzle(state) {
    var firstElement, secondElement;
    var _state = state.slice();
    shuffle(_state);
    if (!checkSolvable(_state)) {
        firstElement = _state[0] !== 0 ? 0 : 3;
        secondElement = _state[1] !== 0 ? 1 : 3;
        swap(_state, firstElement, secondElement);
    }
    // _state = [1, 0, 2, 3, 4, 5, 6, 7, 8];
    // _state = [0,7,4,8,2,1,5,3,6];
    // _state = [6,3,1,4,7,2,0,5,8];
    // _state = [8,0,1,3,4,7,2,6,5];
    _state = [8, 6, 7, 2, 5, 4, 3, 0, 1]; //32 steps
    // _state = [0,8,7,6,3,5,1,4,2]; //29 steps
    console.log('Puzzle to solve: [' + _state + ']');
    return _state;
}


module.exports = NPuzzle;