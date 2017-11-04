var scroll = mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators: false
//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

$(function () {
  
  var key = getParam('key');
  $('.search_text').val(key);
  var data = {
    price: "",
    num: "",
    page: 1,
    pageSize: 10,
    proName: ""
  }
  
  //渲染页面
  function render(data) {
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: data,
      success: function (data) {
        var html = template('tpl', data);
        setTimeout(function () {
          $('.lt_product').html(html);
        }, 1000)
      }
    })
  }
  
  $('.lt_product').html($('<div class="loading"></div>'));
  data.proName = key;
  render(data);
  
  
  //搜索按钮点击事件
  $('.btn_search').on('click', function () {
    var key = $('.search_text').val().trim();
    if (key == "") {
      mui.toast('亲,你想买什么');
      return
    }
    //添加一个加载动画
    $('.lt_product').html($('<div class="loading"></div>'));
    
    data.proName = key;
    
    
    render(data)
  })
  
  //搜索头部点击事件
  $('.search_title a[data-type]').on('click', function () {
    var $this = $(this);
    var $span = $this.find('span');
    var isNow = $this.hasClass('now');
    if (isNow) {
      $span.toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      
    } else {
      $this.addClass('now').siblings().removeClass('now');
      $this.siblings().find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
    }
    var type = "";
    var value = "";
    type = $this.data('type');
    value = $span.hasClass('fa-angle-down') ? 2 : 1;
    
    data[type] = value;
    console.log(type, value)
    render(data);
  })
  
  
})
