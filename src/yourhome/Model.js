Yourhome.Model = (function () {
    var that = {},
        infoboard,
        calendar,
        account,
        stock,
        tasks,
        homedata = {
            "infoboard": infoboard,
            "calendar": calendar,
            "tasks": tasks,
            "account": account,
            "stock": stock
        },

        init = function () {
            _.each(_.keys(homedata), function(element){
                homedata[element] = {
                    "feature": element, 
                    "right": Helper.getShortInfo(element), 
                    "middle":[],
                    "left": Helper.getSortList(element)
                };
            });
            _initEvents();
            $(Yourhome).trigger('render', homedata.infoboard);
            return that;
        },
        
        _initEvents = function(){
            $(Yourhome).on('featureClicked', function(event, data){
                var featureClicked = homedata[data.feature];
                $(Yourhome).trigger('render', featureClicked);
            });
            $(Yourhome).on('middleContentChanged',function(event, data){
                homedata[data.feature].middle = data.middle;
            });
            $(Yourhome).on('newCalendarEntry',function(event, data){
                var TESTIMG = new Image(),
                    infoboardEntry = {
                        "feature":data.feature,
                        "user-img":TESTIMG,
                        "input-text":data.entry.title + new Date(data.entry.info),
                        "user-name":"Kalender Eintrag",
                        "date": Helper.today()};
                TESTIMG.src = "res/assets/avatar.png";
                homedata.infoboard.middle.unshift(infoboardEntry);
            });
        };

    that.init = init;


    return that;
})();