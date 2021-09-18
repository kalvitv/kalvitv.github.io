$(function(){
    $(".go-to-top").click(function(){
        window.scrollTo(0,0);
    });
});


// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function showVideo(videoId){
   $("#videomodal .modal-body").empty();
   $("#videomodal .modal-body").append("<div id=\"player\"></div>");
   let player = new YT.Player('player', {
      height: '350',
      width: '100%',
      videoId: videoId,
      playerVars: {
        'playsinline': 1
      },
      events: {
        'onReady': function (event) { event.target.playVideo(); }
      }
   });
   var mm = document.getElementById('videomodal');
   var myModal = new bootstrap.Modal(mm);
   myModal.show();
   
   mm.addEventListener('hide.bs.modal', function (event) {
      player.stopVideo();
   });
}