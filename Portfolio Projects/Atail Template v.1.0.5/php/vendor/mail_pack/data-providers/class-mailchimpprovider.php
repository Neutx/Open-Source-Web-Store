<?php
	namespace Provider;
	require_once( __DIR__ . '/../data-providers/I_BaseProvider.php' );
	use Exception;
	use Mailchimp;
	use Mailchimp_Error;
	
	class MailChimpProvider implements I_BaseProvider {
		private $configSubscribe = NULL;
		
		/**
		 * MailChimpProvider constructor.
		 *
		 * @param null $configSubscribe
		 */
		public function __construct( $configSubscribe ) {
			$this->configSubscribe = $configSubscribe;
		}
		
		/**
		 *  Send subscriber email into mailchimp list
		 *
		 * @param $email
		 *
		 * @return bool
		 */
		function send( $email ) {
			try {
				$subscribe      = new Mailchimp( $this->configSubscribe->api_key );
				$mailchimpLists = new \Mailchimp_Lists( $subscribe );
				$result = $mailchimpLists->subscribe( $this->configSubscribe->list_uid, [ 'email' => htmlentities( $email ) ] );
				if ( isset( $result[ 'leid' ] ) && !empty( $result[ 'leid' ] ) ) {
					return TRUE;
				} else {
					return FALSE;
				}
			}
			catch ( Mailchimp_Error $ex ) {
				die( $ex->getMessage() );
			}
			catch ( Exception $ex ) {
				die( $ex->getMessage() );
			}
		}
	}