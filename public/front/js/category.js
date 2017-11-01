var scroll =  mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 ,
  indicators:false
//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


//渲染一级分类
$.ajax({
  type:"get",
  url:"/category/queryTopCategory",
  success:function (data) {
    var html = template("tpl", data);
    $(".lt_catnav ul").html(html);
    renderSecond(data.rows[0].id);
  }
});
//渲染二级分类

function renderSecond(id){
  $.ajax({
    type:'get',
    url:'/category/querySecondCategory',
    data:{id:id},
    success:function(data){
      console.log(data);
      var html = template("tpl2",data);
      $('.lt_subnav ul').html(html);
    }
  })
}


$('.lt_catnav').on('click','li',function(){
  $(this).addClass("now").siblings().removeClass("now");
  var id = $(this).data("id");
  renderSecond(id);
  scroll[0].scrollTo(0,0,500);
})