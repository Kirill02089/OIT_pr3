define(function (require) {
    var drawer = require('./drawer'),
        controls = require('./controls'),
        game = require('./game'),
        logService = require('./log.service');

    controls.bindEvents();
    logService.updateRating();
});