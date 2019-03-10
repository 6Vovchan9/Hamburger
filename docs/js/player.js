let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '370',
        width: '660',
        videoId: 'zmg_jOwa9Fc',
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0, //показывать ли похожие видео
            autoplay: 0, //отключить автовоспроизведение
            modestbranding: 0
        },
        events: {
            'onReady': onPlayerReady, // выполним функцию onPlayerReady когда плеер загрузится
            'onStateChange': onPlayerStateChange // в ютубе есть возможность отслеживать изменения состояния плеера. Изменнеие этого состояния отображается в функции onPlayerStateChange
        }
    });
}

$('.player__playback').on('click', function (e) {
    const bar = $(e.currentTarget);
    const newButtonposition = e.originalEvent.layerX;
    const clickedPercent = (newButtonposition/bar.width()) * 100; //определили кол-во процентов положения клика относительно всей длинны
    //console.log (e.originalEvent.layerX); originalEvent используем вместо Event потому что работаем с jQuery. layerX возвращает положение курсора относительно элемента в котором происходит событие-клик

    const newPlayerTime = (player.getDuration() / 100) * clickedPercent;
    player.seekTo(newPlayerTime);// seekToэта функция перематывает проигрыватель к тому времени которое указано в скобках в секундах
});

$('.player__splash').on ('click', function (params) {
    player.playVideo();
})

function onPlayerReady (event) {
    let interval
    const durationTime = player.getDuration(); //объявим эту переменную тут а не в функции interval где будет применяться эта переменная.
    // Делаем это для того чтобы каждую секунду не объявлять это значение
    clearInterval (interval);

    updateTimerDisplay()

    interval = setInterval(() => {
        // строчками ниже мы каждую секунду высчитываем процент прошедшего видео относительно полной продолжительности видео. И на этот процент перемещаем ползунок при помощи left относительно все линии
        const completedTime = player.getCurrentTime ();
        const percent = (completedTime / durationTime) * 100;
        $('.player__playback-button').css({
            left:`${percent}%`
        });
        // строчкой ниже мы каждую секунду вызываем функцию которая присваивает в наши span-ы теукщее и общее время продолжительности видео
        updateTimerDisplay();
    }, 1000);
};

function onPlayerStateChange (event) {
    const btn = $('.player__play');
    const playerWrapper = $(".player__wrapper");

    switch (event.data) { //  в дата содержится состояние плеера... Запущен, остановлен и тд
        case 1: //когда плеер воспроизводится
            btn.addClass('paused');
            playerWrapper.addClass('hidden');
            break;
        case 2: //когда плеер на паузе
            btn.removeClass('paused');
            playerWrapper.removeClass('hidden');
            break;
        case 0:
            btn.removeClass('paused');
            playerWrapper.removeClass('hidden');
            break;
    }
}

function updateTimerDisplay () {
    $('.player__duration-estimate').text(formatTime(player.getDuration()));//getDuration вернет общее время продолжительности видео в секундах
    $('.player__duration-completed').text(formatTime(player.getCurrentTime()));//getCurrentTime вернет текущее время продолжительности видео в секундах
}

$('.player__play').on('click', function (params) {
    // теперь для того чтобы остановить видео надо сначала узнать проигрывается ли сейчас плеер. Надо смотреть статус воспроизведения обычно его хранят в events.
    // В ютубе это состояние проигрывателя передает метод ниже который возвращает число, где 0 - ended, 1 - played, 2 - paused ...
    const playerState = player.getPlayerState ();

    if (playerState != 1) {
        player.playVideo();
    } else {
        player.pauseVideo();
    };
});

// теперь короче будем работать над временем. Функция возвращающая значение времени, прошедшего с начала воспроизведения видео
// функция приводящая время к формату 0:00: 
function formatTime(time) {
    const roundTime = Math.round (time); //round является статическим методом объекта Math. Все это возращает число, округленное к ближайшему целому
    const minutes = Math.floor(roundTime / 60); //Math.floor возвращает наибольшее целое число, которое меньше или равно числу с скобках
    const seconds = roundTime - minutes * 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${minutes}:${formattedSeconds}`;
}



