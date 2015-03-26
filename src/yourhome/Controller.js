Yourhome.Controller = (function () {
    var that = {},
        SERVER = "http://192.168.2.103:3000",
        server,
        infoboard,
        calendar,
        account,
        stock,
        tasks,

        init = function () {
            _initServerConnection();
            infoboard = document.getElementById("infoboard");
            calendar = document.getElementById("calendar");
            account = document.getElementById("account");
            stock = document.getElementById("stock");
            tasks = document.getElementById("tasks");
            _initEvents();
            return that;
        },
        
        _initServerConnection = function () {
            server = io.connect(SERVER);
            server.on('updateData', _updateData);
            console.log(server);
        },
        
        _updateData = function(data){
            $(Yourhome).trigger('homedataUpdated', data);
        },
        
        _initEvents = function(){
            $(Yourhome).on('serverupdate', function(event, data){
                server.emit('newData', data.homedata);
            });
            
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