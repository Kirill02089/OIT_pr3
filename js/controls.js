define(function (require) {
    return {
        bindEvents: function () {
            this.activateCellEvent();
            this.playEvent();
        },
        classToDo: function (elem, elemClass, action) {
            if (elem === null) {
                return
            }

            action ? elem.classList.add(elemClass) : elem.classList.remove(elemClass);
        },
        playEvent: function () {
            var drawer = require('./drawer'),
                logService = require('./log.service'),
                elements = require('./elements'),
                self = this;

            elements.playButton.addEventListener('click', function () {
                drawer.draw(10, 10);
                self.render2();
                logService.startTimer();
            });

        },
        render2: function () {
            setTimeout(renderAfterOffset, 200);

            function renderAfterOffset() {
                var drawer = require('./drawer'),
                    game = require('./game');

                newCells = game.removeCells(drawer.virtualBox);
                drawer.render(newCells);
                offsetCells = game.offset(newCells);
                setTimeout(() => drawer.render(offsetCells), 1000);
                newCells = offsetCells;

                if (game.findWinner()) {
                    setTimeout(renderAfterOffset, 1500);
                }
            }
        },
        activateCellEvent: function () {
            var elements = require('./elements'),
                game = require('./game'),
                currentCellId = '',
                target = {},
                self = this,
                cell;

            animations = {
                'active': 'active',
                'disable': 'disable'
            };

            elements.innerPlace.addEventListener('click', function (event) {
                target = event.target;
                cell = elements.getCellByIdFromArr(target.getAttribute('id'));
                currentCellId = cell.index;

                if (!cell) {
                    return;
                }

                cell.isActive = !cell.isActive;
                if (cell.isActive) {
                    activate(target);

                    var prevCellOnHtml = elements.getCellById(elements.activeCell),
                        currentCellOnHtml = elements.getCellById(cell.index);

                    if (cell.index !== elements.activeCell && game.swapCells(elements.activeCell, cell.index)) {
                        disable(prevCellOnHtml, true);
                        disable(currentCellOnHtml, true);
                        currentCellId = '';
                        if (game.findWinner()) {
                            self.render2();
                        } else {
                            game.swapCells(elements.activeCell, cell.index);
                            error(currentCellOnHtml);
                        }
                    } else {
                        prevCellOnHtml !== null && disable(prevCellOnHtml, true);
                    }
                } else {
                    disable(target);
                    currentCellId = '';
                }

                elements.activeCell = currentCellId;
            });

            function activate(item) {
                self.classToDo(item, animations.active, true);
            }
            function disable(item, depth) {
                self.classToDo(item, animations.active, false);
                if (depth) {
                    var id = item.getAttribute('id'),
                        vCell = elements.getCellByIdFromArr(id);

                    vCell.isActive = false;
                }
            }

            function error(item) {
                self.classToDo(item, animations.disable, true);
                setTimeout(function () {
                    self.classToDo(item, animations.disable, false);
                }, 500)
            }
        }
    }
});