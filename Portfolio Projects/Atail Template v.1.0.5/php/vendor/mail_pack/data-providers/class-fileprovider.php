<?php
	namespace Provider;
	require_once (__DIR__ . '/../data-providers/I_BaseProvider.php');
	use Exception;
	
	class FileProvider implements I_BaseProvider {
		private $emailsDir = __DIR__ . '/../../../emails/emails.dat';
		
		/**
		 *  Save subscriber email into file /emails/email.dat
		 *
		 * @param $email
		 *
		 * @return bool
		 */
		function send( $email ) {
			try {
				$data = [ ];
				if ( file_exists( $this->emailsDir ) ) {
					$data   = file_get_contents( $this->emailsDir );
					$data   = ( isset( $data ) && !empty( $data ) )
						? unserialize( $data )
						: [ ];
					$data[] = $email;
					file_put_contents( $this->emailsDir, serialize( $data ) );
				} else {
					throw new Exception( 'Can not find file emails/emails.dat' );
				}
			}
			catch ( Exception $ex ) {
				die( $ex->getMessage() );
			}
			
			return TRUE;
		}
	}