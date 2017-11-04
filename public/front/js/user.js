$(function () {
  
  $.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    success: function (data) {
      console.log(data)
      checkLogin(data);
      var html = template("tpl", data);
      $('.user_info').html(html);
    }
  })
  
  $('.btn_logout').on('click', function () {
    
    mui.confirm('您确定退出吗', '提示', ['否', '是'], function (e) {
      if (e.index === 0) {
        mui.toast('操作取消')
      } else {
        $.ajax({
          type: 'get',
          url: '/user/logout',
          success: function (data) {
            if (data.success) {
              location.href = 'login.html'
            }
          }
        })
      }
    })
  })
});