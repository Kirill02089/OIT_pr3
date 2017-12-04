define(function () {
    return {
        Cell: function (id, type) {
            return {
                index: id,
                type: type,
                isActive: false,
                parseIndex: function () {
                    return this.index.split(':');
                }
            }
        },
        Place: function () {
            var place = document.createElement('div');
            place.classList.add('place');

            return place;
        }
    }
});