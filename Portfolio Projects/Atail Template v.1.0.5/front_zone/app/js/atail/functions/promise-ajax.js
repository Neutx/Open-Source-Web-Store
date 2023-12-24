import {Promise} from "es6-promise";

export function httpGet(url, target) {

    let file = target.getAttribute('data-post');

    file = file ? file + '.json' : '';

    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url + file + '?nochashe=' + (new Date()).getTime(), true);

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        xhr.send();

    });

}

export function httpPost(url, data, action) {

    return new Promise((resolve, reject) => {

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onload = function () {
            if (this.status == 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };

        let request_data = `action=${action}`;

        for( let key in data ) {
            if( data.hasOwnProperty(key) ) {
                request_data += request_data ? `&${key}=${data[key]}` : `${key}=${data[key]}`;
            }
        }

        xhr.send( request_data );

    });

}

