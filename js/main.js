define(function (require) {
    var drawer = require('./drawer'),
        controls = require('./controls'),
        game = require('./game');

    drawer.draw(10, 10);

    var newCells = [],
        offsetCells = [];


        controls.bindEvents();

        setTimeout(() => renderAfterOffset(), 1000);

    function renderAfterOffset() {
        newCells = game.removeCells(drawer.virtualBox);
        drawer.render(newCells);
        offsetCells = game.offset(newCells);
        setTimeout(() => drawer.render(offsetCells), 1000);
        newCells = offsetCells;

        if (game.findWinner()) {
            setTimeout(renderAfterOffset, 1500);
        }
    }
});