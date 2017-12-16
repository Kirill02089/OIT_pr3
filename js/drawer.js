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

            var arr = [
                [elements.Cell('0_0', 1),elements.Cell('0_1', 2), elements.Cell('0_2', 1), elements.Cell('0_3', 2), elements.Cell('0_4', 2)],
                [elements.Cell('1_0', 3),elements.Cell('1_1', 2), elements.Cell('1_2', 1), elements.Cell('1_3', 2), elements.Cell('1_4', 2)],
                [elements.Cell('2_0', 2),elements.Cell('2_1', 1), elements.Cell('2_2', 1), elements.Cell('2_3', 1), elements.Cell('2_4', 2)],
                [elements.Cell('3_0', 1),elements.Cell('3_1', 3), elements.Cell('3_2', 3), elements.Cell('3_3', 3), elements.Cell('3_4', 3)],
                [elements.Cell('4_0', 1),elements.Cell('4_1', 1), elements.Cell('4_2', 1), elements.Cell('4_3', 3), elements.Cell('4_4', 2)]
            ];
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
                        vCell.setAttribute('id', cells[i][j].index)
                    }
                }
            }
        }
    }
});