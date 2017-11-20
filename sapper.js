var playButton = document.getElementById('play'),
    bombsInput = document.getElementById('bombs'),
    gameSizeInput = document.getElementById('gameSize'),
    sapper = document.getElementById('sapper'),
    gameInfo = {
        bombsNumber: document.querySelector('#bombsNumber > .count'),
        flagNumber: document.querySelector('#flagNumber > .count'),
        timer: document.querySelector('#timer > .count')
    },
    gamePlace = '',
    time = 0,
    timer,
    flagCount = 0;

var states = {
    flag: 'flag',
    bomb: 'bomb',
    active: 'active',
    gameOver: 'gameOver'
};

updateFlagNumber(flagCount);
gameInfo.bombsNumber.textContent = 0;

bombsInput.onkeyup = function () {
    checkValue()
};

gameSizeInput.onkeyup = function () {
    checkValue();
};

function checkValue() {
    var bombs = +bombsInput.value,
        size = +gameSizeInput.value;

    if ((!isNaN(bombs) && !isNaN(size)) && (bombs > size * size)) {
        playButton.setAttribute('disabled', '')
    } else {
        playButton.removeAttribute('disabled')
    }
}

function clearSupper() {
    if (!(gamePlace === '')) {
        sapper.removeChild(sapper.children[0]);
    }
}

playButton.addEventListener('click', function (e) {
    e.preventDefault();

    var bombs = +bombsInput.value,
        gameSize = +gameSizeInput.value;

    clearSupper();
    gameInfo.bombsNumber.textContent = bombs;
    updateTimer(0);
    Play(bombs, gameSize);
});

function Play(bombs, size) {
    var bombsCord = GenerateBombs(bombs, size);
    DrawGamePlace(size, bombsCord);

    timer = setInterval(Timer, 1000);
}

function GenerateBombs(bombsNumber, size) {
    bombs = [];
    bombs.__proto__.containCord = function (obj) {
        var arr = this,
            contain = false;

        arr.forEach(function (t) {
            if ((t.x === obj.x) && (t.y === obj.y)) {
                contain = true;
                return;
            }
        });

        return contain;
    };

    for (var i = 0; i < bombsNumber;) {
        var cords = RandomCords(size - 1);

        if (!bombs.containCord(cords)) {
            bombs.push(cords);
            ++i;
        }
    }

    return bombs;
}

function RandomCords(max) {
    return {
        x: Math.round(Math.random() * max),
        y: Math.round(Math.random() * max)
    }
}

function DrawGamePlace(size, bombs) {
    var sapper = document.getElementById('sapper'),
        mainDiv = document.createElement('div');

    mainDiv.classList.add('place');
    mainDiv.setAttribute('style', 'width:' + (32 * size) + 'px;');
    SapperEvents(mainDiv);

    for (var i = 0; i < size * size; ++i) {
        mainDiv.appendChild(Cell(i));
    }

    for (var j = 0; j < bombs.length; ++j) {
        var bombId = bombs[j].x * size + bombs[j].y;
        mainDiv.children[bombId].classList.add(states.bomb)
    }

    sapper.appendChild(mainDiv);
    gamePlace = mainDiv;
}

function Cell(i) {
    var cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('id', i);
    return cell;
}

function SapperEvents(div) {
    div.addEventListener('click', function (e) {
        var targetClassList = e.target.classList;

        if (!targetClassList.contains(states.bomb)) {
            targetClassList.add(states.active);
            targetClassList.remove(states.flag);
        } else {
            GameOver();
        }

    });

    div.addEventListener('contextmenu', function (e) {
        var targetClassList = e.target.classList;

        if (e.target.parentNode.classList.contains(states.gameOver)) {
            e.preventDefault();
            return;
        }

        if (targetClassList.contains(states.flag) || targetClassList.contains(states.active)) {
            targetClassList.remove(states.flag);
            gameInfo.flagNumber.textContent == 0 ? 0 : --gameInfo.flagNumber.textContent;
        } else {
            targetClassList.add(states.flag);
            ++gameInfo.flagNumber.textContent;
        }

        e.preventDefault();
    });
}

function GameOver() {
    var cells = gamePlace.children;

    if (gamePlace === '') {
        gamePlace.classList.add('gameOver');
    }

    for (var i = 0; i < cells.length; ++i) {
        var cellClass = cells[i].classList;

        if (!cellClass.contains(states.bomb)) {
            cellClass.add(states.active);
        } else {
            cellClass.remove(states.flag);
            cellClass.add(states.bomb);
            cellClass.add(states.active);
        }
    }

    gameInfo.flagNumber.textContent = 0;
    ClearTimer();
}

function ClearTimer() {
    time = 0;
    clearInterval(timer);
}

function Timer() {
    ++time;
    updateTimer(time);
}

function updateTimer(timeCount) {
    gameInfo.timer.textContent = timeCount + 's';
}

function updateFlagNumber(count) {
    gameInfo.flagNumber.textContent = count;
}