define(function (require) {
    return {
        removeCells: function (cells) {
            var newCells = require('./drawer').virtualBox,
                resultCells = Object.assign([], cells),
                logService = require('./log.service'),
                changesArr = [],
                self = this;

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
                            ii: i,
                            jj: j
                        })
                    }

                }
            }

            updateArr(changesArr);

            function updateArr(changes) {
                logService.updateScore(changes.length);

                var type = 0;

                if (logService.isGameOver()) {
                    changes = self.gameOverArr();
                    type = 13;
                }

                changes.forEach(function (change) {
                    resultCells[change.ii][change.jj].type = type;
                });

            }

            return resultCells;
        },
        gameOverArr: function () {
            var arr = require('./drawer').virtualBox,
                finalArr = [];

            finalArr = arr.reduce(function (prevRow, currentRow) {
                var rowArr = currentRow.map(function (cell) {
                    var cellIds = cell.parseIndex();

                    return {
                        ii: cellIds[0],
                        jj: cellIds[1]
                    }
                });

                return prevRow.concat(rowArr);
            }, arr[0]);

            return finalArr.slice(arr[0].length, this.length);
        },
        findWinner: function (i, j) {
            var cells = require('./drawer').virtualBox,
                logService = require('./log.service'),
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
                if (logService.isGameOver()) {
                    return false;
                }

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
        },
        swapCells: function (first, second) {
            var drawer = require('./drawer'),
                elements = require('./elements'),
                result = false;

            if (typeof first === 'undefined' || first === '') {
                return;
            }

            var firstCell = elements.getCellByIdFromArr(first),
                secondCell = elements.getCellByIdFromArr(second),
                copyFirstCell = Object.assign({}, firstCell);

            if (this.swapIsPossible(firstCell, secondCell)) {
                Object.assign(firstCell, secondCell);
                Object.assign(secondCell, copyFirstCell);
                secondCell.index = firstCell.index;
                firstCell.index = copyFirstCell.index;
                drawer.render();
                result = true;
            }

            return result;
        },
        swapIsPossible: function (first, second) {
            var firstIds = first.parseIndex(),
                secondIds = second.parseIndex();

            return firstIds.reduce(function (prev1, current1) {
                return secondIds.reduce(function (prev2, current2) {
                    return check(prev1 - prev2, current1 - current2);
                })
            });

            function check(a, b) {
                a = Math.abs(a);
                b = Math.abs(b);

                return ((a > -1 && a < 2) && !b) || ((b > -1 && b < 2) && !a)
            }
        }
    }
});