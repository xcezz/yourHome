Yourhome.View = (function () {
    var that = {},
        left,
        middle,
        right,
        infoTemplate,
        newInfoTemplate,
        checkboxTemplate,
        newStockTemplate,
        stockTemplate,
        renderdata,
        calendar,

        init = function () {
            _initElements();
            _initEvents();
            return that;
        },
        
        _initElements = function(){
            infoTemplate = document.getElementById('infoboardTemplate');
            checkboxTemplate = document.getElementById('checkboxTemplate');
            newInfoTemplate = document.getElementById('newInfoboardEntryTemplate');
            newStockTemplate = document.getElementById('newStockEntryTemplate');
            stockTemplate = document.getElementById('stockTemplate');
            left = $('#steuerunglinks');
            middle = $('#steuerungmitte');
            right = $('#steuerungrechts');
            _createCalendar();
           
        },
                    
        _initEvents = function(){
            $(Yourhome).on('submitInfoEntry',_submitInfoEntry);
            $(Yourhome).on('render', function(event,data){
                renderdata = data;
                _render();
            });
            $(Yourhome).on('submitStockEntry', _submitStockEntry);
        },
        
        _render = function(){
            _renderLeftBar();
            _renderMiddleBar();
            _renderRightBar();
        },
        
        _renderMiddleBar = function(){
            middle.empty();
            if(renderdata.feature=="calendar"){
                middle.append(calendar);
                calendar.innerHTML = "";
                _getCalendar();
            }
            if(renderdata.feature=="infoboard"){
                _.each(renderdata.middle, function(element){
                middle.append(_infoContainer(element));
            });
            }
            if(renderdata.feature=="stock"){
                _.each(renderdata.middle, function(element){
                    middle.append(_stockContainer(element));
                });
            }
        },
        
        _getCalendar = function(){
            $(calendar).fullCalendar({
                dayClick: function(date, allDay, jsEvent, view){
                    var calendarEntry = {title:"Neuer Eintrag", start: date, allDay:true, info:date};
                    $(calendar).fullCalendar('renderEvent', calendarEntry, true);
                    renderdata.middle.push(calendarEntry);
                    $(Yourhome).trigger('newCalendarEntry',{"feature":renderdata.feature,"entry":calendarEntry});
                    $(Yourhome).trigger('middleContentChanged',{"feature":renderdata.feature,"entry":calendarEntry});
                },
    
                eventClick: function(calEvent, jsEvent, view) {
                    renderdata.right.push(calEvent.title+"<br>"+calEvent.info+"</br>");
                    _renderRightBar();
                }
            });
            _.each(renderdata.middle, function(element){
                $(calendar).fullCalendar('renderEvent', {title:element.title, start: element.start, allDay:element.allDay, info:element.info}, true);
            });
        },
        
        _createCalendar = function(){
            calendar = document.createElement("div");
            calendar.id = "calendarMiddle";
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
                var el = {"lable":element.title,
                         "option":element.option},
                    container,
                    compiled = _.template($(checkboxTemplate).html());
                container = $(compiled(el));
                var checkbox = container.find('input')[0];
                checkbox.checked = element.checked;
                container.on('change',function(){
                    $(Yourhome).trigger('sortBoxChange',{"feature":renderdata.feature, 
                                                         "option":container.attr('option'), 
                                                         "checked":checkbox.checked
                                                        }
                                       );
                    _render();
                });
                sort.append(container);
            });
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
                if(renderdata.feature=="infoboard"){
                    _newInfoEntry();
                }
                if(renderdata.feature=="stock"){
                    _newStockEntry();
                }
            };
            left.prepend(but);
        },
        _newStockEntry = function(){       
            var newEntry = {"onclickFunction": "$(Yourhome).trigger('submitStockEntry')"},
                container,
                compiled = _.template($(newStockTemplate).html());
            container = $(compiled(newEntry));
            middle.prepend(container);         
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
            var infoboardEntry = {"feature":"infoboard",
                                  "user-img":TESTIMG.src,
                                  "input-text":input.value,
                                  "user-name":"Muster Maxmann",
                                 "date": today};
            $(Yourhome).trigger('middleContentChanged',{"feature":renderdata.feature,"entry":infoboardEntry});
        },
            
        _submitStockEntry = function(){
            var item = middle.find('input')[0],
                stockEntry = {"feature":"stock",
                                "item":item.value};
            $(Yourhome).trigger('middleContentChanged',{"feature":renderdata.feature,"entry":stockEntry});
        },
        
        _infoContainer = function(element){
            var el = {"inputText":element["input-text"],
                      "inputUser":element["user-name"],
                      "inputDate":element["date"],
                      "imgSrc":element["user-img"]
                     },
                container,
                compiled = _.template($(infoboardTemplate).html());
            container = $(compiled(el));
            return container;
        },
            
            _stockContainer = function(element){
            var el = {"item":element["item"]
                     },
                container,
                compiled = _.template($(stockTemplate).html());
            container = $(compiled(el));
            return container;
        };

    that.init = init;


    return that;
})();