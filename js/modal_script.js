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



const maxi = document.querySelectorAll('.maximazed');
const callForm = document.getElementById('callForm');
const closePopup = document.getElementById('closepopup');

maxi.forEach(element => element.addEventListener("click", function (evt) {
    evt.preventDefault();
    callForm.classList.remove("_hide");
    callForm.classList.add("_show");
}));


closePopup.addEventListener("click", function (evt) {
    evt.preventDefault();
    callForm.classList.remove("_show");
    callForm.classList.add("_hide");
});