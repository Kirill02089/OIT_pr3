define(function (require) {
    return {
        removeCells: function (cells) {
            var newCells = require('./drawer').virtualBox,
                resultCells = Object.assign([], cells),
                changesArr = [];

            for (var i = 0; i < newCells.length; ++i) {
                for (var j = 0; j < newCells[i].length; ++j) {
                    var cell = newCells[i][j],
                        winningCells = {};

                    if (!cell.type) {
                        continue;
                    }

                    winningCells = this.findWinner(i, j);

                    if (this.isWin(winningCells.horizontal) || this.isWin(winningCells.vertical)) {
                        changesArr.push({
                            i: i,
                            j: j
                        })
                    }

                }
            }

            updateArr(changesArr);

            function updateArr(changes) {
                changes.forEach(function (change) {
                    resultCells[change.i][change.j].type = 0;
                })
            }

            return resultCells;
        },
        removeCell: function () {

        },
        findWinner: function (i, j) {
            var cells = require('./drawer').virtualBox,
                self = this;

            if (i === undefined && j === undefined) {
                return checkOnWin();
            }

            var left = getEqual('left', i, j),
                right = getEqual('right', i, j),
                up = getEqual('up', i, j),
                down = getEqual('down', i, j);

            return {
                horizontal: left.max + right.max + 1,
                vertical: up.max + down.max + 1
            };

            function isUndefined(item) {
                return item === undefined;
            }

            function getEqual(direction, a, b) {
                var max = 0,
                    i = a,
                    j = b,
                    vCell = cells[i][j],
                    type = cells[i][j].type;
                switch (direction) {
                    case 'left': {
                        --j;
                        vCell = cells[i][j];
                        while (vCell !== undefined && vCell.type !== 0 && type === vCell.type) {
                            ++max;
                            --j;
                            vCell = cells[i][j];
                        }
                        ++j;
                        break;
                    }
                    case 'right': {
                        ++j;
                        vCell = cells[i][j];
                        while (vCell !== undefined && vCell.type !== 0 && type === vCell.type) {
                            ++max;
                            ++j;
                            vCell = cells[i][j];
                        }
                        --j;
                        break;
                    }
                    case 'up': {
                        --i;
                        if (!isUndefined(cells[i])) {
                            vCell = cells[i][j];
                        } else {
                            ++i;
                            break;
                        }

                        while (vCell !== undefined && vCell.type !== 0 && type === vCell.type) {
                            ++max;
                            --i;
                            if (isUndefined(cells[i])) {
                                break;
                            }
                            vCell = cells[i][j];
                        }
                        ++i;
                        break;
                    }
                    case 'down': {
                        ++i;
                        if (!isUndefined(cells[i])) {
                            vCell = cells[i][j];
                        } else {
                            ++i;
                            break;
                        }

                        while (vCell !== undefined && vCell.type !== 0 && type === vCell.type) {
                            ++max;
                            ++i;
                            if (isUndefined(cells[i])) {
                                break;
                            }
                            vCell = cells[i][j];
                        }

                        --i;
                        break;
                    }
                }

                return {
                    max: max,
                    borders: {
                        i: i,
                        j: j
                    }
                };
            }

            function checkOnWin() {
                for (var ti = 0; ti < cells.length; ++ti) {
                    for (var tj = 0; tj < cells[ti].length; ++tj) {
                        var checkingCell = self.findWinner(ti, tj);

                        if (self.isWin(checkingCell.horizontal) || self.isWin(checkingCell.vertical)) {
                            return true;
                        }
                    }
                }

                return false;
            }
        },
        offset: function (arr) {
            var elements = require('./elements');

            for (var i = 0; i < arr.length; ++i) {
                for (var j = 0; j < arr[i].length; ++j) {
                    var cell = arr[i][j];
                    if (!cell.type) {
                        for (var ii = i; ii >= 0; --ii) {
                            var innerCell = {};
                            if (arr[ii - 1] === undefined) {
                                var type = (Math.floor((Math.random() * 10) % 4) + 1);

                                innerCell = elements.Cell(ii + '_' + j, type);
                            } else {
                                innerCell = Object.assign({}, arr[ii - 1][j]);
                                innerCell.index = arr[ii][j].index;
                            }

                            arr[ii][j] = innerCell;
                        }
                    }
                }
            }
            return arr;
        },
        isWin: function (a) {
            return a >= 3;
        }
    }
});