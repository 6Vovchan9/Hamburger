const accordElement = document.querySelector('#menu');

createAccord(accordElement);

function createAccord(element) {
    const headers = element.querySelectorAll('.menu-acco__trigger');

    
    // console.log (headers);//Выведет в консоль NodeList (типо массив из элементов)
    // console.log (headers[1]);//Выведет в консоль DOM элемент
    // console.dir (headers[1]);//Выведет в консоль объект со свойствами элемента!!! Это очень важная ф-я!
    // console.dir (headers[1].innerText);//выдаст то же что ниже 
    // console.log (headers[1].innerText);//выдаст то же что выше

    let activeContent;

    for (let i = 0; i < headers.length; i++) {
        const header = headers[i];
        header.addEventListener('click', function() {
            event.preventDefault();
            if (activeContent) {
                activeContent.classList.remove('menu-acco__item--active');
            }

            activeContent = header.parentElement;
            activeContent.classList.add('menu-acco__item--active');
        });
    }
}

// const accordElement = document.querySelector('#menu');

// createAccord(accordElement);

// function createAccord(element) {
//     let activeContent;

//     element.addEventListener('click', function(event) {
//         event.preventDefault ();
//         if (event.target.classList.contains('menu-acco__trigger-bg')) {
//             const header = event.target;

//             if (activeContent) {
//                 activeContent.classList.remove('menu-acco__item--active');
//             }

//             activeContent = header.parentElement.parentElement;
//             activeContent.classList.add('menu-acco__item--active');
//         }
//     });
// }