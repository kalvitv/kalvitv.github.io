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
