"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const footerForm = document.getElementById('footer_form');
    footerForm.addEventListener('submit', footerFormSend);

    async function footerFormSend(e) {
        e.preventDefault();
        let error = formValidate(footerForm);

        let formData = new FormData(footerForm);

        if (error === 0) {
            footerForm.classList.add('_footsending');

            let response = await fetch('footer_sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                footerForm.reset();
                footerForm.classList.remove('_footsending');
            } else {
                alert('Ошибка');
                footerForm.classList.remove('_footsending');
            }

        }
    }

    function formValidate(footerForm) {
        let error = 0;
        let formReq = document.querySelectorAll('._footerreq');

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_footertel')) {
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
    // Функция теста телефона
    function telTest(input) {
        return !/^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/.test(input.value)
    }

});