define(function (require) {
    var score = 0,
        scoreHtml = require('./elements').scorePlace.querySelector('.count'),
        time = 75,
        timerHtml = require('./elements').timerPlace.querySelector('.count'),
        timerRef = {},
        getUserName = require('./elements').user,
        ratingPlace = require('./elements').ratingPlace;


    function getRating() {
        var players = JSON.parse(localStorage.getItem('rating')) || [];

        return players.sort(function (a, b) {
            if (a.score > b.score) return -1;
            if (a.score < b.score) return 1;
        });
    }

    return {
        score: 0,
        isGameOver: function () {
            return !time;
        },
        gameOver: function () {
          this.stopTimer();
          this.store();
          require('./controls').render2();
        },
        updateScore: function (value) {
            score += value;
            scoreHtml.textContent = score;
        },
        startTimer: function () {
            var self = this;

            timerRef = setInterval(timer, 1000);

            function timer() {
                --time;
                timerHtml.textContent = time + 's';

                if (!time) {
                    self.gameOver();
                }
            }
        },
        stopTimer: function () {
            clearInterval(timerRef);
        },
        store: function () {
            var rating = getRating(),
                userName = getUserName();

            rating.push({
                name: userName,
                score: score
            });

            localStorage.setItem('rating', JSON.stringify(rating));

            this.updateRating();
        },
        updateRating: function () {
            var rating = getRating();

            ratingPlace.innerHTML = '';
            rating.forEach(function (user) {
                var item = document.createElement('tr');

                item.appendChild(getP(user.name || 'Anonymous'));
                item.appendChild(getP(user.score));
                ratingPlace.appendChild(item);
            });

            function getP(text) {
                var p = document.createElement('td');

                p.textContent = text;
                return p;
            }
        }
    }
});