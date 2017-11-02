$(function () {
  
  var pagenum = 1;
  var pagesize = 5;
  
  //渲染页面
  function render() {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {page: pagenum, pageSize: pagesize},
      success: function (data) {
        console.log(data)
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
  //显示模态框
  $('.btn_add').on('click', function () {
    $('#add_modal').modal('show');
  })
  //渲染下拉框数据
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategoryPaging',
    data: {page: 1, pageSize: 100},
    success: function (data) {
      console.log(data);
      var html = template("tpl2", data);
      $('.dropdown-menu').html(html);
      
    }
  })
  //设置下拉框显示
  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown-text').text($(this).text());
    //给下拉框隐藏域赋值
    console.log($(this).data("id"));
    $("#categoryId").val($(this).data("id"));
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
  })
  //上传文件
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      $('.img_box img').attr("src", data.result.picAddr);
      $('#pic1').val(data.result.picAddr)
      $('#form').data("bootstrapValidator").updateStatus("brandLogo", "VALID");
    }
  });
  //验证表单
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '一级分类名称不能为空'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '二级分类名称不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    console.log($('#form').serialize());
    $.ajax({
      type:"post",
      url:"/category/addSecondCategory",
      data:$('#form').serialize(),
      success:function(data){
        if(data.success){
          $("#add_modal").modal("hide");
          currentPage = 1;
          render();
          $('#form')[0].reset();
          $('#form').data("bootstrapValidator").resetForm();
          $(".dropdown-text").text("请选择一级分类");
          $(".img_box img").attr("src", "images/none.png");
        }
      }
    })
    
  });
  
})