(function(ng){

var app = ng.module('kalvi-app', []);

app.controller("classController", function($scope, classService, $sce, $timeout){
    let vm = this;
    
    vm.subject = [];
    vm.subjectVideos = [];
    
    vm.getVideoUrl = function(id){
        return $sce.trustAsResourceUrl("https://www.youtube-nocookie.com/embed/" + id);
    }

    let videos = [];
    let sKey1 = [
        [["தமிழ்", "tamil", "திருக்குறள்"], []],
        [["english", "Grammar", "Prose", "Poem"], []],
        [["கணிதம்", "math", "maths", "கணக்கு", "எண்கள்", "அளவியல்", "வடிவியல்", "கணிதவியல்", "கணக்கியல்"],[]],
        [["வணிகவியல்", "COMMERCE", "கலைத் தொழில்", "ECONOMICS"], []],        
        [["புள்ளியியல்", "புள்ளியில்", "புள்ளியல்", "Statistics"], ["கணக்கு", "கணிதம்"]],
        [["அலுவலக மேலாண்மை", "அலுவலக"], []],
        [["அரசியல்"], []],
        [["விலங்கியல்"], []],        
        [["மனையியல்", "மனை அறிவியல்"], []],
        [["தணிக்கையியல்"], []],
        [["பொருளியல்"], ["சமூகஅறிவியல்", "சமூக அறிவியல்"]],        
        [["அறவியலும் இந்தியப் பண்பாடும்", "இந்தியப்பண்பாடும்", "இந்தியபண்பாடும்"], []],
        [["உணவக மேலாண்மை", "சத்துணவியல்", "உணவு மேலாண்மை", "சத்துணவில்"], []],
        [["வரலாறு"], [" தமிழ்", "வேளாண்"]],
        [["புவியியல்"], []],
        [["தாவரவியல்"], ["உயிரி தாவரவியல்"]],
        [["உயிரி தாவரவியல்"], []],
        [["நுண்ணுயிரியல்", "நுண்உயிரியல்"], []],
        [["இயற்பியல்", "முப்பரிமாணம்"], []],
        [["வேதியியல்"], []],
        [["பொருளியியல்"], []],
        [["ஊர்தி்", "ஊர்திபொறியியல்", "ஊர்திப்பொறியியல்", "தானியங்கி", "அடிப்படை ஊர்தி பொறியியல்"], []],
        [["அடிப்படை மின்னணு பொறியியல்", "மின்னணுப்", "மின்னியல்", "மின்பொறியியல்", "மின்ணணுப்", "அடிப்படை மின் பொறியியல்", "மின்"], []],
        [["அடிப்படை இயந்திரவியல்", " அடிப்படை இயந்திரவியல்", "இயந்திரவியல்"], []],
        [["அடிப்படைகட்டிடபொறியியல்", "அடிப்படை கட்டட பொறியியல்", "அடிப்படை கட்டிட பொறியியல்", "கட்டிடப்", "அடிப்படை கட்டிப்பொறியியல்", "கட்டிட"], []],
        [["கணினி தொழில்", "கணினி பயன்பாடுகள்", "Computer", "கணினி", "கணினிதொழில்", "கணினிப்பயன்பாடு", "கணினித்தொழில்"], [" தமிழ்", "| English"]],
        [["நெசவியல்", "நெசவியலும்"], []],
        [["பொது - செவிலியம்", "செவிலியம்"], []],
        [["வேளாண்", "வேளாண்மை அறிவியல்", "வேளாண்அறிவியல்"], []],
        [[], []]
    ];
    
    let sKey2 = [
        [["தமிழ்", "tamil", "திருக்குறள்"], ["சமூக அறிவியல்"]],
        [["english", "Grammar", "Prose", "Poem"], []],
        [["கணிதம்", "math", "maths", "கணக்கு", "எண்கள்", "அளவியல்", "வடிவியல்", "கணிதவியல்"],[]],
        [["சுழ்நிலையியல்", "சூழ்நிலையியல்"], ["சமூக", "அறிவியல்"]],
        [["science", "அறிவியல்", "அறிவியியல்", "அற்வியல் "], ["social science", "சமூக", "சூழ்நிலையியல்"]],
        [["social science", "சமூக", "Social Studies", "சமுக அறிவியல்", "வரலாறு", "புவியியல்"], []],
        [[], []]
    ];
    
    let sKey;
    
    function GetKeyWords(classNo){
        sKey = sKey1;
        if(parseInt($scope.classNo) <= 10){
            sKey = sKey2;
        }
    }
    
    vm.getVideo = function(subject){
        let fvideo = [];
        if(subject === (vm.subject.length-1)) return getOtherVideo();
        for(let i=0; i<videos.length; i++){
            let cvideo = videos[i];
            for(let j=0; j< sKey[subject][0].length; j++){
                if(cvideo.topic.toLowerCase().indexOf(sKey[subject][0][j].toLowerCase()) > -1 && !NotThatOne(cvideo.topic, subject)){
                    fvideo.push(cvideo);
                    break;
                }
            }
        }
        return fvideo;
    }  

    function getOtherVideo(){
        let fvideo = [];
        for(let i=0; i<videos.length; i++){
            let cvideo = videos[i];
            let found = false;
            for(let k=0; k<sKey.length && !found; k++){
                for(let j=0; j< sKey[k][0].length; j++){
                    if(cvideo.topic.toLowerCase().indexOf(sKey[k][0][j].toLowerCase()) > -1  && !NotThatOne(cvideo.topic, k)){
                        found = true;
                        break;
                    }
                }
            }

            if(!found) {
                fvideo.push(cvideo);
            }
        }
        return fvideo;
    }
    
    function NotThatOne(sub, k){
        let found = false;
        for(let j=0; j< sKey[k][1].length; j++){
            if(sub.toLowerCase().indexOf(sKey[k][1][j].toLowerCase()) > -1){
                found = true;
                break;
            }
        }
        return found;
    }
    
    $timeout(function () {      
        GetKeyWords(parseInt($scope.classNo));
        classService.GetAllVideos($scope.classNo)
        .then(function(data){
            vm.subject = ["தமிழ்", 
            "English", 
            "கணக்கு",                      
            "வணிகவியல்",            
            "புள்ளியியல்",
            "அலுவலக மேலாண்மை",                        
            "அரசியல் அறிவியல்",
            "விலங்கியல்",            
            "மனையியல்",
            "தணிக்கையியல்",
            "பொருளியல்",            
            "அறவியலும் இந்தியப் பண்பாடும்",
            "உணவக மேலாண்மை",
            "வரலாறு",
            "புவியியல்",
            "தாவரவியல்",
            "உயிரி தாவரவியல்",
            "நுண்ணுயிரியல்",
            "இயற்பியல்",
            "வேதியியல்",
            "பொருளியியல்",
            "அடிப்படை தானியங்கி ஊர்தி பொறியியல்",
            "அடிப்படை மின்னணு பொறியியல்",
            "அடிப்படை இயந்திரவியல்",
            "அடிப்படைகட்டிடபொறியியல்",
            "கணினி தொழில்நுட்பம்",
            "நெசவியலும் ஆடை வடிவமைப்பும்",
            "பொது - செவிலியம்",
            "வேளாண் அறிவியல்",
            "மற்றவைகள்"];
            
            if(parseInt($scope.classNo) <= 10){
                vm.subject = ["தமிழ்", 
                            "English", 
                            "கணக்கு", 
                            "சூழ்நிலையியல்", 
                            "அறிவியல்", 
                            "சமூக அறிவியல்",
                            "மற்றவைகள்"];
            }
            
            
            videos = data;
            //console.log("total:", videos.length);
            for(let i=0; i<vm.subject.length; i++){
                vm.subjectVideos.push(vm.getVideo(i));
            }
        });
    }, 900);
    
    
});

})(angular);
(function(ng){

var app = ng.module('kalvi-app');

app.service("classService", function($q, $http){
    return {
        GetAllVideos : function(cno){
            var deferred = $q.defer();

            $http({ method: 'GET',  url: '/kalvi/videos/'+ cno +'.json' })
            .then(function (response) {
                deferred.resolve(response.data);
            },
            function errorCallback(response) {
                deferred.reject(response.data);
            });

            return deferred.promise;
        }
    };
});

})(angular);
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
  templateUrl: '/kalvi/html/video-slider-template.html',
  controller: SliderController
});
    
    
})(angular);