$(function () {

  $('#form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空'
          },
          callback: {
            message: '用户名错误'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 18,
            message: '密码在6-18个字符内'
          },
          callback: {
            message: '密码不正确'
          }
        }
      }
    }
  }).on('success.form.bv', function (e) {
    e.preventDefault();
    var validator = $("#form").data('bootstrapValidator');
    console.log(validator);
    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      success: function (data) {
        if (data.success) {
          location.href = "index.html"
        } else {
          if (data.error == 1000) {
            validator.updateStatus('username', 'INVALID', 'callback')
          } else if (data.error == 1001) {
            validator.updateStatus('password', 'INVALID', 'callback')
          }
        }
      }
    })
  });
  
  
  $('[type="reset"]').on('click', function () {
    $("#form").data('bootstrapValidator').resetForm();
  })
  
})
