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
            homedata.infoboard = {"feature":"infoboard","right":["Markus","Christian"],"middle":[],"left":["Alle anzeigen", "Nachrichten", "Aufgaben", "Kalender", "Vorräte"]};
            homedata.calendar = {"feature":"calendar","right":[],"middle":[],"left":[]};
            homedata.account = {"feature":"account","right":[],"middle":[],"left":[]};
            homedata.stock = {"feature":"stock","right":[],"middle":[],"left":[]};
            homedata.tasks = {"feature":"tasks","right":[],"middle":[],"left":[]};
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
        };

    that.init = init;


    return that;
})();