Yourhome.Controller = (function () {
    var that = {},
        infoboard,
        calendar,
        account,
        stock,
        tasks,

        init = function () {
            infoboard = document.getElementById("infoboard");
            calendar = document.getElementById("calendar");
            account = document.getElementById("account");
            stock = document.getElementById("stock");
            tasks = document.getElementById("tasks");
            _initEvents();
            return that;
        },
        
        _initEvents = function(){
            
        };

    that.init = init;


    return that;
})();