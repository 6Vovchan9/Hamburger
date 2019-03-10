const reviewsBtn = document.querySelectorAll('#reviewsBtn');
const template = document.querySelector ('#reviews-modal').innerHTML;

for (const reviewsBtns of reviewsBtn) {
    reviewsBtns.addEventListener  ('click', function (params) {

        // получаем доступ в контейнер в котором хранится весь контент отзыва на который нажали. Затем извлекаем из этого контейнера имя отзыва и его текст:
        const reviewsItemHover = params.currentTarget.parentElement.parentNode; // для определения родителя можно использовать  parentElement или parentNode, нет никакой разницы
        // const reviewsContent = reviewsItemHover.innerHTML;
        const reviewsItemTitle = reviewsItemHover.firstElementChild;
        const reviewsItemText = reviewsItemHover.querySelector ('.reviews__text');

        // создаем div кладем даем ему класс кладем в него шаблон модалки и все это закидываем в wrapper__content
        const wrapperContent = document.querySelector ('.wrapper'); //раньше тут было '.wrapper__content'
        const container = document.createElement ('div');
        container.className = 'popup';
        container.innerHTML = template;
        wrapperContent.appendChild (container);

        // Клонируем тот отзыв и его заголовок на который нажали в новые переменные и закидываем в выше созданный div а именно в popup__content иначе если бы 
        // мы appendChild те элементы которые взяли со страницы то они бы удалились со страницы а так мы их только копируем
        const containerContent = container.querySelector ('.popup__content');
        const reviewsItemTitleClone = reviewsItemTitle.cloneNode(true);
        const reviewsItemTextClone = reviewsItemText.cloneNode(true);

        // containerContent.innerHTML = reviewsContent;
        containerContent.appendChild (reviewsItemTitleClone);
        containerContent.appendChild (reviewsItemTextClone);

        // навешиваем на все тот же div классы "opened" и "popup--reviews"
        container.classList.add ('popup--reviews');
        container.classList.add ('opened');

        // запрещаем скролл
        document.body.style.overflow = 'hidden';

        // навешиваем обработчик на кнопку close и при закрытии возвращаем контент отзыва обратно на страницу
        const closeBtn = container.querySelector ('.popup__close');
        closeBtn.addEventListener ('click', function () {
            wrapperContent.removeChild (container);
            document.body.style.overflow = '';

            //Ниже мы пытались вернуть контент на страницу при закрытии модалки потому что сначала мы делали appendChild а не клонировали
            // reviewsItemHover.appendChild (reviewsItemTitle); appendChild добавляет в конец
            // reviewsItemHover.insertBefore (reviewsItemTitle, reviewsItemHover.firstChild); //insertBefore добавляет первый элемент в скобках перед вторым элементом в скобках
            // reviewsItemHover.insertBefore (reviewsItemText, reviewsItemTitle.nextSibling); // добавляет после конкретного элемента
            
        })

    })

    

}