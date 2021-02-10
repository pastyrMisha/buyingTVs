"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const modalForm = document.getElementById('modal__form');
    modalForm.addEventListener('submit', modalFormSend);

    async function modalFormSend(e) {
        e.preventDefault();
        let error = formValidate(modalForm);

        let formData = new FormData(modalForm);

        if (error === 0) {
            modalForm.classList.add('_modalsending');

            let response = await fetch('modal_sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                modalForm.reset();
                modalForm.classList.remove('_modalsending');
            } else {
                alert('Ошибка');
                modalForm.classList.remove('_modalsending');
            }

        } else {
            alert('Заполните обязательные поля');
        }
    }

    function formValidate(modalForm) {
        let error = 0;
        let formReq = document.querySelectorAll('._modalreq');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_modaltel')) {
                if (telTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            }

        }
        return error;
    }



    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    }
    // phone test function
    function telTest(input) {
        return !/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(input.value)
    }
    
});









// const maxi = document.querySelectorAll('.maximazed');

// maxi.forEach(element => element.addEventListener("click", function (evt) {
// evt.preventDefault();
// const callForm = document.getElementById('callForm');

// callForm.body.insertAdjacentHTML("beforeend", '<div id="overlay"></div><div id="modal"><form action="#" id="modal__form" class="modal__form"><h4 class="modal__form-title">Заказать звонок</h4><div class="modal__form-input"><input type="text" name="modaltel" class="_modalreq _modaltel" placeholder="Ваш телефон*" /></div><div class="modal__form-button"><button type="submit" class="botton__submit">ПЕРЕЗВОНИТЬ МНЕ</button></div></form><div id="closepopup" class="modal__popup"><i></i></div></div>');

// const newBlock = document.getElementById('modal');
// const newLay = document.getElementById('overlay');
// fadeIn(newLay, 300);
// fadeIn(newBlock, 300);
// const closePopup = document.getElementById('closepopup');

// closePopup.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     fadeOut(newLay, 900);
// fadeOut(newBlock, 900);
//     document.body.removeChild(newBlock);
//     document.body.removeChild(newLay);
// });

// newLay.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     fadeOut(newLay, 900);
// fadeOut(newBlock, 900);
//     document.body.removeChild(newBlock);
//     document.body.removeChild(newLay);
// });


// }));
