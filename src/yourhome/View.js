Yourhome.View = (function () {
    var that = {},
        left,
        middle,
        infoTemplate,
        checkboxTemplate,
        infoboard = [];

        init = function () {
            infoTemplate = document.getElementById('infoboardTemplate');
            checkboxTemplate = document.getElementById('checkboxTemplate');
            left = $('#steuerunglinks');
            middle = $('#steuerungmitte');
            _loadSortItems();
            _loadInfoboard();
            return that;
        },
            
        _loadSortItems = function(){
            var sort = left.find("#sort-options"),
                sortItems = ["Alle anzeigen", "Nachrichten", "Aufgaben", "Kalender", "Vorräte"];
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
        
        _loadInfoboard = function(){
            _createAddButton();          
            _renderInfoboard();
        },
            
        _createAddButton = function(){
            var but = document.createElement("button");
            but.innerHTML = "Neuer Eintrag";
            but.onclick = function(){
                _newInfoEntry();
            };
            left.append(but);
        },
    
        _newInfoEntry = function(){
            var entry = document.createElement("div"),
                submit = document.createElement("button"),
                input = document.createElement("input");
            submit.innerHTML = "OK";
            input.autofocus = "true";
            input.className = "Infoboard-New-Entry";
            submit.onclick = function(){
                _submitInfoEntry(input);
            };
            entry.appendChild(input);
            entry.appendChild(submit);
            middle.append(entry);
            
        },
            
        _submitInfoEntry = function(input){    
            var TESTIMG = new Image();
            TESTIMG.src = "res/assets/avatar.png";
            var infoboardEntry = {"feature":"inforboard",
                                  "user-img":TESTIMG,
                                  "input-text":input.value,
                                  "user-name":"Muster Maxmann",
                                 "date": "20.2.2015"};
            infoboard.push(infoboardEntry);
            
            $('body').trigger('infoboardChanged',{"infoboard":infoboard});
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