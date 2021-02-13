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
    $mail->Subject = 'Заявка на обратный звонок';

    // Тело письма
    $body = '<h1>Заявка на пепезвонить мне</h1>';

    if(trim(!empty($_POST['modaltel']))){
        $body.='<p><strong>Телефон клиента:</strong> '.$_POST['modaltel'].'</p>';
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