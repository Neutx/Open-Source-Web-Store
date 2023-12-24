<?php
if (isset($_POST['submit'])) {
	//-----------------------------------------------------
	//-----------change address to xxx@yourdomainname ----------------------
	$address= "contact@naiknikunj.me";
	//-----------------------------------------------------
	//-----------------------------------------------------

	$name = $_REQUEST["cm-name"];
	$email = $_REQUEST["cm-email"];
	$subject = "Mail subject...";
	$message_content = strip_tags($_REQUEST["comments"]);

	$headers = "From: $name <$email>\r\n";
	$headers .= "Reply-To: $subject <$email>\r\n";

	$message = "--$mime_boundary \r\n";
	
	$message .= "You have an email from your web site: \r\n";
	$message .= "Name: $name \r\n";
	$message .= "Email: $email \r\n";
	$message .= "Subject: $subject \r\n";
	$message .= "Message: $message_content \r\n";

	$message .= "--$mime_boundary--\r\n";
	$mail_sent = mail($address, $subject, $message, $headers);
	if($mail_sent)
	{	
		echo "<script>alert('Success, mail sent!');history.go(-1);</script>";
	}
	else
	{
		echo "<script>alert('Mail failed');history.go(-1)</script>";
	}
}
?>