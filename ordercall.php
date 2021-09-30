<?php
$name = $_POST['name'];
$textarea = $_POST['textarea'];
$image = $_POST['image'];


$res = 0;
$mails = array('instalabyandex@gmail.com', 'e.zolotaeva@yandex.ru', 'az@qevent.ru');


 // requires php5
define('UPLOAD_DIR', 'images/');
$img = $image;
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = UPLOAD_DIR . uniqid() . '.png';
$success = file_put_contents($file, $data);
//print $success ? $file : 'Unable to save the file.';

foreach($mails as $mail) {
	$from = "=?utf-8?B?".base64_encode($_SERVER['HTTP_HOST'])."=?= <noreply@myways.pro>";
	$headers= "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/html; charset=utf-8\r\n";
	$headers .= "From: $from\r\n";


	$subject = "Заказ с сайта \"".$_SERVER["HTTP_HOST"]."\"";
	$text = "
		Имя: $name<br/>
		Текст: <code>$textarea</code><br/>
		<img src='http://qevent.ru/stikers/$file' alt='' style='width:600px'><br>
		<a href='http://qevent.ru/stikers/$file' download>Сcылка</a><br>";

	if (mail($mail, $subject, $text, $headers)) {
		$res++;
	};
}

if ($res > 0) {
	echo json_encode(array("success"=>true, "text"=>"Спасибо! Твой стикер будет готов через 30 минут. Забрать можно на этом же месте."));
	return;
}
else {
	echo json_encode(array("success"=>false, "text"=>"При отправке заявки произошла ошибка"));
	return;
}

?>