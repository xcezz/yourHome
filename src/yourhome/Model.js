Yourhome.Model = (function () {
    var that = {},
        infoboard,
        calendar,
        account,
        stock,
        tasks,
        homedata = {
            "infoboard": infoboard,
            "calendar": calendar,
            "tasks": tasks,
            "account": account,
            "stock": stock
        },
        renderdata,

        init = function () {
            _.each(_.keys(homedata), function(element){
                homedata[element] = {
                    "feature": element, 
                    "right": Helper.getShortInfo(element), 
                    "middle":[],
                    "left": Helper.getSortList(element)
                };
            });
            _initEvents();
            renderdata = _updateRenderdata();
            $(Yourhome).trigger('render', renderdata.infoboard);
            return that;
        },
        
        _initEvents = function(){
            $(Yourhome).on('featureClicked', function(event, data){
                renderdata = _updateRenderdata();
                $(Yourhome).trigger('render', renderdata[data.feature]);
            });
            
            $(Yourhome).on('elementStateChange', function(event, data){
                var entry = Helper.clone(data);
                if(entry.rot){
                    entry["input-text"] += " leer";
                    entry["user-name"] = document.getElementById(data.feature).innerHTML;
                    homedata.infoboard.middle.unshift(entry);
                    homedata[entry.feature].right.push(data["input-text"]);
                }
                _.findWhere(homedata[entry.feature].middle,{"input-text":data["input-text"]}).rot = data.rot;
                $(Yourhome).trigger('rightUpdated', _updateRenderdata());
            });
            
            
            $(Yourhome).on('middleContentChanged',function(event, data){                
                homedata[data.feature].middle.unshift(data.entry);
                if(data.feature!="infoboard" && data.feature!="calendar"){
                    var entry = Helper.clone(data.entry);
                    entry["user-name"] = document.getElementById(data.feature).innerHTML;
                    homedata.infoboard.middle.unshift(entry);
                }
                renderdata = _updateRenderdata();
                $(Yourhome).trigger('render', renderdata[data.feature]);
            });
            
            $(Yourhome).on('newCalendarEntry',function(event, data){
                var TESTIMG = new Image();
                TESTIMG.src = "res/assets/avatar.png";
                var infoboardEntry = {
                        "feature":data.feature,
                        "user-img":TESTIMG.src,
                        "input-text":data.entry.title + new Date(data.entry.info),
                        "user-name":"Kalender Eintrag",
                        "date": Helper.today()};
                homedata.infoboard.middle.unshift(infoboardEntry);
                renderdata = _updateRenderdata();
            });
            
            $(Yourhome).on('sortBoxChange',function(event, element){
                _.each(homedata[element.feature].left,function(el){
                    if(el.option===element.option){
                        el.checked = element.checked;
                        if(el.option!="all"){
                            _uncheckAllOption(homedata[element.feature], element.checked);
                        }else{
                            _checkAll(homedata[element.feature], element.checked);
                        }
                    }
                });
                renderdata = _updateRenderdata();
                $(Yourhome).trigger('render', renderdata[element.feature]);
            });
        },
        
        _updateRenderdata = function(){
            var data = Helper.clone(homedata);
            _.each(data, function(element){
                _.each(element.left, function(sortOption){
                    if(!sortOption.checked){
                        data[element.feature].middle = _.difference(element.middle,_.where(element.middle, {"feature":sortOption.option}));
                    }
                });
            });
            return data;
        },
        
        _checkAll = function(feature, checked){
            if(checked){
                _.each(feature.left,function(element){
                    element.checked = true;
                });
            }
        },
        
        _uncheckAllOption = function(feature, checked){
            if(!checked){
                _.findWhere(feature.left, {option:"all"}).checked = false;
            }
        };

    that.init = init;


    return that;
})();