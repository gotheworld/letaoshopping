(function (w) {
  function getAttr() {
    var str = location.search;
    str = str.slice(1);
    var urlArr = str.split("&");
    var obj = {};
    for (var i = 0; i < urlArr.length; i++) {
      var key = urlArr[i].split("=")[0];
      var value  =  decodeURI(urlArr[i].split("=")[1]);
      obj[key] = value;
    }
    return obj
  };
  //获取指定参数
  function getParam(key){
    return getAttr()[key];
  }
  w.getParam = getParam;
})(window);