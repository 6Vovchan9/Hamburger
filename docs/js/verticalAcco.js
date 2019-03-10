const buttons = document.querySelectorAll('.team-acco__item');

for (const button of buttons) {


    button.addEventListener('click', function (event) { //аргумент функции может называться как угодно хоть "event" хоть "hello"
        
        console.log (event.currentTarget);
        const curbutton = event.currentTarget;
        //currentTarget необходим для того чтобы обратиться именно к тому item на который кликнули
        const content = curbutton.querySelector('.team-acco__content'); //Пишем так а не document.querySelector потому что .team-acco__content ищем именно в том item на который нажали а не во всем document!
        const text = curbutton.querySelector('.team-acco__text');
        console.log(text);
        // const reqHeight = getComputedStyle(text).height; ниже 3 способа получения высоты элемента
        // const reqHeight = text.clientHeight;
        const reqHeight = text.getBoundingClientRect().height;
        console.log(reqHeight);
        
        // curbutton.classList.add ('team-acco__item--active');

        if (curbutton.classList.contains("team-acco__item--active")) {
            //contains переводится как: текущий элемент содержит в себе такой класс
            curbutton.classList.remove ('team-acco__item--active');
            //при помощи remove мы удаляем класс в скобках
            content.style.height = 0;
        }
        else {
            //сначала закрываем все открытые item (см. функцию)
            closeItems(buttons);
            //потом открываем то что хотим
            curbutton.classList.add ('team-acco__item--active');
            const windowSize = document.documentElement.clientWidth;
            console.log (windowSize);
            if (windowSize>768) {
                if (reqHeight<100) {
                    content.style.height = "100px"; //100px это высота фотки
                }
                else {
                    content.style.height = `${reqHeight}px`;
                }
            } else {
                content.style.height = `${reqHeight+100}px`;
            }
            // if (reqHeight<100) {
            // content.style.height = "100px";
            // }
            // else {
            //     content.style.height = `${reqHeight}px`;
            // }
        }

        // console.log (event.currentTarget); вернет тот элемент для которого обработчик и предназначается т.е button (.team-acco__trigger)
        // console.log (event.target); target вернет фактический элемент на котором было произведено событие т.е span
    })
}
function closeItems(buttons) {
    Array.from(buttons).forEach(function (elem) {
        elem.classList.remove ('team-acco__item--active');
        elem.querySelector('.team-acco__content').style.height = 0;
    });
}