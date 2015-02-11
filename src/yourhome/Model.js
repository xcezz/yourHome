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
            _initEvents();
            return that;
        },
        
        _initEvents = function(){
            $(Yourhome).on('infoboardChanged',function(event, data){
                homedata.infoboard = data.infoboard;
            });
        };

    that.init = init;


    return that;
})();