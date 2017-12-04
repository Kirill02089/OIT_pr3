define(function (require) {
    return {
        virtualBox: [],
        draw: function (a, b) {
            var randomFruit = function () {
                return Math.floor((Math.random() * 10) % 4) + 1
            };
            var controls = require('./controls'),
                elements = require('./elements'),
                place = new elements.Place();

            place.setAttribute('style', 'width: ' + (32 * a) + 'px;');

            for (var i = 0; i < a; ++i) {
                var row = [];
                for (var j = 0; j < b; ++j) {
                    var cell = document.createElement('div'),
                        clas = randomFruit();

                    row.push(new elements.Cell(i + ':' + j, clas));
                    cell.setAttribute('id', i + ':' + j);
                    cell.classList.add('cell');
                    cell.classList.add('item-' + clas);
                    place.appendChild(cell);

                    this.virtualBox.push(row);
                }
            }
                console.log(this.virtualBox);

                controls.gamePlace.appendChild(place)
        }
    }
});