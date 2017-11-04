$(function () {
//区域滚动
  mui('.mui-scroll-wrapper').scroll({
    indicators: false
  });
  var id = getParam('id');
  
  $.ajax({
    type: 'get',
    url: '/product/queryProductDetail',
    data: {id: id},
    success: function (data) {
      //将尺寸切割成数组
      var arr = data.size.split('-');
      var sizeArr = [];
      for (var i = +arr[0]; i <= +arr[1]; i++) {
        sizeArr.push(i);
      }
      data.sizeArr = sizeArr;
      var html = template('tpl', data);
      $('.mui-scroll').html(html);
      
      //由于是动态渲染说一一开始的轮播图是没有的,得在页面渲染完成之后才能进行初始化
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 1000
      });
      //数字输入框的初始化
      mui('.mui-numbox').numbox();
      //span的点击事件
      $('.size_box span').on('click',function () {
        $(this).addClass('now').siblings().removeClass('now');
      })
     
    }
  })
  //立即购买
  $('.btn_car').on('click',function(){
    var size = $('.size_box span.now').html();
    var num = $('.mui-numbox-input').val();
    if(!size){
      mui.toast('请选择尺码');
      return
    }
    $.ajax({
      type:'post',
      url:"/cart/addCart",
      data:{
        productId:id,
        size:size,
        num:num
      },
      success:function (data) {
        console.log(data);
        if(data.success){
          mui.toast('添加成功')
        }
        if(data.error === 400){
          location.href = "login.html?retUrl="+location.href;
        }
      }
    })
  })
})
