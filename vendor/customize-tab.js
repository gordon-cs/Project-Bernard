$('.info-blocks div').hover(function (e) {
  e.preventDefault()
  $(this).tab('show')
});

$(".my-involvements-page li").click(function() {
  window.location = $(this).find("a").attr("href");
  return false;
});
