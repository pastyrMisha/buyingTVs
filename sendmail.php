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
    $mail->Subject = 'Заявка на скупку телевизора с сайта Скупка TV';

    // Тело письма
    $body = '<h1>Заявка на покупку ТВ</h1>';

    if(trim(!empty($_POST['model']))){
        $body.='<p><strong>Модель ТВ:</strong> '.$_POST['model'].'</p>';
    }
    if(trim(!empty($_POST['price']))){
        $body.='<p><strong>Желаемая цена:</strong> '.$_POST['price'].'</p>';
    }
    if(trim(!empty($_POST['tel']))){
        $body.='<p><strong>Телефон клиента:</strong> '.$_POST['tel'].'</p>';
    }
    $mail->Body = $body;

    // Отправляем
    if ($mail->send()) {
        $message = '1';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>