define(function (require) {
    return {
        virtualBox: [],
        draw: function (a, b) {
            var randomFruit = function () {
                return Math.floor((Math.random() * 10) % 4) + 1
            };
            var controls = require('./controls'),
                elements = require('./elements');

            for (var i = 0; i < a; ++i) {
                var row = [];
                for (var j = 0; j < b; ++j) {
                    var type = randomFruit();
                    row.push(new elements.Cell(i + '_' + j, type));
                }
                this.virtualBox.push(row);
            }

            this.render();
        },
        render: function (arr) {
            if (arr !== undefined) {
                this.virtualBox = arr;
            }
            var cells = this.virtualBox,
                elements = require('./elements'),
                place = elements.innerPlace;

            if (!place.hasAttribute('style')) {
                place.setAttribute('style', 'width: ' + (34 * cells.length) + 'px;');

                for (var i = 0; i < cells.length; ++i) {
                    for (var j = 0; j < cells[i].length; ++j) {
                        var cell = document.createElement('div');

                        cell.setAttribute('id', i + '_' + j);
                        cell.classList.add('cell');

                        place.appendChild(cell);
                    }
                }

                elements.gamePlace.appendChild(place);
                updateCellTypes();
            } else {
                updateCellTypes();
            }

            function updateCellTypes() {
                for (var i = 0; i < cells.length; ++i) {
                    for (var j = 0; j < cells[i].length; ++j) {
                        var cellType = cells[i][j].type,
                            vCell = elements.getCellById(i, j);

                        if (!(vCell.classList[0] === undefined)) {
                            vCell.classList.remove(vCell.classList[1]);
                        }
                        vCell.classList.add('item-' + cellType);
                    }
                }
            }
        }
    }
});