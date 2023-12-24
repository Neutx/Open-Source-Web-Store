/**
 * Created by mestafor on 25.07.16.
 */
import {httpPost} from "../functions/promise-ajax";
import {form_serialize} from "./Serialize";
import {clean_form} from "./clean-form";

class ContactForm {

    constructor( forms, fileUrl, action ) {

        if( ! forms || ! fileUrl ) {
            return;
        }

        this.fileUrl = fileUrl ? fileUrl : null; //'php/contact.php';
        this.forms = document.querySelectorAll( forms );
        this.action = action ? action : 'contact';

        this.init();
    }

    init() {

        if (this.forms.length <= 0) {
            return false;
        }

        let forms = this.forms;
        [].forEach.call(forms, form => {

            form.onsubmit = event => {

                event.preventDefault();

                let submit_btn = form.querySelector('[type="submit"]');
                let comment = form.querySelector('[name="comment"]');
                let email = form.querySelector('[name="email"]');
                let name = form.querySelector('[name="name"]');

                let sendRequest = true;

                if( comment ) {
                    if( ! comment.value ) {
                        comment.classList.add('error');
                        sendRequest = false;
                    } else {
                        comment.classList.remove('error');
                    }
                }

                if( email ) {

                    if( ! email.value || ! this.validateEmail(email.value) ) {
                        email.classList.add('error');
                        sendRequest = false;
                    } else {
                        email.classList.remove('error');
                    }
                }

                if( name ) {
                    if( ! name.value ) {
                        name.classList.add('error');
                        sendRequest = false;
                    } else {
                        name.classList.remove('error')
                    }
                }

                if( ! sendRequest ) {
                    return false;
                }

                httpPost( this.fileUrl, form_serialize(form), this.action).then( result => {

                    result = JSON.parse( result );

                    if( result.status === 'success' ) {

                        form.classList.add( 'form-success' );

                        submit_btn ? submit_btn.setAttribute('disabled', 'disabled') : null;

                        clean_form( form );

                        setTimeout(()=>{
                            form.classList.remove( 'form-success' );
                        },300);
                    } else {
                        if( result.commentMissed ) {
                            comment ? comment.classList.add('error') : null;
                        }
                        if( result.emailMissed ) {
                            email ? email.classList.add('error') : null;
                        }
                        if( result.nameMissed ) {
                            name ? name.classList.add('error') : null;
                        }
                    }
                } );
            };
        });
    }

    validateEmail( email ) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test( email );
    }

}

export default ContactForm;