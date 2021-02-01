<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language');
    $mail->IsHTML(true);

    // От кого письмо
    $mail->setForm('info@.kupka.ru', 'Скупка TV');
    // Кому отправить
    $mail->addAddress('konkurent.msg@mail.ru');
    // Тема письма
    $mail->Subject = 'Заявка на скупку телевизора с сайта Скупка TV';

    