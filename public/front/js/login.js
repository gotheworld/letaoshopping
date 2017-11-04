$(function () {
  
  
  $('.btn_confirm').on('click', function () {
    var username = $('.input_user').val().trim();
    var password = $('.input_pwd').val().trim();
    //校验
    if (!username) {
      mui.toast('请输入用户名');
      return;
    }
    if (!password) {
      mui.toast('请输入密码');
      return;
    }
    $.ajax({
      type: 'post',
      url: "/user/login",
      data: {
        username: username,
        password: password
      },
      success: function (data) {
        if (data.success) {
          var retUrl = location.search;
          if (retUrl.indexOf("retUrl") > -1) {
            location.href = retUrl.replace("?retUrl=", "");
          } else {
            location.href = "user.html"
          }
        }
        if (data.error === 403) {
          mui.toast(data.message);
        }
      }
    });
  })
  
  
});