$(function () {
  var pagenum = 1;
  var pagesize = 5;
  
  //渲染页面
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
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
  
  
  //添加下拉组件渲染
  $('.btn_add').on('click', function () {
    $('#add_modal').modal('show');
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: 1,
        pageSize: 100
      },
      success: function (data) {
        console.log(data)
        $(".dropdown-menu").html(template("tpl2", data));
        
      }
    });
  })
  //设置下拉框啊标签的点击事件
  $('.dropdown-menu').on('click', 'a', function () {
    $('.dropdown-text').text($(this).text());
    
    $('#brandId').val($(this).data('id'));
    
    $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
  })
  
  //图片上传
  var imgArr = [];
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      $(".img_box").append('<img src="' + data.result.picAddr + '" width="100" height="100">');
      imgArr.push(data.result)
      if (imgArr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
      } else {
        $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'INVALID');
      }
      
    }
  });
  
  //表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '二级分类名称不能为空'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "请输入一个大于0的库存"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的尺寸'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品折扣价不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    console.log($('#form').serialize());
    console.log(imgArr);
    // var str = $('#form').serialize() +"&picName1="+ imgArr[0].picName+"picAddr"+imgArr[0].picName;
    // str +=
    // var str =$('#form').serialize() + imgArr[0].
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      success:function(){
        $('#add_modal').modal('hide');
        $('.dropdown-text').text('请选择二级分类');
        $('#form')[0].reset();
        $('#form').data('bootstrapValidator').resetForm();
        pagenum = 1;
        render();
      }
    })
  });
  
  
})