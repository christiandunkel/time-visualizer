"use strict";var _={id:function(e){return _.isString(e)?document.getElementById(e):(console.error("No valid selector given."),null)},class:function(e,t){return _.isString(e)?_.isDefined(t)&&null==t?(console.error("No valid element provided as context (parent of some order). This parameter is optional and may remain empty."),null):(t||document).getElementsByClassName(e):(console.error("No valid selector given."),null)},tag:function(e,t){return _.isString(e)?_.isDefined(t)&&null==t?(console.error("No valid element provided as context (parent of some order). This parameter is optional and may remain empty."),null):(t||document).getElementsByTagName(e):(console.error("No valid selector given."),null)},select:function(e,t,n){if(!_.isString(e))return console.error("No valid selector given."),null;if(_.isDefined(t)&&null==t)return console.error("No valid element provided as context (parent of some order). This parameter is optional and may remain empty."),null;if("getElementById"in t||(t=document),/^(#?[\w\-]+|\.[\w\-\.]+)$/.test(e))switch(e.charAt(0)){case"#":return[t.getElementById(e.substr(1))];case".":return t.getElementsByClassName(e.substr(1).replace(/\./g," "));default:return t.getElementsByTagName(e)}if(t.querySelectorAll)return t.querySelectorAll(e);_.isFunction(n)&&n()},contains:function(e,t){return _.exists(e)?_.exists(t)?e!=t&&e.contains(t):(console.error("No valid child element given."),null):(console.error("No valid parent element given."),null)},exists:function(e,t){return!0!==t&&(t=!1),!_.isUndefined(e)&&null!==e&&(!0!==t||document.body.contains(e))},create:function(e,t){if(!_.isString(e))return console.error("No string given.");if(_.isDefined(t)&&!_.isObject(t))return console.error("No valid settings object was provided.");var n=e.match(/#[^\.#\s]+/g),i=e.match(/\.[^#\s\.]+/g),a=document.createElement(e.replace(/#[^\.#\s]+|\.[^#\s]+|\s/g,""));if(n&&(a.id=n[0].replace(/#/,"")),i&&(a.className=i.join(" ").replace(/\./g,"")),_.isDefined(t))if(_.isObject(t)){for(var r in t)if(t.hasOwnProperty(r))switch(r){case"innerHTML":a.innerHTML=t[r];break;case"style":for(var o in t[r])a.style.setProperty(o,t[r][o]);break;default:a.setAttribute(r,t[r])}}else console.error("Given settings object is not valid.");return a},append:function(e,t){return _.exists(e)?_.isUndefined(t)?console.error("Second given parameter is neither an element, text or a number."):((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.appendChild(t)):console.error("First given element does not exist.")},prepend:function(e,t){return _.exists(e)?_.isUndefined(t)?console.error("Second given parameter is neither an element, text or a number."):((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.insertBefore(t,e.childNodes[0])):console.error("First given element does not exist.")},after:function(e,t){return _.exists(e)?_.isUndefined(t)?console.error("Second given parameter is neither an element, text or a number."):((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.parentNode.insertBefore(t,e.nextSibling)):console.error("First given element does not exist.")},before:function(e,t){return _.exists(e)?_.isUndefined(t)?console.error("Second given parameter is neither an element, text or a number."):((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.insertBefore(t,e)):console.error("First given element does not exist.")},remove:function(e){_.exists(e)||e.parentNode.removeChild(e)},empty:function(e){if(!_.exists(e))return console.error("Element does not exist.");e.innerHTML=""},addEvent:function(e,t,n,i){return _.exists(e)?_.isString(t)?_.isFunction(n)?(!0!==i&&(i=!1),void("addEventListener"in e?e.addEventListener(t,n,i):e.attachEvent("on"+t,n))):console.error("No function was given."):console.error("No event name was given."):console.error("Element does not exist.")},removeEvent:function(e,t,n,i){return _.exists(e)?_.isString(t)?_.isFunction(n)?(!0!==i&&(i=!1),void("removeEventListener"in e?e.removeEventListener(t,n,i):e.detachEvent("on"+t,n))):console.error("No function was given."):console.error("No event name was given."):console.error("Element does not exist.")},addClick:function(e,t,n){_.addEvent(e,"click",t,n)},removeClick:function(e,t,n){_.removeEvent(e,"click",t,n)},target:function(e){return _.exists(e)?e.target||e.srcElement:console.error("Element does not exist.")},preventDefault:function(e){e.preventDefault(),e.stopPropagation()},addClass:function(e,t){return _.exists(e)?_.isString(t)?void("classList"in e?e.classList.add(t):-1==e.className.split(" ").indexOf(t)&&(e.className+=" "+t)):console.error("No class name was given."):console.error("Element does not exist.")},removeClass:function(e,t){return _.exists(e)?_.isString(t)?void("classList"in e?e.classList.remove(t):e.className=e.className.replace(new RegExp("\b"+_.escapeRegex(t)+"\b","g")," ")):console.error("No class name was given."):console.error("Element does not exist.")},toggleClass:function(e,t){return _.exists(e)?_.isString(t)?void(_.hasClass(e,t)?_.removeClass(e,t):_.addClass(e,t)):console.error("No class name was given."):console.error("Element does not exist.")},hasClass:function(e,t){return _.exists(e)?_.isString(t)?"classList"in e?e.classList.contains(t):-1!=e.className.split(" ").indexOf(t):console.error("No class name was given."):console.error("Element does not exist.")},getStyle:function(e,t){return _.exists(e)?_.isString(t)?"getComputedStyle"in window?window.getComputedStyle(e,null).getPropertyValue(t):"currentStyle"in e?e.currentStyle[t]:void 0:console.error("Given style is not a string."):console.error("Element is not defined.")},setStyles:function(e,t){if(!_.exists(e))return console.error("Element is not defined.");if(_.isDefined(t)&&!_.isObject(t))return console.error("No valid styles object was provided.");for(var n in t)e.style.setProperty(n,t[n])},getHeight:function(e){if(!_.exists(e))return console.error("Element is not defined.");var t=e.getBoundingClientRect();return t.bottom-t.top},getWidth:function(e){if(!_.exists(e))return console.error("Element is not defined.");var t=e.getBoundingClientRect();return t.right-t.left},isFunction:function(e){return"function"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isArray:function(e){return _.isDefined(e)&&null!==e&&e.constructor===Array},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isInteger:function(e){return"number"==typeof e&&e%1==0},isFloat:function(e){return"number"==typeof e&&e%1!=0},isDefined:function(e){return void 0!==e},isUndefined:function(e){return void 0===e},escapeRegex:function(e){return _.isString(class_)?(""+e).replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\\/\-]/g,"\\$&"):console.error("No string was given.")},encodeHTML:function(e){return _.isString(e)?(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):console.error("No string was given.")},decodeHTML:function(e){return _.isString(class_)?(""+e).replace(/\&amp\;/g,"&").replace(/\&lt\;/g,"<").replace(/\&gt\;/g,">").replace(/\&quot\;/g,'"').replace(/\&#039\;/g,"'"):console.error("No string was given.")},parseJSON:function(e){if(!_.isString(e))return console.error("No string was given.");var t=null;try{t=JSON.parse(e)}catch(e){console.error("Could not parse the given string as JSON, because of a "+e)}return t},sortObject:function(e,n,t){return t?e.sort(function(e,t){return e[n]<t[n]?1:-1}):e.sort(function(e,t){return e[n]>t[n]?1:-1})},getAverage:function(e){for(var t=0,n=e.length,i=0;i<n;i++)t+=e[i];return t/n},getMin:function(e,t){for(var n=_.isNumber(t)?t:Number.MAX_VALUE,i=e.length,a=0;a<i;a++){var r=e[a];r<n&&(n=r)}return n},getMax:function(e,t){for(var n=_.isNumber(t)?t:Number.MIN_VALUE,i=e.length,a=0;a<i;a++){var r=e[a];n<r&&(n=r)}return n},removeArrayIndex:function(e,t){for(var n=e.length,i=t;i<n-1;i++)e[i]=e[i+1];return e.pop(),e},limitNumber:function(e,t,n){return e<t?e=t:n<e&&(e=n),e}},NODE={html:_.tag("html")[0],head:_.tag("head")[0],body:_.tag("body")[0],data_load_btn:_.id("load-data"),darkmode_btn:_.id("toggle-darkmode"),play_btn:_.id("play-button"),pause_btn:_.id("pause-button"),stop_btn:_.id("stop-button"),time_selection:{container_1:_.id("pre-defined-speed"),container_2:_.id("custom-speed"),input:_.id("custom-speed-input"),custom:_.id("open-custom-speed-menu"),close_custom:_.id("close-custom-speed-menu")},time_btn:{slow:_.id("half-speed"),normal:_.id("normal-speed"),fast:_.id("double-speed")},data_load:{window:_.id("data-load-window"),close_btn:null,blur:null,drop_area:_.id("drop-area"),select_file_input:_.id("selected-file"),example_sets_area:_.id("example-set-area"),notice:_.id("file-reader-notice")},initializeDataLoadWindow:function(){var e=this.data_load;e.close_btn=_.class("close",e.window)[0],e.blur=_.class("blur",e.window)[0],delete this.initializeDataLoadWindow},compare_selection:{window:_.id("compare-selection-window"),close_btn:null,blur:null,unselected_keys:null,selected_keys:null},initializeCompareSelectionWindow:function(){var e=this.compare_selection;e.close_btn=_.class("close",e.window)[0],e.blur=_.class("blur",e.window)[0],e.unselected_keys=_.class("unselected-keys",e.window)[0],e.selected_keys=_.class("selected-keys",e.window)[0],delete this.initializeCompareSelectionWindow},chart_container_1:_.id("chart-container-1"),current_value:{container:_.id("data-set-current-value"),value:null,indicator:null},data_set_info:{title:null,date:null},column_chart:_.id("column-chart"),column_chart_total:_.id("ratio-total"),ratio_chart_container:_.id("ratio-chart"),ratio_chart:null,initializeColumnChart:function(){var e=_.id("data-set-info");this.data_set_info.title=_.class("title",e)[0],this.data_set_info.date=_.class("date",e)[0];var t=this.current_value;t.value=_.class("value",t.container)[0],t.indicator=_.class("indicator",t.container)[0],this.ratio_chart=_.tag("tr",this.ratio_chart_container)[0],delete this.initializeColumnChart},chart_container_2:_.id("chart-container-2"),individual_chart:_.id("individual-chart"),individual_chart_menu:_.id("individual-chart-menu"),back_to_column_chart_btn:_.id("close-individual-chart"),download_png_btn:_.id("download-chart-as-image"),compare_btn:_.id("compare-btn"),initialize:function(){this.initializeDataLoadWindow(),this.initializeColumnChart(),this.initializeCompareSelectionWindow(),delete this.initialize}},NAV={darkmode:!1,individual_chart_opened:!1,initialize:function(){_.addClick(NODE.data_load_btn,DATA_LOAD.open),_.addClick(NODE.darkmode_btn,this.toggleDarkMode),_.addClick(NODE.play_btn,ANIMATOR.play),_.addClick(NODE.pause_btn,ANIMATOR.pause),_.addClick(NODE.stop_btn,ANIMATOR.stop),_.addClick(NODE.time_btn.slow,NAV.setSpeed),_.addClick(NODE.time_btn.normal,NAV.setSpeed),_.addClick(NODE.time_btn.fast,NAV.setSpeed),_.addEvent(NODE.time_selection.input,"input",NAV.setCustomSpeed),_.addClick(NODE.time_selection.custom,NAV.showCustomSpeedMenu),_.addClick(NODE.time_selection.close_custom,NAV.showDefinedSpeedMenu),_.addClick(NODE.back_to_column_chart_btn,NAV.showColumnChart),_.addClick(NODE.download_png_btn,NAV.downloadIndividualChart),_.addClick(NODE.compare_btn,COMPARE.open)},toggleDarkMode:function(){NAV.darkmode=!NAV.darkmode,_[(NAV.darkmode?"add":"remove")+"Class"](NODE.html,"darkMode"),ANIMATOR.refreshFrame()},enableButton:function(e){_.addClass(e,"active"),e.setAttribute("aria-disabled","false"),e.setAttribute("originalTabIndex",e.getAttribute("tabIndex")),e.setAttribute("tabIndex","-1")},disableButton:function(e){_.removeClass(e,"active"),e.setAttribute("aria-disabled","true");var t=e.getAttribute("originalTabIndex");null==t&&(t=e.getAttribute("tabIndex"),e.setAttribute("originalTabIndex",t)),e.setAttribute("tabIndex",t)},onlyEnableButton:function(e){var t=NODE.time_btn;for(var n in t)t[n]===e?this.enableButton(t[n]):this.disableButton(t[n])},showColumnChart:function(){NAV.individual_chart_opened=!1,_.addClass(NODE.chart_container_1,"active"),_.removeClass(NODE.chart_container_2,"active"),ANIMATOR.refreshFrame()},showIndividualChart:function(){NAV.individual_chart_opened=!0,_.removeClass(NODE.chart_container_1,"active"),_.addClass(NODE.chart_container_2,"active"),ANIMATOR.refreshFrame()},setSpeed:function(e){var t=_.target(e);if(!_.hasClass(t,"active")){NAV.onlyEnableButton(t);var n=1;switch(t.id){case"half-speed":n=.5;break;case"double-speed":n=2}ANIMATOR.setTime(n)}},setCustomSpeed:function(e){var t=_.target(e),n=t.value;n.match(/[,]+/)&&(n=n.replace(/[,]+/,"."),t.value=n),n.match(/[^0-9\.]+/)&&(n=n.replace(/[^0-9\.]+/,""),t.value=n),n.match(/^([0-9]+|[0-9]+\.[0-9]+)$/)?((n=parseFloat(n))%1!=0&&(n=n.toFixed(1)),n=_.limitNumber(n,.1,4),_.addClass(t,"correct-speed"),ANIMATOR.setTime(n),(n+="")!=t.value&&(t.value=n)):_.removeClass(t,"correct-speed")},showCustomSpeedMenu:function(){_.removeClass(NODE.time_selection.container_1,"active"),_.addClass(NODE.time_selection.container_2,"active");var e=NODE.time_selection.input;e.value=ANIMATOR.time+"",_.addClass(e,"correct-speed")},showDefinedSpeedMenu:function(){_.addClass(NODE.time_selection.container_1,"active"),_.removeClass(NODE.time_selection.container_2,"active");var e=0;e=_.hasClass(NODE.time_btn.slow,"active")?.5:_.hasClass(NODE.time_btn.normal,"active")?1:2,ANIMATOR.setTime(e)},downloadIndividualChart:function(){var e=NODE.individual_chart.toDataURL("image/png"),t=new Date,n=t.getDate(),i=t.getMonth()+1,a=(9<n?"":"0")+n+"-"+(9<i?"":"0")+i+"-"+t.getFullYear()+" "+t.getHours()+"-"+t.getMinutes()+"-"+t.getSeconds(),r="chart "+ANIMATOR.individual_chart_keys[0].replace(/[^a-z0-9\-\_]/g,"")+" "+a+".png",o=_.create("a",{download:r,href:e});_.append(NODE.body,o),o.click(),_.remove(o)}},DATA_LOAD={initialize:function(){var e=NODE.data_load;_.addClick(e.blur,this.close),_.addClick(e.close_btn,this.close);for(var t=_.tag("button",e.example_sets_area),n=t.length,i=0;i<n;i++)_.addClick(t[i],this.startDataSetLoading);this.initializeDropArea()},open:function(){_.addClass(NODE.data_load.window,"visible"),setTimeout(function(){NODE.data_load.close_btn.focus()},100)},close:function(){_.removeClass(NODE.data_load.window,"visible"),_.removeClass(NODE.data_load.window,"file-selected"),NODE.data_load_btn.focus()},initializeDropArea:function(){var e=NODE.data_load;"function"!=typeof window.FileReader&&_.addClass(e.notice,"show"),_.addEvent(e.drop_area,"dragenter",_.preventDefault),_.addEvent(e.drop_area,"dragover",_.preventDefault),_.addEvent(e.drop_area,"dragleave",_.preventDefault),_.addEvent(e.drop_area,"drop",_.preventDefault),_.addEvent(e.drop_area,"dragenter",this.highlightDropArea),_.addEvent(e.drop_area,"dragover",this.highlightDropArea),_.addEvent(e.drop_area,"dragleave",this.unhighlightDropArea),_.addEvent(e.drop_area,"drop",this.unhighlightDropArea),_.addEvent(e.drop_area,"drop",this.handleDroppedFile),_.addEvent(e.select_file_input,"change",this.handleSelectedFile)},highlightDropArea:function(){_.addClass($.drop_area,"dragged-over")},unhighlightDropArea:function(){_.removeClass($.drop_area,"dragged-over")},handleDroppedFile:function(e){_.preventDefault(e);var t=null;if(e.dataTransfer.items){if(1<(n=e.dataTransfer.items).length)return void alert("Dropping multiple files is forbidden.");if("file"!==n[0].kind)return void alert("Please drop a file.");t=n[0].getAsFile()}else{var n;if(1<(n=e.dataTransfer.files).length)return void alert("Dropping multiple files is forbidden.");t=n[0]}DATA_LOAD.processFile(t)},handleSelectedFile:function(e){var t=this.files[0];DATA_LOAD.processFile(t)},processFile:function(e){if("function"==typeof window.FileReader)if(e)if(/\.(json|txt)$/.test(e.name)){if(!(1e4<e.size)||confirm("This data set is large ("+e.size/1e3+"KB) and may freeze your tab momentarily. Do you want to continue?")){var t=new FileReader;t.readAsText(e,"UTF-8"),t.onerror=function(e){alert("File could not be read.")},t.onload=function(e){DATA_LOAD.parseJSON(_.target(e).result)}}}else alert("Only .json and .txt files are allowed.");else console.error("File is not defined.");else alert("The FileReader API is not supported by your browser. Please update your browser or switch to a different one!")},parseJSON:function(e){var t=_.parseJSON(e);if(!t)return alert("Could not parse the file as it is not in a valid JSON format.\nCheck your browser console for more information."),!1;DATA_LOAD.visualizeObject(t,!0)},startDataSetLoading:function(e){var t="data/"+_.target(e).getAttribute("load-data")+".json";DATA_LOAD.loadHttpDataSet(t,!0)},loadHttpDataSet:function(e,i){var a=new XMLHttpRequest;return a.open("GET",e),a.send(),a.onreadystatechange=function(e){if(4===a.readyState&&200===a.status){var t=a.responseText;if(null!=t&&""!=t){var n=_.parseJSON(t);DATA_LOAD.visualizeObject(n,i)}}},a},visualizeObject:function(e,t){_.removeClass(NODE.column_chart_total,"hidden"),_.removeClass(NODE.ratio_chart_container,"hidden");var n={},i={},a={},r=NODE.data_set_info;r.title.innerHTML=e.name,r.date.innerHTML=e.date,_.empty(NODE.column_chart),_.empty(NODE.ratio_chart);var o=0;for(var s in e.data){if(!e.data.hasOwnProperty(s))return;var l=this.getColumnColor(o);n[s]=this.generateDataPointArray(e.data[s],e.range.from,e.range.to);var d=this.getColumn(s,l,e.keys[s].name,e.keys[s].icon);_.append(NODE.column_chart,d),i[s]={container:d,name:e.keys[s].name,color:l,meter:_.class("meter",d)[0],value:_.class("value",d)[0],start_order:o},_.addClick(_.class("clickEvent",d)[0],this.openIndividualChart);var c=this.getRatioChartPart(s,l,n[s],e.keys[s].name,e.keys[s].icon);_.append(NODE.ratio_chart,c),a[s]={container:c,percentage:_.class("percentage",c)[0],tooltip:_.class("tooltip",c)[0],tooltip_percentage:_.class("tooltip-percentage",c)[0]},_.addClick(_.class("clickEvent",c)[0],this.openIndividualChart),o++}ANIMATOR.setRange(e.range.from,e.range.to),ANIMATOR.setData(n),ANIMATOR.setColumns(i),ANIMATOR.setRatioParts(a),ANIMATOR.setCSSTransitions(),ANIMATOR.end(),ANIMATOR.refreshFrame(),_.removeClass(NODE.current_value.container,"hidden"),NAV.showColumnChart(),!0===t&&_.addClass(NODE.data_load.window,"file-selected")},openIndividualChart:function(e){var t=_.target(e).getAttribute("column-id");ANIMATOR.setInvidualChartKeys([t]),NAV.showIndividualChart()},getRatioChartPart:function(e,t,n,i,a){var r=_.create("td.part-container",{style:{"background-color":t}}),o=_.create("button.clickEvent",{title:"Open statistics for "+i,"column-id":e}),s=_.create("div.icon",{style:{"background-image":"url("+(_.isString(a)?_.encodeHTML(a):"")+")"}}),l=_.create("div.tooltip"),d=_.create("div.name",{innerHTML:i}),c=_.getAverage(n),u=_.getMin(n),m=_.getMax(n),p=_.create("div.description",{innerHTML:"<b>Avg:</b> "+ANIMATOR.formatNumber(c)+"<br><b>Min:</b> "+ANIMATOR.formatNumber(u)+"<br><b>Max:</b> "+ANIMATOR.formatNumber(m)}),f=_.create("div.tooltip-percentage"),v=_.create("div.percentage");return _.append(l,s),_.append(l,f),_.append(l,d),_.append(l,p),_.append(r,l),_.append(r,v),_.append(r,o),r},getColumn:function(e,t,n,i){var a=_.create("button.column-container"),r=_.create("div.clickEvent",{title:"Open statistics for "+n,"column-id":e}),o=_.create("div.icon",{style:{"background-image":"url("+(_.isString(i)?_.encodeHTML(i):"")+")"}}),s=_.create("div.column"),l=_.create("div.meter",{style:{"background-color":t}}),d=_.create("div.name",{innerHTML:n}),c=_.create("div.value");return _.append(l,d),_.append(l,c),_.append(s,l),_.append(a,o),_.append(a,s),_.append(a,r),a},getColumnColor:function(e){var t=["#099b9b","#a52a2a","#9f8605","#556b2f","#8b008b","#1616ad","#bf775f","#888236","#5ebf5e","#9932cc","#3f238d","#800000","#a2651b","#808000","#800080"];return t[e%t.length]},generateDataPointArray:function(e,t,n){function i(e){if(!_.isNumber(e))throw'Error: Value "'+o+'" for key "'+r+'" in JSON must be a number, but is a "'+typeof o+'".'}for(var a=[],r=t;r<=n;r++)if(_.exists(e[r+""])&&_.isNumber(e[r+""])){var o=e[r+""];if(i(o),!_.isNumber(o))throw'Error: Value "'+o+'" for key "'+r+'" in JSON must be a number, but is a "'+typeof o+'".';a[a.length]=o}else if(r!=t){for(var s=a[a.length-1],l=null,d=0,c=r+1;c<=n;c++)if(d++,_.exists(e[c+""])){i(l=e[c+""]);break}var u=s+(l-s)/(1+d);a[a.length]=null==l?s:u}else a[a.length]=0;var m=[],p=a.length;for(r=0;r<p;r++){var f=a[r];if(m[m.length]=f,r==p-1)break;var v=((l=a[r+1])-f)/100;for(c=2;c<=98;c+=2){var h=f+c*v;m[m.length]=h}}return m}},COMPARE={initialize:function(){_.addClick(NODE.compare_btn,this.open),_.addClick(NODE.compare_selection.blur,this.close),_.addClick(NODE.compare_selection.close_btn,this.close)},open:function(){_.addClass(NODE.compare_selection.window,"visible"),_.empty(NODE.compare_selection.unselected_keys),_.empty(NODE.compare_selection.selected_keys),COMPARE.loadKeys(),setTimeout(function(){NODE.compare_selection.close_btn.focus()},100)},close:function(){_.removeClass(NODE.compare_selection.window,"visible"),NODE.compare_btn.focus()},moveKey:function(e){var t=_.target(e),n=t.getAttribute("key-id"),i=!1;_.hasClass(t.parentElement,"unselected-keys")&&(i=!0),i?ANIMATOR.addIndividualKey(n):ANIMATOR.removeIndividualKey(n),COMPARE.loadKeys()},loadKeys:function(){for(var e in _.empty(NODE.compare_selection.selected_keys),_.empty(NODE.compare_selection.unselected_keys),ANIMATOR.data){for(var t=!1,n=ANIMATOR.individual_chart_keys.length,i=0;i<n;i++)if(ANIMATOR.individual_chart_keys[i]===e){t=!0;break}var a=_.create("button.comparison-key",{"key-id":e,innerHTML:ANIMATOR.columns[e].name,style:{background:ANIMATOR.columns[e].color}});_.addClick(a,COMPARE.moveKey),_.append(NODE.compare_selection[(t?"":"un")+"selected_keys"],a)}ANIMATOR.refreshFrame()}},ANIMATOR={is_running:!1,time:1,from:0,to:0,current:0,loop:null,data:{},columns:{},column_num:0,pixels_between_columns:52,ratio_parts:{},ratio_parts_num:0,individual_chart_keys:[],initialize:function(){_.addEvent(window,"resize",function(){NAV.individual_chart_opened&&ANIMATOR.refreshFrame()})},setRange:function(e,t){this.from=e,this.to=t,this.current=0},setTime:function(e){this.time=e,this.is_running&&(this.stopLoop(),this.startLoop()),this.setCSSTransitions()},setCSSTransitions:function(){var e=1/this.time/5+"s";for(var t in this.columns)_.setStyles(this.columns[t].meter,{transition:e});for(var n in this.ratio_parts)_.setStyles(this.ratio_parts[n].container,{transition:e});_.setStyles(NODE.current_value.indicator,{transition:e})},setData:function(e){this.data=e;var t=Object.keys(e)[0];this.data_point_num=e[t].length},setColumns:function(e){this.columns=e,this.column_num=Object.keys(e).length},setRatioParts:function(e){this.ratio_parts=e,this.ratio_parts_num=Object.keys(e).length},setInvidualChartKeys:function(e){this.individual_chart_keys=e},addIndividualKey:function(e){if(!this.hasIndividualKey()){var t=this.individual_chart_keys.length;this.individual_chart_keys[t]=e}},removeIndividualKey:function(e){for(var t=this.individual_chart_keys,n=t.length,i=[],a=0;a<n;a++)t[a]===e&&(i[i.length]=a);var r=i.length;for(a=0;a<r;a++)t=_.removeArrayIndex(t,i[a]);this.setInvidualChartKeys(t)},hasIndividualKey:function(e){for(var t=this.individual_chart_keys.length,n=t.length,i=0;i<n;i++)if(t[i]===e)return!0;return!1},startLoop:function(){var e=80/ANIMATOR.time;ANIMATOR.loop=setInterval(ANIMATOR.update,e)},stopLoop:function(){clearInterval(ANIMATOR.loop),ANIMATOR.loop=null},play:function(){ANIMATOR.is_running=!0,_.removeClass(NODE.html,"animation-paused"),_.addClass(NODE.html,"animation-playing"),ANIMATOR.startLoop()},pause:function(){ANIMATOR.is_running=!1,_.removeClass(NODE.html,"animation-playing"),_.addClass(NODE.html,"animation-paused"),ANIMATOR.stopLoop()},restart:function(){ANIMATOR.current=0},end:function(){ANIMATOR.is_running=!1,ANIMATOR.current=0,_.removeClass(NODE.html,"animation-playing"),_.addClass(NODE.html,"animation-paused"),ANIMATOR.stopLoop()},stop:function(){ANIMATOR.end(),ANIMATOR.update()},number_names:{Thousand:Math.pow(10,3),Million:Math.pow(10,6),Billion:Math.pow(10,9),Trillion:Math.pow(10,12),Quadrillion:Math.pow(10,15),Quintillion:Math.pow(10,18),Sextillion:Math.pow(10,21),Septillion:Math.pow(10,24),Octillion:Math.pow(10,27),Nonillion:Math.pow(10,30),Decillion:Math.pow(10,33),Undecillion:Math.pow(10,36),Duodecillion:Math.pow(10,39),Tredecillion:Math.pow(10,42),Quattuordecillion:Math.pow(10,45),Quindecillion:Math.pow(10,48),Sexdecillion:Math.pow(10,51),Septendecillion:Math.pow(10,54),Octodecillion:Math.pow(10,57),Novemdecillion:Math.pow(10,60),Vigintillion:Math.pow(10,63),"*10^66":Math.pow(10,66),"*10^69":Math.pow(10,69),"*10^72":Math.pow(10,72),"*10^75":Math.pow(10,75),"*10^78":Math.pow(10,78),"*10^81":Math.pow(10,81),"*10^84":Math.pow(10,84),"*10^87":Math.pow(10,87),"*10^90":Math.pow(10,90),"*10^93":Math.pow(10,93),"*10^96":Math.pow(10,96),"*10^99":Math.pow(10,99)},formatNumber:function(e){var t=e<0,n=t?"-":"";if(t&&(e*=-1),e<1e3)return n+e;for(var i in ANIMATOR.number_names){var a=ANIMATOR.number_names[i];if(a<=e&&e<1e3*a)return n+Number(e/a).toFixed(1)+" "+i}return n+"&infin;"},update:function(){null!=ANIMATOR.data&&(ANIMATOR.current>=ANIMATOR.data_point_num?ANIMATOR.end():(ANIMATOR.refreshFrame(),ANIMATOR.current++))},refreshFrame:function(){if(ANIMATOR.current%50==0){var e=parseInt(ANIMATOR.from)+(0==ANIMATOR.current?0:ANIMATOR.current/50);NODE.current_value.value.innerHTML=e,NODE.current_value.indicator.innerHTML=e}_.setStyles(NODE.current_value.indicator,{width:ANIMATOR.current%50*2+"%"}),NAV.individual_chart_opened?ANIMATOR.updateIndividualCharts():(ANIMATOR.updateColumnChart(),ANIMATOR.updateColumnRatioChart())},updateColumnChart:function(){var e=ANIMATOR,t=0,n=Number.MIN_VALUE,i=[];for(var a in e.data){var r=e.data[a][e.current];r<t&&(t=r),n<r&&(n=r),i[i.length]={key:a,value:r}}for(var a in e.data){var o=e.data[a][e.current];e.columns[a].value.innerHTML=e.formatNumber(o),_.setStyles(e.columns[a].meter,{width:(o-t)/(n-t)*100+"%"})}for(var s=_.sortObject(i,"value",!0),l=0;l<e.column_num;l++){var d=e.columns[s[l].key],c=(l-d.start_order)*e.pixels_between_columns;_.setStyles(d.container,{transform:"translate(0px, "+c+"px)"})}},updateColumnRatioChart:function(){var e=ANIMATOR,t=0;for(var n in e.data)t+=e.data[n][e.current];NODE.column_chart_total.innerHTML=ANIMATOR.formatNumber(t);var i=[];for(var n in e.data){var a=100/(t/e.data[n][e.current]);i[i.length]={key:n,value:a}}for(var r=_.sortObject(i,"value"),o=0;o<e.ratio_parts_num;o++){n=r[o].key,a=r[o].value;var s=e.ratio_parts[n];if(a<.2)_.addClass(s.container,"hidden");else{_.removeClass(s.container,"hidden"),_.append(NODE.ratio_chart,s.container),_.setStyles(s.container,{width:a+"%"});var l=a.toFixed(1);s.percentage.innerHTML=l+"%",s.tooltip_percentage.innerHTML=l+"%"}}},updateIndividualCharts:function(){var e=ANIMATOR,t=NODE.individual_chart,n=t.getContext("2d"),i=e.individual_chart_keys;if(null!=i){var a=e.individual_chart_keys.length;t.width=_.getWidth(NODE.individual_chart_menu),t.height=500+18*(a-1),n.clearRect(0,0,t.width,t.height);for(var r=0,o=Number.MIN_VALUE,s=0;s<a;s++)for(var l=0;l<e.data_point_num;l++){var d=i[s],c=e.data[d][l];c<r&&(r=c),o<c&&(o=c)}var u={top:5,left:5,bottom:80,right:5},m="12px Arial sans-serif",p=ANIMATOR.formatNumber(o)+"",f=ANIMATOR.formatNumber(r)+"";n.font=m;var v=n.measureText(p).width,h=n.measureText(f).width,g=v;g<h&&(g=h),u.right=u.right+g+15,u.bottom=u.bottom+18*a;for(s=0;s<2;s++)n.font=m,n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline=0==s?"top":"bottom",n.textAlign="left",n.fillText(0==s?p:f,t.width-u.right+5,0==s?u.top:t.height-u.bottom),n.stroke();var A=t.width-u.left-u.right,N=(e.data_point_num-1)/50+1;for(s=e.from;s<=e.to;s++){n.strokeStyle=NAV.darkmode?"#242424":"#ededed";var b=s==e.from?u.left:u.left+A*((s-e.from)/(N-1));n.moveTo(b,u.top),n.lineTo(b,t.height-u.bottom),n.stroke();var O=!1,y=s+"",M=n.measureText(y).width;if(100<M)return;35<M?O=!0:window.innerWidth<=550&&(O=!0),O&&e.from!=s&&e.to!=s||(n.font=m,n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline="bottom",n.textAlign=s==e.from?"left":s==e.to?"right":"center",n.fillText(y,b,t.height-u.bottom+20),n.stroke())}n.font="14px Arial sans-serif",n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline="middle",n.textAlign="left",n.fillText("Legend",u.left,t.height-u.bottom+50),n.stroke();for(s=0;s<a;s++){d=i[s];var w=e.columns[d].color;e.drawIndividualKey(t,n,u,w,r,o,e.data[d],d);var T=t.height-u.bottom+66+18*s;n.font="12px Arial sans-serif",n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline="top",n.textAlign="left",n.fillText(e.columns[d].name,u.left+20,T),n.stroke(),n.rect(u.left+4,T,10,10),n.fillStyle=w,n.fill(),n.stroke()}if(0!=e.current&&e.current!=e.data_point_num-1){n.strokeStyle="#e26565";var D=(e.current+1)/e.data_point_num;b=u.left+A*D;n.moveTo(b,u.top),n.lineTo(b,t.height-u.bottom),n.stroke()}}else t.width=0},drawIndividualKey:function(e,t,n,i,a,r,o,s){for(var l=e.width-n.left-n.right,d=e.height-n.top-n.bottom,c=[],u=0;u<=ANIMATOR.data_point_num;u+=50){var _=0;0<u&&(_=u/(ANIMATOR.data_point_num-1));var m=n.left+l*_,p=(o[u]-a)/(r-a)*100,f=e.height-n.bottom;f-=d/(100/p),c[c.length]={x:m,y:f}}var v=2*Math.PI;t.strokeStyle=i;for(u=0;u<c.length;u++){var h=c[u].x,g=c[u].y;if(t.beginPath(),t.arc(h,g,2,0,v),t.stroke(),u!=c.length-1){var A=c[u+1].x,N=c[u+1].y;t.moveTo(h,g),t.lineTo(A,N),t.stroke()}}}};_.addEvent(window,"load",function(){NODE.initialize(),NAV.initialize(),DATA_LOAD.initialize(),COMPARE.initialize(),ANIMATOR.initialize(),DATA_LOAD.loadHttpDataSet("data/example-data-set.json",!1).onerror=function(){var e=_.create("div.notice.red",{innerHTML:"<b>Loading the example data set failed.</b><br />Are you running this project locally on your system? Try using the <i>Load data</i> button."});_.append(NODE.column_chart,e);var t=_.create("div.notice.blue",{innerHTML:"You may currently run this project locally on your computer. This restricts you to only load local data set files. You can't load online examples.",style:{"margin-bottom":"20px"}});_.empty(NODE.data_load.example_sets_area),_.append(NODE.data_load.example_sets_area,t)}});