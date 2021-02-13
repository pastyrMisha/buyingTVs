<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    // От кого письмо
    $mail->setFrom('support@skuptv.ru', 'Скупка TV');
    // Кому отправить
    $mail->addAddress('skupka-tv@mail.ru');
    $mail->addAddress('skkonkurent@yandex.ru');
    // Тема письма
    $mail->Subject = 'Заявка на узнать цену ТВ с сайта Скупка TV';

    // Тело письма
    $body = '<h1>Заявка на узнать цену ТВ</h1>';

    if(trim(!empty($_POST['footname']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['footname'].'</p>';
    }
    if(trim(!empty($_POST['foottel']))){
        $body.='<p><strong>Телефон клиента:</strong> '.$_POST['foottel'].'</p>';
    }
    $mail->Body = $body;

    // Отправляем
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Ваша заявка принята!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>