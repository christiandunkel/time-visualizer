"use strict";var _={id:function(e){return _.isString(e)?document.getElementById(e):(console.error("No valid selector given."),null)},class:function(e,t){return _.isString(e)?(void 0===t&&(t=document),_.isElement(t)?t.getElementsByClassName(e):(console.error("The context given is not a HTML element."),null)):(console.error("No valid selector given."),null)},tag:function(e,t){return _.isString(e)?(void 0===t&&(t=document),_.isElement(t)?t.getElementsByTagName(e):(console.error("The context given is not a HTML element."),null)):(console.error("No valid selector given."),null)},select:function(e,t,n){if(!_.isString(e))return console.error("No valid selector given."),null;if(void 0===t&&(t=document),!_.isElement(t))return console.error("The context given is not a HTML element."),null;if(/^(#?[\w\-]+|\.[\w\-\.]+)$/.test(e))switch(e.charAt(0)){case"#":return[t.getElementById(e.substr(1))];case".":return t.getElementsByClassName(e.substr(1).replace(/\./g," "));default:return t.getElementsByTagName(e)}if(t.querySelectorAll)return t.querySelectorAll(e);_.isFunction(n)&&n()},contains:function(e,t){return _.isElement(e)?_.isElement(t)?e!=t&&e.contains(t):(console.error("No valid child HTML element given."),null):(console.error("No valid parent HTML element given."),null)},create:function(e,t){if(!_.isString(e))return console.error("No string given.");if(void 0!==t){if(!_.isObject(t))return console.error("The settings given as a parameter have to be an object.")}else t={};var n=e.match(/#[^\.#\s]+/g),i=e.match(/\.[^#\s\.]+/g),r=document.createElement(e.replace(/#[^\.#\s]+|\.[^#\s]+|\s/g,""));for(var a in n&&(r.id=n[0].replace(/#/,"")),i&&(r.className=i.join(" ").replace(/\./g,"")),t)if(t.hasOwnProperty(a))switch(a){case"innerHTML":r.innerHTML=t[a];break;case"style":for(var o in t[a])r.style.setProperty(o,t[a][o]);break;default:r.setAttribute(a,t[a])}return r},append:function(e,t){return _.isElement(e)?_.isElement(t)||_.isNumber(t)||_.isString(t)?((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.appendChild(t)):console.error("Second given parameter is neither a HTML element, text or a number."):console.error("First given element does not exist.")},prepend:function(e,t){return _.isElement(e)?_.isElement(t)||_.isNumber(t)||_.isString(t)?((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.insertBefore(t,e.childNodes[0])):console.error("Second given parameter is neither a HTML element, text or a number."):console.error("First given element does not exist.")},after:function(e,t){return _.isElement(e)?_.isElement(t)||_.isNumber(t)||_.isString(t)?((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.parentNode.insertBefore(t,e.nextSibling)):console.error("Second given parameter is neither a HTML element, text or a number."):console.error("First given element does not exist.")},before:function(e,t){return _.isElement(e)?_.isElement(t)||_.isNumber(t)||_.isString(t)?((_.isString(t)||_.isNumber(t))&&(t=document.createTextNode(t)),void e.insertBefore(t,e)):console.error("Second given parameter is neither a HTML element, text or a number."):console.error("First given element does not exist.")},remove:function(e){_.isElement(e)&&e.parentNode.removeChild(e)},empty:function(e){if(!_.isElement(e))return console.error("Element does not exist.");e.innerHTML=""},addEvent:function(e,t,n,i){return _.isElement(e)||e instanceof Window?_.isString(t)?_.isFunction(n)?(!0!==i&&(i=!1),void("addEventListener"in e?e.addEventListener(t,n,i):e.attachEvent("on"+t,n))):console.error("No function was given."):console.error("No event name was given."):console.error("Element does not exist.")},removeEvent:function(e,t,n,i){return _.isElement(e)?_.isString(t)?_.isFunction(n)?(!0!==i&&(i=!1),void("removeEventListener"in e?e.removeEventListener(t,n,i):e.detachEvent("on"+t,n))):console.error("No function was given."):console.error("No event name was given."):console.error("Element does not exist.")},onClick:function(e,t,n){_.addEvent(e,"click",t,n)},removeClick:function(e,t,n){_.removeEvent(e,"click",t,n)},onInput:function(e,t,n){_.addEvent(e,"input",t,n)},removeInput:function(e,t,n){_.removeEvent(e,"input",t,n)},onLoad:function(e,t,n){_.addEvent(e,"load",t,n)},removeLoad:function(e,t,n){_.removeEvent(e,"load",t,n)},target:function(e){return _.exists(e)?e.target||e.srcElement:console.error("No valid event given.")},preventDefault:function(e){e.preventDefault(),e.stopPropagation()},addClass:function(e,t){return _.isElement(e)?_.isString(t)?void("classList"in e?e.classList.add(t):-1==e.className.split(" ").indexOf(t)&&(e.className+=" "+t)):console.error("No class name was given."):console.error("Element does not exist.")},removeClass:function(e,t){return _.isElement(e)?_.isString(t)?void("classList"in e?e.classList.remove(t):e.className=e.className.replace(new RegExp("\b"+_.escapeRegex(t)+"\b","g")," ")):console.error("No class name was given."):console.error("Element does not exist.")},toggleClass:function(e,t){return _.isElement(e)?_.isString(t)?void(_.hasClass(e,t)?_.removeClass(e,t):_.addClass(e,t)):console.error("No class name was given."):console.error("Element does not exist.")},hasClass:function(e,t){return _.isElement(e)?_.isString(t)?"classList"in e?e.classList.contains(t):-1!=e.className.split(" ").indexOf(t):console.error("No class name was given."):console.error("Element does not exist.")},getStyle:function(e,t){return _.isElement(e)?_.isString(t)?"getComputedStyle"in window?window.getComputedStyle(e,null).getPropertyValue(t):"currentStyle"in e?e.currentStyle[t]:void 0:console.error("Given style is not a string."):console.error("Element is not defined.")},setStyles:function(e,t){if(!_.isElement(e))return console.error("Element is not defined.");if(!_.isObject(t))return console.error("No valid styles object given.");for(var n in t)e.style.setProperty(n,t[n])},getHeight:function(e){if(!_.isElement(e))return console.error("Element is not defined.");var t=e.getBoundingClientRect();return t.bottom-t.top},getWidth:function(e){if(!_.isElement(e))return console.error("Element is not defined.");var t=e.getBoundingClientRect();return t.right-t.left},exists:function(e){return null!=e},isElement:function(e,t){t=!0===t;var n=e instanceof Element||e instanceof HTMLDocument;return t?n&&document.documentElement.contains(e):n},isFunction:function(e){return"function"==typeof e},isObject:function(e){return"object"==typeof e&&null!==e},isArray:function(e){return null!=e&&e.constructor===Array},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isInteger:function(e){return"number"==typeof e&&e%1==0},isFloat:function(e){return"number"==typeof e&&e%1!=0},escapeRegex:function(e){return _.isString(class_)?(""+e).replace(/[\.\*\+\?\^\$\{\}\(\)\|\[\]\\\/\-]/g,"\\$&"):console.error("No string was given.")},encodeHTML:function(e){return _.isString(e)?(""+e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):console.error("No string was given.")},decodeHTML:function(e){return _.isString(class_)?(""+e).replace(/\&amp\;/g,"&").replace(/\&lt\;/g,"<").replace(/\&gt\;/g,">").replace(/\&quot\;/g,'"').replace(/\&#039\;/g,"'"):console.error("No string was given.")},parseJSON:function(e){if(!_.isString(e))return console.error("No string was given.");var t=null;try{t=JSON.parse(e)}catch(e){console.error("Could not parse the given string as JSON, because of a "+e)}return t},sortArrayObjects:function(e,n,t){return t?e.sort(function(e,t){return e[n]<t[n]?1:-1}):e.sort(function(e,t){return e[n]>t[n]?1:-1})},isEmptyObject:function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return JSON.stringify(e)===JSON.stringify({})},getAverage:function(e){for(var t=0,n=e.length,i=0;i<n;i++)t+=e[i];return t/n},getMin:function(e,t){for(var n=_.isNumber(t)?t:Number.MAX_VALUE,i=e.length,r=0;r<i;r++){var a=e[r];a<n&&(n=a)}return n},getMax:function(e,t){for(var n=_.isNumber(t)?t:Number.MIN_VALUE,i=e.length,r=0;r<i;r++){var a=e[r];n<a&&(n=a)}return n},removeArrayIndex:function(e,t){for(var n=e.length,i=t;i<n-1;i++)e[i]=e[i+1];return e.pop(),e},limitNumber:function(e,t,n,i){return e<t?(e=t,_.isFunction(i)&&i(t)):n<e&&(e=n,_.isFunction(i)&&i(n)),e}},NODE={html:_.tag("html")[0],head:_.tag("head")[0],body:_.tag("body")[0],data_load_btn:_.id("load-data"),darkmode_btn:_.id("toggle-darkmode"),play_btn:_.id("play-button"),pause_btn:_.id("pause-button"),stop_btn:_.id("stop-button"),time_selection:{container_1:_.id("pre-defined-speed"),container_2:_.id("custom-speed"),input:_.id("custom-speed-input"),custom:_.id("open-custom-speed-menu"),close_custom:_.id("close-custom-speed-menu")},time_btn:{slow:_.id("half-speed"),normal:_.id("normal-speed"),fast:_.id("double-speed")},data_load:{window:_.id("data-load-window"),close_btn:null,blur:null,drop_area:_.id("drop-area"),select_file_input:_.id("selected-file"),example_sets_area:_.id("example-set-area"),notice:_.id("file-reader-notice")},initializeDataLoadWindow:function(){var e=this.data_load;e.close_btn=_.class("close",e.window)[0],e.blur=_.class("blur",e.window)[0],delete this.initializeDataLoadWindow},compare_selection:{window:_.id("compare-selection-window"),close_btn:null,blur:null,unselected_keys:null,selected_keys:null},initializeCompareSelectionWindow:function(){var e=this.compare_selection;e.close_btn=_.class("close",e.window)[0],e.blur=_.class("blur",e.window)[0],e.unselected_keys=_.class("unselected-keys",e.window)[0],e.selected_keys=_.class("selected-keys",e.window)[0],delete this.initializeCompareSelectionWindow},chart_container_1:_.id("chart-container-1"),current_value:{container:_.id("data-set-current-value"),value:null,indicator:null},data_set_info:{title:null,date:null},column_chart:_.id("column-chart"),column_chart_total:_.id("ratio-total"),ratio_chart_container:_.id("ratio-chart"),ratio_chart:null,initializeColumnChart:function(){var e=_.id("data-set-info");this.data_set_info.title=_.class("title",e)[0],this.data_set_info.date=_.class("date",e)[0];var t=this.current_value;t.value=_.class("value",t.container)[0],t.indicator=_.class("indicator",t.container)[0],this.ratio_chart=_.tag("tr",this.ratio_chart_container)[0],delete this.initializeColumnChart},chart_container_2:_.id("chart-container-2"),individual_chart:_.id("individual-chart"),individual_chart_menu:_.id("individual-chart-menu"),back_to_column_chart_btn:_.id("close-individual-chart"),download_png_btn:_.id("download-chart-as-image"),compare_btn:_.id("compare-btn"),initialize:function(){this.initializeDataLoadWindow(),this.initializeColumnChart(),this.initializeCompareSelectionWindow(),delete this.initialize}},MSG={type:{NORMAL:"normal",ERROR:"error",WARNING:"warning"},element:void 0,close_timer:null,hide_animation_timer:null,generateHTML:function(e,t){return _.create("div#overlay-message."+t,{innerHTML:_.encodeHTML(e)})},show:function(e,t,n){if(MSG.hide(),_.isNumber(t)||(t=3500),t<800)return console.error("Message must appear for at least 400ms.");void 0===n&&(n=MSG.type.NORMAL),MSG.element=MSG.generateHTML(e,n),_.append(NODE.html,MSG.element),MSG.close_timer=setTimeout(MSG.hide,t),MSG.hide_animation_timer=setTimeout(function(){_.addClass(MSG.element,"hide")},t-200)},error:function(e,t){MSG.show(e,t,MSG.type.ERROR)},warning:function(e,t){MSG.show(e,t,MSG.type.WARNING)},hide:function(){clearTimeout(MSG.close_timer),clearTimeout(MSG.hide_animation_timer),_.isElement(MSG.element)&&(_.remove(MSG.element),MSG.element=void 0)}},NAV={darkmode:!1,individual_chart_opened:!1,initialize:function(){_.onClick(NODE.data_load_btn,DATA_LOAD.open),_.onClick(NODE.darkmode_btn,this.toggleDarkMode),_.onClick(NODE.play_btn,ANIMATOR.play),_.onClick(NODE.pause_btn,ANIMATOR.pause),_.onClick(NODE.stop_btn,ANIMATOR.stop),_.onClick(NODE.time_btn.slow,NAV.setSpeed),_.onClick(NODE.time_btn.normal,NAV.setSpeed),_.onClick(NODE.time_btn.fast,NAV.setSpeed),_.addEvent(NODE.time_selection.input,"input",NAV.setCustomSpeed),_.onClick(NODE.time_selection.custom,NAV.showCustomSpeedMenu),_.onClick(NODE.time_selection.close_custom,NAV.showDefinedSpeedMenu),_.onClick(NODE.back_to_column_chart_btn,NAV.showColumnChart),_.onClick(NODE.download_png_btn,NAV.downloadIndividualChart),_.onClick(NODE.compare_btn,COMPARE.open)},toggleDarkMode:function(){NAV.darkmode=!NAV.darkmode,_[(NAV.darkmode?"add":"remove")+"Class"](NODE.html,"darkMode"),MSG.show("Toggled dark mode.",1300),ANIMATOR.refreshFrame()},enableButton:function(e){_.addClass(e,"active"),e.setAttribute("aria-disabled","false"),e.setAttribute("originalTabIndex",e.getAttribute("tabIndex")),e.setAttribute("tabIndex","-1")},disableButton:function(e){_.removeClass(e,"active"),e.setAttribute("aria-disabled","true");var t=e.getAttribute("originalTabIndex");null==t&&(t=e.getAttribute("tabIndex"),e.setAttribute("originalTabIndex",t)),e.setAttribute("tabIndex",t)},onlyEnableButton:function(e){var t=NODE.time_btn;for(var n in t)t[n]===e?this.enableButton(t[n]):this.disableButton(t[n])},showColumnChart:function(){NAV.individual_chart_opened=!1,_.addClass(NODE.chart_container_1,"active"),_.removeClass(NODE.chart_container_2,"active"),ANIMATOR.refreshFrame()},showIndividualChart:function(){NAV.individual_chart_opened=!0,_.removeClass(NODE.chart_container_1,"active"),_.addClass(NODE.chart_container_2,"active"),ANIMATOR.refreshFrame()},setSpeed:function(e){var t=_.target(e);if(!_.hasClass(t,"active")){NAV.onlyEnableButton(t);var n=1;switch(t.id){case"half-speed":n=.5;break;case"double-speed":n=2}MSG.show("Set speed to "+n+".",900),ANIMATOR.setTime(n)}},setCustomSpeed:function(e){var t=_.target(e),n=t.value;n.match(/[,]+/)&&(n=n.replace(/[,]+/,"."),t.value=n),n.match(/[^0-9\.]+/)&&(n=n.replace(/[^0-9\.]+/,""),t.value=n),n.match(/^([0-9]+|[0-9]+\.[0-9]+)$/)?((n=parseFloat(n))%1!=0&&(n=n.toFixed(1)),n=_.limitNumber(n,.1,4,function(e){MSG.error("Speed must be between 0.1 and 4.")}),_.addClass(t,"correct-speed"),ANIMATOR.setTime(n),(n+="")!=t.value&&(t.value=n)):_.removeClass(t,"correct-speed")},showCustomSpeedMenu:function(){_.removeClass(NODE.time_selection.container_1,"active"),_.addClass(NODE.time_selection.container_2,"active");var e=NODE.time_selection.input;e.value=ANIMATOR.time+"",_.addClass(e,"correct-speed")},showDefinedSpeedMenu:function(){_.addClass(NODE.time_selection.container_1,"active"),_.removeClass(NODE.time_selection.container_2,"active");var e=0;e=_.hasClass(NODE.time_btn.slow,"active")?.5:_.hasClass(NODE.time_btn.normal,"active")?1:2,ANIMATOR.setTime(e)},downloadIndividualChart:function(){var e=NODE.individual_chart.toDataURL("image/png"),t=new Date,n=t.getDate(),i=t.getMonth()+1,r=(9<n?"":"0")+n+"-"+(9<i?"":"0")+i+"-"+t.getFullYear()+" "+t.getHours()+"-"+t.getMinutes()+"-"+t.getSeconds(),a="chart "+ANIMATOR.individual_chart_keys[0].replace(/[^a-z0-9\-\_]/g,"")+" "+r+".png",o=_.create("a",{download:a,href:e});_.append(NODE.body,o),o.click(),_.remove(o),MSG.show("Downloaded image.",1300)}},FILE={isValidData:function(e){if(void 0===e.name)return'"name" value is not defined.';if(!_.isString(e.name))return'"name" value must be a string.';if(void 0===e.date)return'"date" value must be defined.';if(!_.isString(e.date))return'"date" value must be a string.';if(void 0===e.keys)return'"keys" value must be defined.';if(_.isEmptyObject(e.keys))return'"keys" value must contain at least one key.';var t=[];for(var n in e.keys)if(e.hasOwnProperty.call(e.keys,n)){if(t[t.length]=n,void 0===e.keys[n].name)return'"name" value in key "'+n+'" is undefined.';if(!_.isString(e.keys[n].name))return'"name" value in key "'+n+'" must be a string, but is of type "'+typeof e.keys[n].name+'".';if(void 0===e.keys[n].icon)return'"icon" value in key "'+n+'" is undefined.';if(!_.isString(e.keys[n].icon))return'"icon" value in key "'+n+'" must be a string, but is of type "'+typeof e.keys[n].icon+'".'}if(void 0===e.range)return'"range" value is not defined.';if(void 0===e.range.from)return'Range "from" value must be defined.';if(!_.isInteger(e.range.from))return'Range "from" value must be a number (integer).';if(void 0===e.range.to)return'Range "to" value is not defined.';if(!_.isInteger(e.range.to))return'Range "to" value must be a number (integer).';if(void 0===e.data)return'"data" value must be defined.';if(_.isEmptyObject(e.data))return'"data" value must contain at least one key.';for(var i=t.length,r=0;r<i;r++){var a=t[r];if(_.isEmptyObject(e.data[a]))return'No data points are defined in "'+a+'".';for(var o in e.data[a]){if(!o.match(/^\-?[0-9]+$/g))return'Name "'+o+'" in key "'+a+'" must be a whole number.';if(!_.isNumber(e.data[a][o]))return'Value of "'+o+'" in key "'+a+'" must be a number, but is of type '+typeof e.data[a][o]+"."}}return!0}},DATA_LOAD={initialize:function(){var e=NODE.data_load;_.onClick(e.blur,this.close),_.onClick(e.close_btn,this.close);for(var t=_.tag("button",e.example_sets_area),n=t.length,i=0;i<n;i++)_.onClick(t[i],this.startDataSetLoading);this.initializeDropArea()},open:function(){_.addClass(NODE.data_load.window,"visible"),setTimeout(function(){NODE.data_load.close_btn.focus()},100)},close:function(){_.removeClass(NODE.data_load.window,"visible"),_.removeClass(NODE.data_load.window,"file-selected"),NODE.data_load_btn.focus()},initializeDropArea:function(){var e=NODE.data_load;_.isFunction(window.FileReader)||_.addClass(e.notice,"show"),_.addEvent(e.drop_area,"dragenter",_.preventDefault),_.addEvent(e.drop_area,"dragover",_.preventDefault),_.addEvent(e.drop_area,"dragleave",_.preventDefault),_.addEvent(e.drop_area,"drop",_.preventDefault),_.addEvent(e.drop_area,"dragenter",this.highlightDropArea),_.addEvent(e.drop_area,"dragover",this.highlightDropArea),_.addEvent(e.drop_area,"dragleave",this.unhighlightDropArea),_.addEvent(e.drop_area,"drop",this.unhighlightDropArea),_.addEvent(e.drop_area,"drop",this.handleDroppedFile),_.addEvent(e.select_file_input,"change",this.handleSelectedFile)},highlightDropArea:function(){_.addClass($.drop_area,"dragged-over")},unhighlightDropArea:function(){_.removeClass($.drop_area,"dragged-over")},handleDroppedFile:function(e){_.preventDefault(e);var t=null;if(e.dataTransfer.items){if(1<(n=e.dataTransfer.items).length)return void alert("Dropping multiple files is forbidden.");if("file"!==n[0].kind)return void alert("Please drop a file.");t=n[0].getAsFile()}else{var n;if(1<(n=e.dataTransfer.files).length)return void alert("Dropping multiple files is forbidden.");t=n[0]}DATA_LOAD.processFile(t)},handleSelectedFile:function(e){var t=this.files[0];DATA_LOAD.processFile(t)},processFile:function(e){if(_.isFunction(window.FileReader))if(e)if(/\.(json|txt)$/.test(e.name)){if(!(1e4<e.size)||confirm("This data set is large ("+e.size/1e3+"KB) and may freeze your tab momentarily. Do you want to continue?")){var t=new FileReader;t.readAsText(e,"UTF-8"),t.onerror=function(e){alert("File could not be read.")},t.onload=function(e){DATA_LOAD.parseJSON(_.target(e).result)}}}else alert("Only .json and .txt files are allowed.");else console.error("File is not defined.");else alert("The FileReader API is not supported by your browser. Please update your browser or switch to a different one!")},parseJSON:function(e){var t=_.parseJSON(e);if(!t)return alert("Could not parse the file as it is not in a valid JSON format.\nCheck your browser console for more information."),!1;var n=FILE.isValidData(t);if(_.isString(n))return MSG.error(n,7e3),!1;DATA_LOAD.visualizeObject(t,!0)},startDataSetLoading:function(e){var t="data/"+_.target(e).getAttribute("load-data")+".json";DATA_LOAD.loadHttpDataSet(t,!0)},loadHttpDataSet:function(e,i){var r=new XMLHttpRequest;return r.open("GET",e),r.send(),r.onreadystatechange=function(e){if(4===r.readyState&&200===r.status){var t=r.responseText;if(null!=t&&""!=t){var n=_.parseJSON(t);DATA_LOAD.visualizeObject(n,i)}}},r},visualizeObject:function(e,t){_.removeClass(NODE.column_chart_total,"hidden"),_.removeClass(NODE.ratio_chart_container,"hidden");var n={},i={},r={},a=NODE.data_set_info;a.title.innerHTML=e.name,a.date.innerHTML=e.date,_.empty(NODE.column_chart),_.empty(NODE.ratio_chart);var o=0;for(var s in e.data)if(e.data.hasOwnProperty(s)){var l=this.getColumnColor(o);n[s]=this.generateDataPointArray(e.data[s],e.range.from,e.range.to);var d=this.getColumn(s,l,e.keys[s].name,e.keys[s].icon);_.append(NODE.column_chart,d),i[s]={container:d,name:e.keys[s].name,color:l,meter:_.class("meter",d)[0],value:_.class("value",d)[0],start_order:o},_.onClick(_.class("clickEvent",d)[0],this.openIndividualChart);var c=this.getRatioChartPart(s,l,n[s],e.keys[s].name,e.keys[s].icon);_.append(NODE.ratio_chart,c);var u=_.class("percentage",c)[0];r[s]={container:c,percentage:_.tag("div",u)[0],tooltip:_.class("tooltip",c)[0],tooltip_percentage:_.class("tooltip-percentage",c)[0]},_.onClick(_.class("clickEvent",c)[0],this.openIndividualChart),o++}ANIMATOR.setRange(e.range.from,e.range.to),ANIMATOR.setData(n),ANIMATOR.setColumns(i),ANIMATOR.setRatioParts(r),ANIMATOR.setCSSTransitions(),ANIMATOR.end(),ANIMATOR.refreshFrame(),_.removeClass(NODE.current_value.container,"hidden"),NAV.showColumnChart(),!0===t&&_.addClass(NODE.data_load.window,"file-selected")},openIndividualChart:function(e){var t=_.target(e).getAttribute("column-id");ANIMATOR.setInvidualChartKeys([t]),NAV.showIndividualChart()},getRatioChartPart:function(e,t,n,i,r){var a=_.create("td.part-container",{style:{"background-color":t}}),o=_.create("button.clickEvent",{title:"Open statistics for "+i,"column-id":e}),s=_.create("div.icon",{style:{"background-image":"url("+(_.isString(r)?_.encodeHTML(r):"")+")"}}),l=_.create("div.tooltip"),d=_.create("div.name",{innerHTML:i}),c=_.getAverage(n),u=_.getMin(n),m=_.getMax(n),v=_.create("div.description",{innerHTML:"<b>Avg:</b> "+ANIMATOR.formatNumber(c)+"<br><b>Min:</b> "+ANIMATOR.formatNumber(u)+"<br><b>Max:</b> "+ANIMATOR.formatNumber(m)}),p=_.create("div.tooltip-percentage"),f=_.create("div.percentage"),h=_.create("div");return _.append(l,s),_.append(l,p),_.append(l,d),_.append(l,v),_.append(a,l),_.append(f,h),_.append(a,f),_.append(a,o),a},getColumn:function(e,t,n,i){var r=_.create("button.column-container"),a=_.create("div.clickEvent",{title:"Open statistics for "+n,"column-id":e}),o=_.create("div.icon",{style:{"background-image":"url("+(_.isString(i)?_.encodeHTML(i):"")+")"}}),s=_.create("div.column"),l=_.create("div.meter",{style:{"background-color":t}}),d=_.create("div.name",{innerHTML:n}),c=_.create("div.value");return _.append(l,d),_.append(l,c),_.append(s,l),_.append(r,o),_.append(r,s),_.append(r,a),r},getColumnColor:function(e){var t=["#099b9b","#a52a2a","#9f8605","#556b2f","#8b008b","#1616ad","#bf775f","#888236","#5ebf5e","#9932cc","#3f238d","#800000","#a2651b","#808000","#800080"];return t[e%t.length]},generateDataPointArray:function(e,t,n){for(var i=[],r=t;r<=n;r++)if(_.isNumber(e[r+""])){var a=e[r+""];i[i.length]=a}else if(r!=t){for(var o=i[i.length-1],s=null,l=0,d=r+1;d<=n;d++)if(l++,_.exists(e[d+""])){s=e[d+""];break}var c=o+(s-o)/(1+l);i[i.length]=null==s?o:c}else i[i.length]=0;var u=[],m=i.length;for(r=0;r<m;r++){var v=i[r];if(u[u.length]=v,r==m-1)break;var p=((s=i[r+1])-v)/100;for(d=2;d<=98;d+=2){var f=v+d*p;u[u.length]=f}}return u}},COMPARE={initialize:function(){_.onClick(NODE.compare_btn,this.open),_.onClick(NODE.compare_selection.blur,this.close),_.onClick(NODE.compare_selection.close_btn,this.close)},open:function(){void 0===COMPARE.CREATED_BUTTONS&&(COMPARE.createButtons(),COMPARE.CREATED_BUTTONS=!1),_.addClass(NODE.compare_selection.window,"visible"),COMPARE.orderButtons(),setTimeout(function(){NODE.compare_selection.close_btn.focus()},100)},close:function(){_.removeClass(NODE.compare_selection.window,"visible"),NODE.compare_btn.focus()},buttons:[],buttons_num:0,createButtons:function(){for(var e in _.empty(NODE.compare_selection.selected_keys),_.empty(NODE.compare_selection.unselected_keys),ANIMATOR.data){var t=_.create("button.comparison-key",{"key-id":e,innerHTML:ANIMATOR.columns[e].name,style:{background:ANIMATOR.columns[e].color}});_.onClick(t,COMPARE.moveButton),this.buttons[this.buttons.length]=t,this.buttons_num++}this.orderButtons()},orderButtons:function(){for(var e=0;e<this.buttons_num;e++){for(var t=this.buttons[e],n=t.getAttribute("key-id"),i=ANIMATOR.individual_chart_keys.length,r=!1,a=0;a<i;a++)if(ANIMATOR.individual_chart_keys[a]===n){r=!0;break}var o=(r?"":"un")+"selected_keys";_.append(NODE.compare_selection[o],t)}},moveButton:function(e){var t=_.target(e),n=t.getAttribute("key-id"),i=!1;_.hasClass(t.parentElement,"unselected-keys")&&(i=!0),i?(ANIMATOR.addIndividualKey(n),_.append(NODE.compare_selection.selected_keys,t)):(ANIMATOR.removeIndividualKey(n),_.append(NODE.compare_selection.unselected_keys,t)),ANIMATOR.refreshFrame()}},ANIMATOR={is_running:!1,time:1,from:0,to:0,current:0,loop:null,data:{},columns:{},column_num:0,pixels_between_columns:52,ratio_parts:{},ratio_parts_num:0,individual_chart_keys:[],initialize:function(){_.addEvent(window,"resize",function(){NAV.individual_chart_opened&&ANIMATOR.refreshFrame()})},setRange:function(e,t){this.from=e,this.to=t,this.current=0},setTime:function(e){this.time=e,this.is_running&&(this.stopLoop(),this.startLoop()),this.setCSSTransitions()},setCSSTransitions:function(){var e=1/this.time/5+"s";for(var t in this.columns)_.setStyles(this.columns[t].meter,{transition:e});for(var n in this.ratio_parts)_.setStyles(this.ratio_parts[n].container,{transition:e});_.setStyles(NODE.current_value.indicator,{transition:e})},setData:function(e){this.data=e;var t=Object.keys(e)[0];this.data_point_num=e[t].length},setColumns:function(e){this.columns=e,this.column_num=Object.keys(e).length},setRatioParts:function(e){this.ratio_parts=e,this.ratio_parts_num=Object.keys(e).length},setInvidualChartKeys:function(e){this.individual_chart_keys=e},addIndividualKey:function(e){if(!this.hasIndividualKey()){var t=this.individual_chart_keys.length;this.individual_chart_keys[t]=e}},removeIndividualKey:function(e){for(var t=this.individual_chart_keys,n=t.length,i=[],r=0;r<n;r++)t[r]===e&&(i[i.length]=r);var a=i.length;for(r=0;r<a;r++)t=_.removeArrayIndex(t,i[r]);this.setInvidualChartKeys(t)},hasIndividualKey:function(e){for(var t=this.individual_chart_keys.length,n=t.length,i=0;i<n;i++)if(t[i]===e)return!0;return!1},startLoop:function(){var e=80/ANIMATOR.time;ANIMATOR.loop=setInterval(ANIMATOR.update,e)},stopLoop:function(){clearInterval(ANIMATOR.loop),ANIMATOR.loop=null},play:function(){ANIMATOR.is_running=!0,_.removeClass(NODE.html,"animation-paused"),_.addClass(NODE.html,"animation-playing"),ANIMATOR.startLoop(),MSG.show("Started animation.",1e3)},pause:function(){ANIMATOR.is_running=!1,_.removeClass(NODE.html,"animation-playing"),_.addClass(NODE.html,"animation-paused"),ANIMATOR.stopLoop(),MSG.show("Paused animation.",1e3)},restart:function(){ANIMATOR.current=0},end:function(){ANIMATOR.is_running=!1,ANIMATOR.current=0,_.removeClass(NODE.html,"animation-playing"),_.addClass(NODE.html,"animation-paused"),ANIMATOR.stopLoop()},stop:function(){1<ANIMATOR.current&&MSG.show("Stopped animation.",1e3),ANIMATOR.end(),ANIMATOR.update()},number_names:{Thousand:Math.pow(10,3),Million:Math.pow(10,6),Billion:Math.pow(10,9),Trillion:Math.pow(10,12),Quadrillion:Math.pow(10,15),Quintillion:Math.pow(10,18),Sextillion:Math.pow(10,21),Septillion:Math.pow(10,24),Octillion:Math.pow(10,27),Nonillion:Math.pow(10,30),Decillion:Math.pow(10,33),Undecillion:Math.pow(10,36),Duodecillion:Math.pow(10,39),Tredecillion:Math.pow(10,42),Quattuordecillion:Math.pow(10,45),Quindecillion:Math.pow(10,48),Sexdecillion:Math.pow(10,51),Septendecillion:Math.pow(10,54),Octodecillion:Math.pow(10,57),Novemdecillion:Math.pow(10,60),Vigintillion:Math.pow(10,63),"*10^66":Math.pow(10,66),"*10^69":Math.pow(10,69),"*10^72":Math.pow(10,72),"*10^75":Math.pow(10,75),"*10^78":Math.pow(10,78),"*10^81":Math.pow(10,81),"*10^84":Math.pow(10,84),"*10^87":Math.pow(10,87),"*10^90":Math.pow(10,90),"*10^93":Math.pow(10,93),"*10^96":Math.pow(10,96),"*10^99":Math.pow(10,99)},formatNumber:function(e){var t=e<0,n=t?"-":"";if(t&&(e*=-1),e<1e3)return n+e;for(var i in ANIMATOR.number_names){var r=ANIMATOR.number_names[i];if(r<=e&&e<1e3*r)return n+Number(e/r).toFixed(1)+" "+i}return n+"&infin;"},update:function(){null!=ANIMATOR.data&&(ANIMATOR.current>=ANIMATOR.data_point_num?ANIMATOR.end():(ANIMATOR.refreshFrame(),ANIMATOR.current++))},refreshFrame:function(){if(ANIMATOR.current%50==0){var e=parseInt(ANIMATOR.from)+(0==ANIMATOR.current?0:ANIMATOR.current/50);NODE.current_value.value.innerHTML=e,NODE.current_value.indicator.innerHTML=e}_.setStyles(NODE.current_value.indicator,{width:ANIMATOR.current%50*2+"%"}),NAV.individual_chart_opened?ANIMATOR.updateIndividualCharts():(ANIMATOR.updateColumnChart(),ANIMATOR.updateColumnRatioChart())},updateColumnChart:function(){var e=ANIMATOR,t=0,n=Number.MIN_VALUE,i=[];for(var r in e.data){var a=e.data[r][e.current];a<t&&(t=a),n<a&&(n=a),i[i.length]={key:r,value:a}}for(var r in e.data){var o=e.data[r][e.current];e.columns[r].value.innerHTML=e.formatNumber(o),_.setStyles(e.columns[r].meter,{width:(o-t)/(n-t)*100+"%"})}for(var s=_.sortArrayObjects(i,"value",!0),l=0;l<e.column_num;l++){var d=e.columns[s[l].key],c=(l-d.start_order)*e.pixels_between_columns;_.setStyles(d.container,{transform:"translate(0px, "+c+"px)"})}},updateColumnRatioChart:function(){var e=ANIMATOR,t=0;for(var n in e.data)t+=e.data[n][e.current];NODE.column_chart_total.innerHTML=ANIMATOR.formatNumber(t);var i=[];for(var n in e.data){var r=100/(t/e.data[n][e.current]);i[i.length]={key:n,value:r}}for(var a=_.sortArrayObjects(i,"value"),o=0;o<e.ratio_parts_num;o++){n=a[o].key,r=a[o].value;var s=e.ratio_parts[n];if(r<.2)_.addClass(s.container,"hidden");else{_.removeClass(s.container,"hidden"),_.append(NODE.ratio_chart,s.container),_.setStyles(s.container,{width:r+"%"});var l=r.toFixed(1);s.percentage.innerHTML=l+"%",s.tooltip_percentage.innerHTML=l+"%"}}},updateIndividualCharts:function(){var e=ANIMATOR,t=NODE.individual_chart,n=t.getContext("2d"),i=e.individual_chart_keys;if(null!=i){var r=e.individual_chart_keys.length;t.width=_.getWidth(NODE.individual_chart_menu),t.height=500+18*(r-1),n.clearRect(0,0,t.width,t.height);for(var a=0,o=Number.MIN_VALUE,s=0;s<r;s++)for(var l=0;l<e.data_point_num;l++){var d=i[s],c=e.data[d][l];c<a&&(a=c),o<c&&(o=c)}var u={top:5,left:5,bottom:80,right:5},m="12px Arial sans-serif",v=ANIMATOR.formatNumber(o)+"",p=ANIMATOR.formatNumber(a)+"";n.font=m;var f=n.measureText(v).width,h=n.measureText(p).width,g=f;g<h&&(g=h),u.right=u.right+g+15,u.bottom=u.bottom+18*r;for(s=0;s<2;s++)n.font=m,n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline=0==s?"top":"bottom",n.textAlign="left",n.fillText(0==s?v:p,t.width-u.right+5,0==s?u.top:t.height-u.bottom),n.stroke();var A=t.width-u.left-u.right,N=(e.data_point_num-1)/50+1;for(s=e.from;s<=e.to;s++){n.strokeStyle=NAV.darkmode?"#242424":"#ededed";var b=s==e.from?u.left:u.left+A*((s-e.from)/(N-1));n.moveTo(b,u.top),n.lineTo(b,t.height-u.bottom),n.stroke();var O=!1,M=s+"",y=n.measureText(M).width;if(100<y)return;35<y?O=!0:window.innerWidth<=550&&(O=!0),O&&e.from!=s&&e.to!=s||(n.font=m,n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline="bottom",n.textAlign=O?s==e.from?"left":"right":s==e.from?"left":"center",n.fillText(M,b,t.height-u.bottom+20),n.stroke())}n.font="14px Arial sans-serif",n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline="middle",n.textAlign="left",n.fillText("Legend",u.left,t.height-u.bottom+50),n.stroke();for(s=0;s<r;s++){d=i[s];var E=e.columns[d].color;e.drawIndividualKey(t,n,u,E,a,o,e.data[d]);var T=t.height-u.bottom+66+18*s;n.font="12px Arial sans-serif",n.fillStyle=NAV.darkmode?"#767676":"#b5b5b5",n.textBaseline="top",n.textAlign="left",n.fillText(e.columns[d].name,u.left+20,T),n.stroke(),n.rect(u.left+4,T,10,10),n.fillStyle=E,n.fill(),n.stroke()}if(0!=e.current&&e.current!=e.data_point_num-1){n.strokeStyle="#e26565";var w=(e.current+1)/e.data_point_num;b=u.left+A*w;n.moveTo(b,u.top),n.lineTo(b,t.height-u.bottom),n.stroke()}}else t.width=0},drawIndividualKey:function(e,t,n,i,r,a,o){for(var s=e.width-n.left-n.right,l=e.height-n.top-n.bottom,d=[],c=0;c<=ANIMATOR.data_point_num;c+=50){var u=0;0<c&&(u=c/(ANIMATOR.data_point_num-1));var _=n.left+s*u,m=(o[c]-r)/(a-r)*100,v=e.height-n.bottom;v-=l/(100/m),d[d.length]={x:_,y:v}}var p=2*Math.PI;t.strokeStyle=i;for(c=0;c<d.length;c++){var f=d[c].x,h=d[c].y;if(t.beginPath(),t.arc(f,h,2,0,p),t.stroke(),c!=d.length-1){var g=d[c+1].x,A=d[c+1].y;t.moveTo(f,h),t.lineTo(g,A),t.stroke()}}}};_.onLoad(window,function(){NODE.initialize(),NAV.initialize(),DATA_LOAD.initialize(),ANIMATOR.initialize(),COMPARE.initialize(),DATA_LOAD.loadHttpDataSet("data/example-data-set.json",!1).onerror=function(){var e=_.create("div.notice.red",{innerHTML:"<b>Loading the example data set failed.</b><br />Are you running this project locally on your system? Try using the <i>Load data</i> button."});_.append(NODE.column_chart,e);var t=_.create("div.notice.blue",{innerHTML:"You may currently run this project locally on your computer. This restricts you to only load local data set files. You can't load online examples.",style:{"margin-bottom":"20px"}});_.empty(NODE.data_load.example_sets_area),_.append(NODE.data_load.example_sets_area,t)}});