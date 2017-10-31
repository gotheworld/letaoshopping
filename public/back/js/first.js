//页面渲染
$(function () {
  var pagenum = 1;
  var pagesize = 5;
  
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
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
  
  render();
  $('.btn_add').on('click', function () {
    $('#add_modal').modal('show');
  })
  $('.user_confirm').on('click', function () {
    
    $('#add_modal').modal("show");
    
  })
  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '一级分类名称不能为空'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    var validator = $("#form").data('bootstrapValidator');
    $.ajax({
      type: 'post',
      url: '/category/addTopCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (data) {
        console.log(data)
        if (data.success) {
          /*关闭模态框*/
          $('#add_modal').modal('hide');
          currPage = 1;
          render();
          $('#form').data('bootstrapValidator').resetForm();
          $('#form')[0].reset();
        }
      }
    });
  });
})
