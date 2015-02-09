Yourhome.Model = (function () {
    var that = {},
        infoboard,
        calendar,
        account,
        stock,
        homedata = {
            "infoboard": infoboard,
            "calendar": calendar,
            "account": account,
            "stock": stock
        },

        init = function () {
            _initEvents();
            return that;
        },
        
        _initEvents = function(){
            $('body').on('infoboardChanged',function(data){
                infoboard = data;
                console.log(homedata);
            });
        };

    that.init = init;


    return that;
})();