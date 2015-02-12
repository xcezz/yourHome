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
        
        _getSortList = function(feature){
            var sortList = {
                "infoboard":[{title:"Alles anzeigen", option:"all"},
                             {title:"Nachrichten", option:"infoboard"},
                             {title:"Aufgaben", option:"tasks"},
                             {title:"Kalender", option:"calendar"},
                             {title:"Vorräte", option:"stock"}],
                "account":[{title:"Alles anzeigen", option:"all"},
                             {title:"Bezahlt", option:"done"},
                             {title:"Nicht bezahlt", option:"notDone"}],
                "stock":[{title:"Alles anzeigen", option:"all"},
                             {title:"Vorhanden", option:"inStock"},
                             {title:"Nicht vorhanden", option:"notInStock"}],
                "tasks":[{title:"Alles anzeigen", option:"all"},
                             {title:"Eigene", option:"private"},
                             {title:"Nicht eigene", option:"notPrivate"},
                             {title:"Erledigte", option:"done"},
                             {title:"Nicht erledigte", option:"notDone"}]
            };
            return sortList[feature];
        };

    that.getShortInfo = _getShortInfo;
    that.getSortList = _getSortList;
    that.today = _today;

    return that;

})();