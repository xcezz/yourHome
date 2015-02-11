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
            infoboard.onclick = function(){
                $(Yourhome).trigger('featureClicked',{"feature":"infoboard"});
            };
            calendar.onclick = function(){
                $(Yourhome).trigger('featureClicked',{"feature":"calendar"});
            };
            account.onclick = function(){
                $(Yourhome).trigger('featureClicked',{"feature":"account"});
            };
            stock.onclick = function(){
                $(Yourhome).trigger('featureClicked',{"feature":"stock"});
            };
            tasks.onclick = function(){
                $(Yourhome).trigger('featureClicked',{"feature":"tasks"});
            };
        };

    that.init = init;


    return that;
})();