const leftBtn = document.querySelector ("#arrow-left");
const rightBtn = document.querySelector ("#arrow-right");
const items = document.querySelector ("#price__items");
//getComputedStyle - глобальная ф-ия кот возвращает объект кот хранит в себе все-все свойства элемента
// const computed = getComputedStyle (items);
// computed.right возвращает свойство right = '100px' чтобы избавиться от 'px' существует глобальная ф-я которая делает из строки число!
// let styleRight = parseInt (computed.right);
const item = document.querySelectorAll (".price__item");
const slider = document.querySelector ("#slider");
const sliderWidth = slider.getBoundingClientRect().width;

//Функция снизу возвращает ширину экрана именно при сжатии или расширении его
// window.addEventListener ('resize', function (params) {
//     const windowSize = document.documentElement.clientWidth;
//     console.log (windowSize);
// });        

Array.from(item).forEach(function (elem) {
    elem.style.width = `${sliderWidth}px`;
});

const step = items.firstElementChild.getBoundingClientRect().width;
const maxRight = (items.children.length - 1)*step;
const minLeft = 0;
let currentRight = 0;

rightBtn.addEventListener ('click', function (event) {
    event.preventDefault();
    
    if (currentRight < maxRight) {
        currentRight = currentRight + step;
        items.style.right = `${currentRight}px`;
    }
    else {
        currentRight = 0;
        items.style.right = 0;
    };
}); 
leftBtn.addEventListener ('click', function (event) {
    event.preventDefault();

    if (currentRight > minLeft) {
        currentRight -= step;
        items.style.right = `${currentRight}px`;
    }
    else {
        currentRight = maxRight;
        items.style.right = `${maxRight}px`;
    };
});