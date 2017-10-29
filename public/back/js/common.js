//是否登陆的验证
if (location.href.indexOf('login.html') < 0) {
  $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    success: function (data) {
      if (data.error == 400) {
        location.href = 'login.html'
      }
    }
  })
};
//进度条设置
(function () {
  $(document).ajaxStart(function () {
    NProgress.start()
  })
  $(document).ajaxStop(function () {
    NProgress.done();
  })
})();

//分类菜单切换
(function () {
  var subnav = $('.subnav');
  var cate = $('.category')
  cate.on("click", function () {
    subnav.slideToggle();
  })
})();
//头部切换
(function () {
  var aside = $('.aside');
  var main = $('.main');
  var icon_menu = $('.icon_menu');
  icon_menu.on('click', function () {
    aside.toggleClass('now');
    main.toggleClass('now');
  })
})();
//退出验证,模态框
(function () {
  var icon_logout = $('.icon_logout');
  icon_logout.on('click', function () {
    $('#logout_modal').modal("show");
  })
  $('.confirm').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function (data) {
        if (data.success) {
          location.href = 'login.html'
        }
      }
    })
  })
})();
