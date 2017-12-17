define(function (require) {
    var controls = require('./controls'),
        logService = require('./log.service');

    controls.bindEvents();
    logService.updateRating();
});