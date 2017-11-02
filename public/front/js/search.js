var scroll = mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators: false
//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

function getItem() {
  var str = localStorage.getItem('search_history') || '[]';
  str = JSON.parse(str);
  return str;
}

function render() {
  var historyArr = getItem("search_history");
  var html = template('tpl', {search_history: historyArr});
  $('.history').html(html);
  
}

render()

$('.lt_history').on('click', '.remove_all', function () {
  var historyArr = getItem();
  localStorage.removeItem('search_history');
  render()
})

$('.lt_history').on('click', '.remove_one', function () {
  var historyArr = getItem();
  var index = $(this).data('id')
  historyArr.splice(historyArr[index], 1)
  localStorage.setItem('search_history', JSON.stringify(historyArr))
  render()
})

$('.btn_search').on('click', function () {
  var key = $('.search_text').val().trim();
  if (key == "") {
    return
  }
  var historyArr = getItem();
  var index = historyArr.indexOf(key);
  console.log(index, key);
  if (index >= 0) {
    historyArr.splice(index, 1);
    historyArr.unshift(key)
  } else if (historyArr.length > 10) {
    historyArr.pop();
    historyArr.unshift(key);
  } else {
    historyArr.unshift(key);
  }
  
  console.log(history);
  historyArr = JSON.stringify(historyArr);
  localStorage.setItem('search_history', historyArr)
  location.href = 'searchList.html?key=' + key;
})

