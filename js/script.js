"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add('_sending');

            let response = await fetch('/sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                if (result.message === '1') {
                    form.reset();
                    form.classList.remove('_sending');
                    form.classList.add('_welldone');
                    setTimeout(function () {
                        form.classList.remove('_welldone');
                    }, 2000);
                }
            } else {
                alert('Ошибка, повторите отправку позже!');
                form.classList.remove('_sending');
            }

        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll('._req');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_tel')) {
                if (telTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
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
    // Функция теста телефона
    function telTest(input) {
        return !/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(input.value)
    }

});