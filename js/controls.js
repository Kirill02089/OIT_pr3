define(function (require) {
    return {
        bindEvents: function () {
            var elements = require('./elements'),
                target = '',
                self = this,
                cell;

            animations = {
                'active': 'active',
                'disable': 'disable'
            };

            elements.innerPlace.addEventListener('click', function (event) {
                target = event.target;
                cell = elements.getCellByIdFromArr(target.getAttribute('id'));

                if (!cell) {
                    return;
                }

                cell.isActive = !cell.isActive;
                if (cell.isActive) {
                    self.classToDo(target, animations.active, true);
                    if (cell.index !== elements.activeCell) {
                        self.classToDo(elements.getCellById(elements.activeCell), animations.active, false);
                    }
                } else {
                    target.classList.remove(animations.active);
                }

                elements.activeCell = cell.index;
            })
        },
        classToDo: function (elem, elemClass, action) {
            if (elem === null) {
                return
            }
            if (action) {
                elem.classList.add(elemClass);
            } else {
                elem.classList.remove(elemClass);
            }
        }
    }
});