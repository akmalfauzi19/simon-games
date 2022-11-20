
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".btn").click(function () {
    if (started) {
        var userChosenColour = $(this).attr('id');

        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length - 1);
    }

});

$(document).keypress(function (e) {
    var btn = e.key || e.which || e.keyCode || 0;

    if (btn && !started) {
        var score = $('#score');
        if (score.length > 0) {
            score.remove();
        }

        var titlelvl = $('#level-title');
        titlelvl.text('Starting ...');
        titlelvl.after('<h1 id="timer">5</h1>');

        var counter = 5;
        var interval = setInterval(function () {
            counter--;
            $('#timer').text(counter);
            // Display 'counter'.
            if (counter == 0) {
                // stop counter
                clearInterval(interval);
                level++
                $('#level-title').text('Level ' + level);
                $('#timer').remove();

                setTimeout(function () {
                    nextSequence();
                    started = true;
                }, 1000)
            }
        }, 1000);
    }
})

function nextSequence() {
    userClickedPattern = [];

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $('.' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(color) {
    var audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log('sukses');

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                level++
                nextSequence();
            }, 1000);
        }
    } else {
        console.log('gagal');

        playSound('wrong');
        $('body').addClass('game-over');

        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200);
        var titlelvl = $('#level-title');
        titlelvl.text("Game Over, Press Any Key to Restart");
        titlelvl.after(`<h1 id="score">Score lavel ${level}</h1>`);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}