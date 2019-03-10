const sections = $('.section');
const display = $('.wrapper__content');

let inscroll = false;

// две строчки ниже работают благодаря библиотеки jQuery mobile-detect. Переменная isMobile вернет модель телефона на котором открываем наш сайт, если же мы будем открывать
// на ноуте то это переменная вернет null
const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();
// console.log(isMobile);

function switchActiveClassInSideMenu (menuItemIndex) {
    $('.pagination__item').eq(menuItemIndex).addClass('pagination__item--active').siblings ().removeClass ('pagination__item--active');
}

function performTransition (sectionEq) {

    if (inscroll) return // если inscroll = true то делаем return и выполнение функции прекращаем а если нет то идем вниз

    const sectionEqNum = parseInt (sectionEq);

    if (!!sectionEqNum == false) {
        console.error ('Не верное значение для аргумента sectionEq!')
    }

    inscroll = true;

    const position = sectionEq * -100 + '%';
    sections.eq(sectionEq).addClass('active').siblings().removeClass('active'); //siblings это у англичан родные братья и сестры. В данном случае это типо соседи
    display.css ({
        'transform' : `translateY(${position})`

    });
    setTimeout ( function (params) {
        inscroll = false;
        switchActiveClassInSideMenu (sectionEqNum);
    }, 1000 + 300); // 1000-продолжительность транзишина, 300-примерное время необходимое для завершения инерции тачустройства (величина инерции зависит от скорость
    //взмаха и эта инерция продолжается примерно 300 мс), в отличии от одного проворота колесика мыши
    // в этом случае инерции нет переменная deltaY (отдающая величину перемещения курсора мыши) будет равна одному значению при каждом повороте.
}

function scrollToSection (direction) {
    const activeSection = sections.filter('.active');
    const nextSection = activeSection.next(); //next выбирает нижний соседний элемент
    const prevSection = activeSection.prev();


    if (direction == 'next' && nextSection.hasClass('section') && !$('.popup').hasClass('opened')) {  
        performTransition (nextSection.index());
    };
    if (direction == 'prev' && prevSection.length && !$('.popup').hasClass('opened')) {// prevtSection.length таким образом мы запрещаем скрол выше первой секции. Делаем это за счет того что
        // jQuery всегда возвращает объект и когда мы находимся на первой секции (приходим к последней секции) то у объекта с соседним сверху элементом которого не существует будет длина 0 потому
        // что он будет пустой так как этого эемента не существует так например length у объекта записанного под константой sections равна 8!
        performTransition (prevSection.index());
    };
}

$('.wrapper').on ('wheel', function (e) {
    // Событие сверху это событие скролла
    // в обьекте который отдаст jQuery будут доступны не все данные события wheel, для доступа ко всем данным которые мы бы получили при
    // при addEventListener надо добавить e.originalEvent. Из этого объекта нам интересно свойство deltaY которое отдаст значение изменения положения курсора мыши
    // т.е когда мы скроллим к след секции курсор мыши смещается относительно окна wrapper в положительном направлении а когда скроллим к предыдущей секции в отрицательное напрвление
    // console.log (e.originalEvent.deltaY);
    
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollToSection ('next');
    }

    if (deltaY < 0) {
        scrollToSection ('prev');
    }

})

$('.wrapper').on('touchmove', function (e) { //эта штука нужна для того чтобы убрать какие то полоски при скролле на мобиле.
    e.preventDefault ();
})

$(document).on('keydown', function (params) {
    if (params.keyCode == 38) {
        scrollToSection ('prev');
        
    };
    if (params.keyCode == 40) {
        scrollToSection ('next');
        
    };
    //Можно было так написать:
    // switch (params.keyCode) {
    //     case 38:
    //         scrollToSection ('prev');
    //         break;
     
    //     case 40:
    //         scrollToSection ('next');
    //         break;
    // }
})

$("[data-scroll-to]").on ('click', function (params) {
    params.preventDefault ();
    
    const target = $(params.currentTarget).attr("data-scroll-to");

    performTransition (target);
})

if (isMobile) {
    $(window).swipe ({
        swipe: function (event, direction) {
            const nextOrPrev = direction == 'up' ? 'next' : 'prev'; // это читается как если дирекшен равен up то переменной передастся  next а если нет то prev
            
            // alert(direction);
            scrollToSection (nextOrPrev);
        }
    });
};