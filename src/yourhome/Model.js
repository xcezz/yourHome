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
            
            $(Yourhome).on('middleContentRemoved', function(event, data){
                homedata[data.feature].middle = Helper.clone(data.middle);
                homedata[data.feature].right = Helper.clone(data.right);
                $(Yourhome).trigger('rightUpdated', _updateRenderdata());
            });
            
            $(Yourhome).on('elementStateChange', function(event, data){
                var entry = Helper.clone(data);
                _.findWhere(homedata[entry.feature].middle,{"input-text":data["input-text"]}).done = data.done;
                entry["input-text"] += Helper.getStateMessage(entry.feature, entry.done);
                entry["user-name"] = document.getElementById(data.feature).innerHTML;
                homedata.infoboard.middle.unshift(entry);
                if(!data.done){
                    homedata[entry.feature].right.push(data["input-text"]);
                }else homedata[entry.feature].right = _.without(homedata[entry.feature].right, data["input-text"]);
                $(Yourhome).trigger('rightUpdated', _updateRenderdata());
            });
            
            
            $(Yourhome).on('middleContentChanged',function(event, data){
                _addSortOptions(data);
                homedata[data.feature] = Helper.clone(data.renderdata);
                if(data.feature = "calendar"){
                    var todayevents = Helper.getTodaysEvents([data.entry]);
                    _.each(todayevents, function(element){
                        homedata[data.feature].right.push({"text":element.title+"<br>"+element.info+"</br>", id:element.id});
                    });
                }
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
                TESTIMG.src = "res/assets/calendar.png";
                var infoboardEntry = {
                        "feature":data.feature,
                        "user-img":TESTIMG.src,
                        "input-text":data.entry.title + new Date(data.entry.start),
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
        
        _addSortOptions = function(data){
            if(data.feature === "tasks"){
                data.entry.notDone = !(data.entry.done);
                data.entry.private = false;
                data.entry.notPrivate = !(data.entry.private);
            }
            if(data.feature === "stock"){
                data.entry.inStock = data.entry.done;
                data.entry.notInStock = !(data.entry.inStock);
            }
            if(data.feature === "account"){
                data.entry.notDone = !(data.entry.done);
            }
        },
        
        _updateRenderdata = function(){
            var data = Helper.clone(homedata);
            _.each(data, function(element){
                _.each(element.left, function(sortOption){
                    if(!sortOption.checked){
                        if(data[element.feature]==="infoboard"){
                            data[element.feature].middle = _.difference(element.middle,_.where(element.middle, {"feature":sortOption.option}));
                        }else{
                            var op = sortOption.option,
                                properties = {};
                            properties[op] = true;
                            data[element.feature].middle = _.difference(element.middle,_.where(element.middle, properties));
                        }
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