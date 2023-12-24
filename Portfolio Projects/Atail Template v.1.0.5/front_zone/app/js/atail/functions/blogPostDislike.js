import {setCookie, getCookie} from './setCookie';

export function blogPostDislike( target ) {
  wp.ajax.send('atail_add_dislike', {
     data: {
       token: getCookie('atail_xslt'),
      post_id: target.getAttribute('data-post')
     },
      success: function (data) {;
          let template = `<span class="comments-icon">&#207;</span>${data.dislikes}`;
          target.innerHTML = template;
          setCookie('atail_xslt', data.token);
      },
      error: function (data) {
        console.error(data);
      }
  });
}
