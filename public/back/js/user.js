$(function () {
  
  var pagenum = 1;
  var pagesize = 5;
  
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {page: pagenum, pageSize: pagesize},
      success: function (data) {
        var html = template("tpl", data);
        $('tbody').html(html);
        $(".pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: pagenum,
          totalPages: Math.ceil(data.total / pagesize),
          size: "small",
          onPageClicked: function (event, originalEvent, type, page) {
            pagenum = page;
            render();
          }
        });
      }
    })
  }
  
  render()
  //用户操作事件
  $('tbody').on('click', '.btn-user', function () {
    $('#user_modal').modal("show");
    var id = $(this).parent().data('id');
    var isDelete = $(this).parent().data('isDelete');
    isDelete = isDelete === 1 ? 0 : 1;
    $('.user_confirm').off().on('click',function(){
        $.ajax({
          type:'post',
          url:'/user/updateUser',
          data:{id:id,isDelete:isDelete},
          success:function (data) {
            $('#user_modal').modal('hide');
            render()
          }
        })
    })
  })
})