<html>
<head>
    <title>Your Site Contact Form</title>
    <meta charset="utf-8"/>
</head>
<body>
<h3>Name: <span
            style="font-weight: normal;"><?php echo ( isset( $name ) && !empty( $name ) )
                ? $name
                : NULL; ?></span></h3>
<h3>Email: <span
            style="font-weight: normal;"><?php echo ( isset( $email ) && !empty( $email ) )
                ? $email
                : NULL; ?></span></h3>
<div>
    <h3 style="margin-bottom: 5px;">Comment:</h3>
    <div><?php echo ( isset( $text ) && !empty( $text ) )
                ? $text
                : NULL; ?></div>
</div>
</body>
</html>