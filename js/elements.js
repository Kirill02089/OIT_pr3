define(function (require) {
    return {
        Cell: function (id, type) {
            return {
                index: id,
                type: type,
                isActive: false,
                isBroken: false,
                parseIndex: function () {
                    return this.index.split('_');
                }
            }
        },
        innerPlace: document.querySelector('#game > .place'),
        gamePlace: document.querySelector('#game'),
        scorePlace: document.querySelector('#score'),
        ratingPlace: document.querySelector('#rating .list'),
        timerPlace: document.querySelector('#timer'),
        playButton: document.querySelector('#play'),
        user: function () {
          return document.querySelector('#userName').value;
        },
        getCellById: function (i, j) {
            var selector = '[id=' + '"' + i + '_' + j + '"' + ']';
            if (typeof i === 'string' && j === undefined) {
                selector = '[id=' + '"' + i + '"' + ']';
            }
            return this.innerPlace.querySelector(selector)
        },
        getCellByIdFromArr: function (id) {
            var arr = require('./drawer').virtualBox,
                result = '';
            
            arr.forEach(function (row) {
                row.forEach(function (item) {
                    if (item.index === id) {
                        result = item;
                    }
                })
            });

            return result === '' ? false : result;
        }
    }
});