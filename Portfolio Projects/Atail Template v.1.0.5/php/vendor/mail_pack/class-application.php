<?php
	namespace Basic
	{
		require_once( __DIR__ . '/controller/class-controller.php' );
		use Controllers\Controller;
		use Exception;
		
		class Application {
			/**
			 *  Check request type. Return true if ajax
			 *
			 * @return bool
			 */
			private function isAjax() {
				return ( isset( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && !empty( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && strtolower( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) == 'xmlhttprequest' );
			}
			
			/**
			 * Evaluate application task and routing
			 */
			public function run() {
				if ( $this->isAjax() ) {
					$data       = [ ];
					$action     = ( isset( $_POST[ 'action' ] ) && !empty( $_POST[ 'action' ] ) && is_string( $_POST[ 'action' ] ) )
						? htmlspecialchars( trim( $_POST[ 'action' ] ) )
						: NULL;
					$controller = new Controller();
					if ( !method_exists( $controller, $action ) ) {
						$action = 'not_found';
					}
					try {
						$respond = $controller->$action();
						if ( $respond === TRUE ) {
							$data[ 'status' ] = 'success';
						} else {
							$data[ 'status' ] = 'error';
							$data[ 'errors' ] = $controller->get_errors();
						}
					}
					catch ( Exception $ex ) {
						die( $ex->getMessage() );
					}
					echo json_encode( $data );
					exit;
				} else {
					die( 'Is not AJAX request' );
				}
			}
		}
	}