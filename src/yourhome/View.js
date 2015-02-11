Yourhome.View = (function () {
    var that = {},
        left,
        middle,
        right,
        infoTemplate,
        newInfoTemplate,
        checkboxTemplate,
        infoboard = [],

        init = function () {
            infoTemplate = document.getElementById('infoboardTemplate');
            checkboxTemplate = document.getElementById('checkboxTemplate');
            newInfoTemplate = document.getElementById('newInfoboardEntryTemplate');
            left = $('#steuerunglinks');
            middle = $('#steuerungmitte');
            right = $('#steuerungrechts');
            _initEvents();
            _loadLeftBar();
            _loadMiddleBar();
            _loadRightBar();
            return that;
        },
            
        _initEvents = function(){
            $(Yourhome).on('submitInfoEntry',_submitInfoEntry);
        },
            
        _loadRightBar = function(){
            var housemates = ["Markus", "Christian"],
                entry = "<p><b>Mitbewohner:</b></p>";
            _.each(housemates, function(element){
                entry += "<p>"+element+"<p>";
            });
            right.html(entry);
        },
            
        _loadLeftBar = function(){
            _createAddButton();
            var sort = left.find("#sort-options"),
                sortItems = ["Alle anzeigen", "Nachrichten", "Aufgaben", "Kalender", "Vorräte"];
            sort.empty();
            _.each(sortItems, function(element){
                var el = {"lable":element},
                    container,
                    compiled = _.template($(checkboxTemplate).html());
                container = $(compiled(el));
                sort.append(container);
            });
        },
            
        _onCheckedChange = function(){
        },
        
        _loadMiddleBar = function(){        
            _renderInfoboard();
        },
            
        _createAddButton = function(){
            var but = document.createElement("button");
            but.innerHTML = "Neuer Eintrag";
            but.className = "button-newentry";
            but.onclick = function(){
                _newInfoEntry();
            };
            left.prepend(but);
        },
    
        _newInfoEntry = function(){       
            var newEntry = {"onclickFunction": "$(Yourhome).trigger('submitInfoEntry')"},
                container,
                compiled = _.template($(newInfoTemplate).html());
            container = $(compiled(newEntry));
            middle.prepend(container);
            middle.find("textarea")[0].focus();           
        },
            
        _submitInfoEntry = function(){
            var TESTIMG = new Image(),
                input;
            input = middle.find("textarea")[0];
            TESTIMG.src = "res/assets/avatar.png";
            var infoboardEntry = {"feature":"inforboard",
                                  "user-img":TESTIMG,
                                  "input-text":input.value,
                                  "user-name":"Muster Maxmann",
                                 "date": "20.2.2015"};
            infoboard.unshift(infoboardEntry);
            $(Yourhome).trigger('infoboardChanged',{"infoboard":infoboard});
            _renderInfoboard();
        },
            
        _renderInfoboard = function(){
            middle.empty();
            _.each(infoboard, function(element){
                middle.append(_infoContainer(element));
            });
        },
        
        _infoContainer = function(element){
            var el = {"inputText":element["input-text"],
                      "inputUser":element["user-name"],
                      "inputDate":element["date"],
                      "imgSrc":element["user-img"].src
                     },
                container,
                compiled = _.template($(infoboardTemplate).html());
            container = $(compiled(el));
            return container;
        };

    that.init = init;


    return that;
})();