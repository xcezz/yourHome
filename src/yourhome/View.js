Yourhome.View = (function () {
    var that = {},
        left,
        middle,
        right,
        infoTemplate,
        newInfoTemplate,
        checkboxTemplate,
        renderdata,

        init = function () {
            infoTemplate = document.getElementById('infoboardTemplate');
            checkboxTemplate = document.getElementById('checkboxTemplate');
            newInfoTemplate = document.getElementById('newInfoboardEntryTemplate');
            left = $('#steuerunglinks');
            middle = $('#steuerungmitte');
            right = $('#steuerungrechts');
            _initEvents();
            return that;
        },
        
                    
        _initEvents = function(){
            $(Yourhome).on('submitInfoEntry',_submitInfoEntry);
            $(Yourhome).on('render', function(event,data){
                renderdata = data;
                _render();
            });
        },
        
        _render = function(){
            _renderLeftBar();
            _renderMiddleBar();
            _renderRightBar();
        },
        
        _renderMiddleBar = function(){
            middle.empty();
            _.each(renderdata.middle, function(element){
                middle.append(_infoContainer(element));
            });
        },
        
        _renderRightBar = function(){
            right.empty();
            var entry = "<p><b>" + _.first(renderdata.right) + "</b></p>";
            _.each(_.last(renderdata.right, _.size(renderdata.right)-1), function(element){
                entry += "<p>"+element+"<p>";
            });
            right.html(entry);
        },
        
        _renderLeftBar = function(){
            _createAddButton();
            var sort = left.find("#sort-options");
            sort.empty();
            _.each(renderdata.left, function(element){
                var el = {"lable":element},
                    container,
                    compiled = _.template($(checkboxTemplate).html());
                container = $(compiled(el));
                sort.append(container);
            });
        },

        _onCheckedChange = function(){
        },
        
        _createAddButton = function(){ 
            var old = left.find("button");
            if(old!=undefined){
                old.remove();
            }
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
                today = Helper.today(),
                input;
            input = middle.find("textarea")[0];
            TESTIMG.src = "res/assets/avatar.png";
            var infoboardEntry = {"feature":"inforboard",
                                  "user-img":TESTIMG,
                                  "input-text":input.value,
                                  "user-name":"Muster Maxmann",
                                 "date": today};
            renderdata.middle.unshift(infoboardEntry);
            $(Yourhome).trigger('middleContentChanged',{"feature":renderdata.feature,"middle":renderdata.middle});
            _renderMiddleBar();
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