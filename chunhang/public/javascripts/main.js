jQuery(function($) {
  $('form').submit(function(){
    var input = this.getElementsByTagName('input')[0]
    var val = $.trim(input.value).length
    if(!val) {
      alert('请输入用户名！')
      return false
    }
  })
})