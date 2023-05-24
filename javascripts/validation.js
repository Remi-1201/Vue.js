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
      // 以下を追加
      formData: {
        name: '',
        email: '',
        emailConfirm: '',
        content: '',
        region: '',
      },
      // 以下を追加
      regions: [
        { id: 1, name: '東北' } ,
        { id: 2, name: '関東' } ,
        { id: 3, name: '関西' } 
      ], // カンマを追加
      // 以下を追加
      confirmView: false,
    },
    // 以下を追加
    methods: {
      openCheckArea() {
        // メールのエラー表示がなされている場合は
        //「確認」ボタンをクリックしても確認エリアを表示しないようにする
        if (!this.validation) return false;
        this.confirmView = true;
        // 実行する前に、validationの値を確認し、falseの場合は中断する
      },
      closeCheckArea() {
        this.confirmView = false;
      }
    },
    computed: {
      // 未入力であった場合に、
      // Eメール入力フォームと確認フォームの値の評価をせずにtrueを返す
      validation: function() {
        return this.formData.email === '' || 
          this.formData.emailConfirm === '' || 
          this.formData.email === this.formData.emailConfirm
      },
      // errorClassは、validationの値を確認し、
      // falseの場合のみ “alert_bg” というclassを返却します。
      // これにより、HTML側では、errorClassを設定すれば良いだけになります。
      errorClass: function() {
        return this.validation ? false : 'alert_bg';
      }
    },
  })
};

window.onload = function() {
  emailValidation();
};