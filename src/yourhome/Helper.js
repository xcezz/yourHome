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
                "infoboard":["Alles anzeigen", "Nachrichten", "Aufgaben", "Kalender", "Vorräte"],
                "calendar":["Alles anzeigen", "Eigene", "Gemeinschaft"],
                "account":["Alles anzeigen", "Bezahlt", "Nicht bezahlt"],
                "stock":["Alles anzeigen", "Vorhanden", "Nicht Vorhanden"],
                "tasks":["Alles anzeigen", "Eigene", "Nicht eigene", "Erledigte", "Nicht erledigte"]
            };
            return sortList[feature];
        };

    that.getShortInfo = _getShortInfo;
    that.getSortList = _getSortList;
    that.today = _today;

    return that;

})();