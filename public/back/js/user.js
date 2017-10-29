$(function () {
  
  var pagenum = 1;
  var pagesize = 5;
  function fn(){
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {page: pagenum, pageSize: pagesize},
      success: function (data) {
        console.log(data);
        var html = template("tpl", data);
        $('tbody').html(html);
        $(".pagination").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: pagenum,
          totalPages: Math.ceil(data.total/pagesize),
          size: "small",
          onPageClicked: function (event, originalEvent, type, page) {
            pagenum = page;
            fn();
          }
        });
      }
    })
  }
  fn()
 
})