// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/



$('#hero_image').bind('change',function(){
  image_size = this.files[0].size/1024/1024
    if(image_size > 5){
       alert("上传的图片大于5MB，请重新上传")
  }
})



$('.nav-tabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})