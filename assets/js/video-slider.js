(function(ng){
    
var app = ng.module('kalvi-app');

function SliderController($element, $attrs) {
    var vm = this;

    let size = 3;
    let totalpage = 0;
    let reminder = 0;
    let currentpage = 0;
    vm.videos = [];

    vm.getP = function(){
        if(currentpage-1 >= 1){
            currentpage--;
            Empty();
            vm.videos = [];
            let max = (currentpage*size);
            for(let i=max - size; i< max; i++){
                vm.vii[i].IsActive = true;
                vm.videos.push(vm.vii[i]);
            }
        }
    }
    
    vm.getPFlag = function(){
        return currentpage-1 >= 1;
    }

    vm.getN = function(flag){
        if(currentpage+1 <= totalpage){
            currentpage++;
            
            if(!flag){
                Empty();
                vm.videos = [];
            }
            
            vm.videos = flag ? vm.videos :  [];
            let max = (currentpage*size);
            for(let i=max - size; i< max && i< vm.vii.length; i++){
                vm.vii[i].IsActive = true;
                vm.videos.push(vm.vii[i]);
            }
        }
    }
    
    vm.getNFlag = function(flag){
        return currentpage+1 <= totalpage;
    }
    
    vm.showytvideo = function(vid){
        window.showVideo(vid)
    }  
    
    function Empty(){
        for(let i=0; i< vm.videos.length; i++){
            vm.videos[i].IsActive = false;
        }
    }

    this.$onInit = function() {
        if(vm.vii){
            totalpage = parseInt(vm.vii.length/size);
            reminder = parseInt(vm.vii.length%size);
            if(reminder > 0) totalpage++;
            vm.getN();
        }
    };
}

app.component('videoSlider', {
  bindings: {
      vii: '<'
  },
  templateUrl: '/html/video-slider-template.html',
  controller: ["$element", "$attrs", SliderController]
});
    
    
})(angular);