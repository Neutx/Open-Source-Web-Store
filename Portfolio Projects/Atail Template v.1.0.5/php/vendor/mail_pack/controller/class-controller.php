<?php
	namespace Controllers
	{
		require_once( __DIR__ . '/../../autoload.php' );
		require_once( __DIR__ . '/../data-providers/class-fileprovider.php' );
		require_once( __DIR__ . '/../data-providers/class-mailchimpprovider.php' );
		use Exception;
		use PHPMailer;
		use Provider\FileProvider as FileProvider;
		use Provider\MailChimpProvider as MailchimpProvider;
		
		class Controller {
			private $errors          = [ ];
			private $conigFileDir    = __DIR__ . '/../config/config.php';
			private $configContact   = NULL;
			private $configSubscribe = NULL;
			
			/**
			 *  Render view for message
			 *
			 * @param $view
			 *
			 * @return string
			 */
			private function render( $view, $data ) {
				if ( isset( $data ) && is_array( $data ) ) {
					extract( $data );
				}
				$view = trim( htmlspecialchars( $view ) );
				try {
					if ( is_file( __DIR__ . '/../views/' . $view . '.php' ) ) {
						ob_start();
						include( __DIR__ . '/../views/' . $view . '.php' );
						
						return ob_get_clean();
					} else {
						throw new Exception( 'View File not found' );
					}
				}
				catch ( Exception $ex ) {
					die( $ex->getMessage() );
				}
			}
			
			/**
			 * Controller constructor.
			 */
			public function __construct() {
				try {
					if ( is_file( $this->conigFileDir ) ) {
						$config                = require_once( $this->conigFileDir );
						$this->configContact   = ( isset( $config[ 'contact' ] ) )
							? (object) $config[ 'contact' ]
							: NULL;
						$this->configSubscribe = ( isset( $config[ 'subscribe' ] ) )
							? (object) $config[ 'subscribe' ]
							: NULL;
						if ( !$this->configContact || !$this->configSubscribe ) {
							throw new Exception( 'Undefined config "Contact" or "Subscribe"' );
						}
					} else {
						throw new Exception( 'Can not find config file' );
					}
					
				}
				catch ( Exception $ex ) {
					die( $ex->getMessage() );
				}
			}
			
			/**
			 * This method returns array of errors or false, if no errors
			 *
			 * @return array|bool
			 */
			public function get_errors() {
				return ( isset( $this->errors ) && !empty( $this->errors ) )
					? $this->errors
					: FALSE;
			}
			
			/**
			 *  Send contact email (Action)
			 *
			 * @return bool
			 */
			public function contact() {
				// recive & validation
				$text  = $name = $email = NULL;
				$name  = ( isset( $_POST[ 'name' ] ) && !empty( $_POST[ 'name' ] ) && is_string( $_POST[ 'name' ] ) && !preg_match( '/(<|>|\\\|\/|\d)/i', filter_var( $_POST[ 'name' ] ) ) )
					? $_POST[ 'name' ]
					: NULL;
				$email = ( isset( $_POST[ 'email' ] ) && !empty( $_POST[ 'email' ] ) && is_string( $_POST[ 'email' ] ) && preg_match( '//i', $_POST[ 'email' ] ) )
					? trim( filter_var( $_POST[ 'email' ], FILTER_VALIDATE_EMAIL ) )
					: NULL;
				$text  = ( isset( $_POST[ 'text' ] ) && !empty( $_POST[ 'text' ] ) && is_string( $_POST[ 'text' ] ) && !preg_match( '/(<|>|\\\|\/|\d)/i', filter_var( $_POST[ 'text' ] ) ) )
					? filter_var( $_POST[ 'text' ] )
					: NULL;
				// set errors
				if ( !isset( $name ) || empty( $name ) || is_null( $name ) ) {
					$this->errors[ 'fields' ]             = ( isset( $this->errors[ 'fields' ] ) )
						? $this->errors[ 'fields' ]
						: [ ];
					$this->errors[ 'fields' ][ 'name' ]   = ( isset( $this->errors[ 'fields' ][ 'name' ] ) )
						? $this->errors[ 'fields' ][ 'name' ]
						: [ ];
					$this->errors[ 'fields' ][ 'name' ][] = 'Name is not valid';
				}
				if ( !isset( $email ) || empty( $email ) || is_null( $email ) ) {
					$this->errors[ 'fields' ]              = ( isset( $this->errors[ 'fields' ] ) )
						? $this->errors[ 'fields' ]
						: [ ];
					$this->errors[ 'fields' ][ 'email' ]   = ( isset( $this->errors[ 'fields' ][ 'email' ] ) )
						? $this->errors[ 'fields' ][ 'email' ]
						: [ ];
					$this->errors[ 'fields' ][ 'email' ][] = 'Email is not valid';
				}
				if ( !isset( $text ) || empty( $text ) || is_null( $text ) ) {
					$this->errors[ 'fields' ]             = ( isset( $this->errors[ 'fields' ] ) )
						? $this->errors[ 'fields' ]
						: [ ];
					$this->errors[ 'fields' ][ 'text' ]   = ( isset( $this->errors[ 'fields' ][ 'text' ] ) )
						? $this->errors[ 'fields' ][ 'text' ]
						: [ ];
					$this->errors[ 'fields' ][ 'text' ][] = 'Text is not valid';
				}
				// If success validation
				if ( empty( $this->get_errors() ) ) {
					try {
						$mailer = new PHPMailer();
						$mailer->isSMTP();
						$mailer->Host       = $this->configContact->SmtpHost;
						$mailer->SMTPAuth   = TRUE;
						$mailer->Username   = $this->configContact->SmtpUser;
						$mailer->Password   = $this->configContact->SmtpPass;
						$mailer->SMTPSecure = $this->configContact->SmtpSecure;
						$mailer->Port       = $this->configContact->SmtpPort;
						$mailer->setFrom( $email );
						$mailer->addAddress( $this->configContact->to );
						$mailer->isHTML( TRUE );
						$mailer->Subject = $this->configContact->subject;
						$mailer->Body    = $this->render( 'message', [
							'name'  => $name,
							'email' => $email,
							'text'  => $text,
						] );
						if ( isset( $this->configContact->debug ) && $this->configContact->debug ) {
							$mailer->SMTPDebug = 3;
						}
						if ( $mailer->send() ) {
							return TRUE;
						} else {
							return FALSE;
						}
					}
					catch ( Exception $ex ) {
						die ( $ex->getMessage() );
					}
				} else {
					return FALSE;
				}
			}
			
			/**
			 *  Save subscriber email into choosen gateway (Action)
			 *
			 * @return bool
			 */
			public function subscribe() {
				$email = ( isset( $_POST[ 'email' ] ) && !empty( $_POST[ 'email' ] ) && is_string( $_POST[ 'email' ] ) && preg_match( '//i', $_POST[ 'email' ] ) )
					? trim( filter_var( $_POST[ 'email' ], FILTER_VALIDATE_EMAIL ) )
					: NULL;
				if ( !isset( $email ) || empty( $email ) || is_null( $email ) ) {
					$this->errors[ 'fields' ]              = ( isset( $this->errors[ 'fields' ] ) )
						? $this->errors[ 'fields' ]
						: [ ];
					$this->errors[ 'fields' ][ 'email' ]   = ( isset( $this->errors[ 'fields' ][ 'email' ] ) )
						? $this->errors[ 'fields' ][ 'email' ]
						: [ ];
					$this->errors[ 'fields' ][ 'email' ][] = 'Email is not valid';
					
				}
				$provider = ( $this->configSubscribe->gateway === 'mailchimp' )
					? new MailChimpProvider( $this->configSubscribe )
					: new FileProvider();
				$provider;
				
				return $provider->send( $email );
			}
			
			/**
			 *  If action not found (Action)
			 *
			 * @return bool
			 */
			public function not_found() {
				$this->errors[ 'action' ]   = ( isset( $this->errors[ 'action' ] ) && !empty( $this->errors[ 'action' ] ) )
					? $this->errors[ 'action' ]
					: [ ];
				$this->errors[ 'action' ][] = 'Action not found';
				
				return FALSE;
			}
		}
	}