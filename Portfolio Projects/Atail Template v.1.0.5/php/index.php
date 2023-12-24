<?php
	require_once( __DIR__ . '/vendor/mail_pack/class-application.php' );
	use Basic\Application;

	$app = new Application();   
	$app->run();