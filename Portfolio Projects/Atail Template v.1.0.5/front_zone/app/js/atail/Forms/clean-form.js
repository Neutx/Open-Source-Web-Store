/**
 * Created by mestafor on 25.07.16.
 */
export function clean_form( form ) {
    if (!form || form.nodeName !== "FORM") {
        return;
    }
    var i, j,
        obj = {};
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
        if (form.elements[i].name === "") {
            continue;
        }
        switch (form.elements[i].nodeName) {
            case 'INPUT':
                switch (form.elements[i].type) {
                    case 'text':
                    case 'hidden':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        form.elements[i].value = '';
                        break;
                    case 'email':
                        form.elements[i].value = '';
                        break;
                    case 'checkbox':
                    case 'radio':
                    case 'file':
                        break;
                }
                break;
            case 'TEXTAREA':
                form.elements[i].value = '';
                break;
        }
    }
}