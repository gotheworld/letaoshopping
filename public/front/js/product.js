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
      console.log(data);
      
      var arr = data.size.split('-');
      console.log(arr)
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
    }
  })
  
})
