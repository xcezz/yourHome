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
            $('body').on('infoboardChanged',function(data){
                homedata.infoboard = data;
                console.log(homedata);
            });
        };

    that.init = init;


    return that;
})();