function emailValidation() {
  const form = document.getElementById('form');
  const emailComfirmField = document.getElementById('email_confirm');
  const element = document.createElement('p');
  const message = document.createTextNode("Eメールが一致しません");
  const contentField = document.getElementById('content_field');
  element.appendChild(message);
  element.setAttribute('id', 'alert');
  element.classList.add("alert_color");
  emailComfirmField.addEventListener('input', e => {
    if(form.email.value !== form.email_confirm.value) {
      if (!document.getElementById('alert')) {
        contentField.parentNode.insertBefore(element, contentField);
        emailComfirmField.classList.add("alert_bg");
      }
    } else {
      emailComfirmField.classList.remove("alert_bg");
      element.parentNode.removeChild(element);
    }
  });
  // Vueインスタンスが生成され、Vue.jsが使用できるようになります
  const app = new Vue({
    // elオプションは、Vue.jsにidが割り振られているDOM要素を
    // 使用させるよう指示させるオプションです
    el: '#app',
    // index.htmlでは<section>要素に id="app"を付加したため、
    // Vueインスタンスは<section>要素をマウントするようになりました。
    data: {
      // index.htmlには<p class="alert_color">{{ errorMessage }}</p> 
      errorMessage: 'Eメールが一致しません',
    }
  })
};

window.onload = function() {
  emailValidation();
};