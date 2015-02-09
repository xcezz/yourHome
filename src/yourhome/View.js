Yourhome.View = (function () {
    var that = {},
        left,
        middle,
        infoboard = [];

        init = function () {
            left = $('#left-area');
            middle = $('#middle-area');
            _loadInfoboard();
            return that;
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
            submit.onclick = function(){
                _submitInfoEntry(input);
            };
            entry.appendChild(submit);
            entry.appendChild(input);
            middle.append(entry);
            
        },
            
        _submitInfoEntry = function(input){
            infoboard.push(input.value);
            _renderInfoboard();
        },
            
        _renderInfoboard = function(){
            middle.empty();
            _.each(infoboard, function(element){
                middle.append(_infoContainer(element));
            });
        },
        
        _infoContainer = function(element){
            var container = document.createElement("div");
            container.className = "infoboard-entry";
            container.innerHTML = element;
            return container;
        };

    that.init = init;


    return that;
})();