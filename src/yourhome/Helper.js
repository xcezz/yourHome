const Helper = (function () {
    var that = {},
        
        _today = function(){
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth()+1,
                yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd;
            } 

            if(mm<10) {
                mm='0'+mm;
            } 

            today = dd+'.'+mm+'.'+yyyy;
            return today;
        },
        
        _clone = function(homedata){
            var dataString,
                data;
            dataString = JSON.stringify(homedata);
            return JSON.parse(dataString);
        },
        
        _getShortInfo = function(feature){
            var shortInfo = {
                "infoboard":["Mitbewohner:", "Markus", "Christian"],
                "calendar":["Heute:"],
                "account":["Mein Konto:"],
                "stock":["Einkaufsliste:"],
                "tasks":["Besondere:", "Papiertonne: 11.02.2015"]
            };
            return shortInfo[feature];
        },
        
        _toggleTrue = function(boolean){
            if(boolean){
                return false;
            }else return true;
        },
        
        _getSortList = function(feature){
            var sortList = {
                "infoboard":[{title:"Alles anzeigen", option:"all", checked: true},
                             {title:"Nachrichten", option:"infoboard", checked: true},
                             {title:"Aufgaben", option:"tasks", checked: true},
                             {title:"Kalender", option:"calendar", checked: true},
                             {title:"Vorräte", option:"stock", checked: true}],
                "account":[{title:"Alles anzeigen", option:"all", checked: true},
                             {title:"Bezahlt", option:"done", checked: true},
                             {title:"Nicht bezahlt", option:"notDone", checked: true}],
                "stock":[{title:"Alles anzeigen", option:"all", checked: true},
                             {title:"Vorhanden", option:"inStock", checked: true},
                             {title:"Nicht vorhanden", option:"notInStock", checked: true}],
                "tasks":[{title:"Alles anzeigen", option:"all", checked: true},
                             {title:"Eigene", option:"private", checked: true},
                             {title:"Nicht eigene", option:"notPrivate", checked: true},
                             {title:"Erledigte", option:"done", checked: true},
                             {title:"Nicht erledigte", option:"notDone", checked: true}],
                "calendar":[{title:"Alles anzeigen", option:"all", checked: true},
                             {title:"Eigene", option:"private", checked: true},
                             {title:"Nicht eigene", option:"notPrivate", checked: true}]
            };
            return sortList[feature];
        };

    that.toggleTrue = _toggleTrue;
    that.clone = _clone;
    that.getShortInfo = _getShortInfo;
    that.getSortList = _getSortList;
    that.today = _today;

    return that;

})();