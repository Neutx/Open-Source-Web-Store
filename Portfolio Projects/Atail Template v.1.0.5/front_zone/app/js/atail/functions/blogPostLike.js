import {
  setCookie,
  getCookie
} from './setCookie';

export function blogPostLike(target) {
  wp.ajax.send('atail_add_like', {
    data: {
      token: getCookie('atail_xslt'),
      post_id: target.getAttribute('data-post')
    },
    success: function(data) {
      let template = `<i class="fa fa-heart-o" aria-hidden="true"></i>${data.likes}`;
      target.innerHTML = template;
      setCookie('atail_xslt', data.token);
    },
    error: function(data) {
      console.error(data);
    }
  });
}