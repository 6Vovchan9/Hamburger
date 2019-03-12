const myForm = document.querySelector ('.form');
const send = document.querySelector ('#send');

send.addEventListener ('click', function (event) {
    event.preventDefault ();
    if (validateForm(myForm)) {

        let formData = new FormData();
        formData.append ("name", myForm.elements.name.value);
        formData.append ("phone", myForm.elements.phone.value);
        formData.append ("comment", myForm.elements.comment.value);
        formData.append ("to", "695amr@mail.ru");

        let url = "https://webdev-api.loftschool.com/sendmail"

        const xhr = new XMLHttpRequest ();
        xhr.responseType = 'json';
        xhr.open ('POST', url);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.send (formData);

        xhr.addEventListener ('load', function () {
            const template = document.querySelector ('#reviews-modal').innerHTML;
            const wrapperContent = document.querySelector ('.wrapper');
            const container = document.createElement ('div');
            container.className = 'popup';
            container.innerHTML = template;
            wrapperContent.appendChild (container);
            
            // const container  = createElem();

            container.classList.add ('popup--reviews');
            container.classList.add ('opened');
            const popupText = container.querySelector ('.popup__text');
            popupText.textContent = `${xhr.response.message}`;
            document.body.style.overflow = 'hidden';

            const closeBtn = container.querySelector ('.popup__close');
            closeBtn.addEventListener ('click', function () {
                wrapperContent.removeChild (container);
                document.body.style.overflow = '';
            })
        })
    }
})

function createElem () {
    const template = document.querySelector ('#reviews-modal').innerHTML;
    const wrapperContent = document.querySelector ('.wrapper__content')
    const container = document.createElement ('div');
    container.className = 'popup';
    container.innerHTML = template;
    wrapperContent.appendChild (container);
    return container
};

function validateForm (form) {
    let valid = true;

    if (!validateField (form.elements.name)) {
        valid = false;
    }
    if (!validateField (form.elements.phone)) {
        valid = false;
    }
    if (!validateField (form.elements.comment)) {
        valid = false;
    }
    return valid;
}

function validateField (field) {
    if (!field.checkValidity()) {
        field.nextElementSibling.textContent = field.validationMessage;
        return false;
    } else {
        field.nextElementSibling.textContent = '';
        return true;
    }
}