
# Documentation
[Back to main page](../README.md)

## Modules

<dl>
<dt><a href="#module_COMPARE">COMPARE</a></dt>
<dd></dd>
<dt><a href="#module_NODE">NODE</a></dt>
<dd></dd>
<dt><a href="#module_FILE">FILE</a></dt>
<dd><p>reads and validates the data from JSON data sets</p>
</dd>
<dt><a href="#module_DATA_LOAD">DATA_LOAD</a></dt>
<dd></dd>
<dt><a href="#module_MSG">MSG</a></dt>
<dd><p>manages on-screen messages</p>
</dd>
<dt><a href="#module_NAV">NAV</a></dt>
<dd></dd>
<dt><a href="#module__">_</a></dt>
<dd></dd>
<dt><a href="#module_ANIMATOR">ANIMATOR</a></dt>
<dd></dd>
</dl>

<a name="module_COMPARE"></a>

## COMPARE

* [COMPARE](#module_COMPARE)
    * [.initialize()](#module_COMPARE.initialize)
    * [.open()](#module_COMPARE.open)
    * [.close()](#module_COMPARE.close)
    * [.createButtons()](#module_COMPARE.createButtons)
    * [.orderButtons()](#module_COMPARE.orderButtons)
    * [.moveButton(e)](#module_COMPARE.moveButton)

<a name="module_COMPARE.initialize"></a>

### COMPARE.initialize()
initializes the 'compare keys' window

**Kind**: static method of [<code>COMPARE</code>](#module_COMPARE)  
<a name="module_COMPARE.open"></a>

### COMPARE.open()
opens the 'compare keys' window

**Kind**: static method of [<code>COMPARE</code>](#module_COMPARE)  
<a name="module_COMPARE.close"></a>

### COMPARE.close()
closes the 'compare keys' window

**Kind**: static method of [<code>COMPARE</code>](#module_COMPARE)  
<a name="module_COMPARE.createButtons"></a>

### COMPARE.createButtons()
creates the buttons in the 'compare keys' window

**Kind**: static method of [<code>COMPARE</code>](#module_COMPARE)  
<a name="module_COMPARE.orderButtons"></a>

### COMPARE.orderButtons()
moves the buttons into the correct position in the 'compare keys' window

**Kind**: static method of [<code>COMPARE</code>](#module_COMPARE)  
<a name="module_COMPARE.moveButton"></a>

### COMPARE.moveButton(e)
handles the click on buttons in 'compare keys' window, and selects or unselects the corresponding key for comparison in 'individual chart'

**Kind**: static method of [<code>COMPARE</code>](#module_COMPARE)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | click event |

<a name="module_NODE"></a>

## NODE

* [NODE](#module_NODE)
    * [.initializeDataLoadWindow()](#module_NODE.initializeDataLoadWindow)
    * [.initializeCompareSelectionWindow()](#module_NODE.initializeCompareSelectionWindow)
    * [.initializeColumnChart()](#module_NODE.initializeColumnChart)
    * [.initialize()](#module_NODE.initialize)

<a name="module_NODE.initializeDataLoadWindow"></a>

### NODE.initializeDataLoadWindow()
adds missing references to HTML nodes for 'data load' window

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_NODE.initializeCompareSelectionWindow"></a>

### NODE.initializeCompareSelectionWindow()
adds missing references to HTML nodes for 'compare keys' window

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_NODE.initializeColumnChart"></a>

### NODE.initializeColumnChart()
adds missing references to HTML nodes for 'column chart'

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_NODE.initialize"></a>

### NODE.initialize()
adds missing references to HTML nodes

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_FILE"></a>

## FILE
reads and validates the data from JSON data sets

<a name="module_FILE.isValidData"></a>

### FILE.isValidData(json) ⇒ <code>boolean</code> \| <code>string</code>
determines if the given data set is valid

**Kind**: static method of [<code>FILE</code>](#module_FILE)  
**Returns**: <code>boolean</code> - true, if data set is valid<code>string</code> - error message, if it's invalid  

| Param | Type |
| --- | --- |
| json | <code>Object</code> | 

<a name="module_DATA_LOAD"></a>

## DATA\_LOAD

* [DATA_LOAD](#module_DATA_LOAD)
    * [.initialize()](#module_DATA_LOAD.initialize)
    * [.open()](#module_DATA_LOAD.open)
    * [.close()](#module_DATA_LOAD.close)
    * [.initializeDropArea()](#module_DATA_LOAD.initializeDropArea)
    * [.highlightDropArea()](#module_DATA_LOAD.highlightDropArea)
    * [.unhighlightDropArea()](#module_DATA_LOAD.unhighlightDropArea)
    * [.handleDroppedFile(e)](#module_DATA_LOAD.handleDroppedFile)
    * [.handleSelectedFile(e)](#module_DATA_LOAD.handleSelectedFile)
    * [.processFile(file)](#module_DATA_LOAD.processFile)
    * [.parseJSON(str)](#module_DATA_LOAD.parseJSON)
    * [.startDataSetLoading(e)](#module_DATA_LOAD.startDataSetLoading)
    * [.loadHttpDataSet(url, [showConfirmation])](#module_DATA_LOAD.loadHttpDataSet) ⇒ <code>Object</code>
    * [.visualizeObject(obj, [showConfirmation])](#module_DATA_LOAD.visualizeObject)
    * [.openIndividualChart(e)](#module_DATA_LOAD.openIndividualChart)
    * [.getRatioChartPart(key, color, data, key_name, [icon_url])](#module_DATA_LOAD.getRatioChartPart) ⇒ <code>Object</code>
    * [.getColumn(key, color, key_name, [icon_url])](#module_DATA_LOAD.getColumn) ⇒ <code>Object</code>
    * [.getColumnColor(index)](#module_DATA_LOAD.getColumnColor) ⇒ <code>string</code>
    * [.generateDataPointArray(data, from, to)](#module_DATA_LOAD.generateDataPointArray) ⇒ <code>Array</code>

<a name="module_DATA_LOAD.initialize"></a>

### DATA_LOAD.initialize()
initializes the 'data load' window

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.open"></a>

### DATA_LOAD.open()
opens the 'data load' window

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.close"></a>

### DATA_LOAD.close()
closes the 'data load' window

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.initializeDropArea"></a>

### DATA_LOAD.initializeDropArea()
initializes the file drop area in the 'data load' window

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.highlightDropArea"></a>

### DATA_LOAD.highlightDropArea()
adds the 'highlight' effect to the file drop area

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.unhighlightDropArea"></a>

### DATA_LOAD.unhighlightDropArea()
removes the 'highlight' effect from the file drop area

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.handleDroppedFile"></a>

### DATA_LOAD.handleDroppedFile(e)
handles dropped file in drop area and sends it to processFile()

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | drop event |

<a name="module_DATA_LOAD.handleSelectedFile"></a>

### DATA_LOAD.handleSelectedFile(e)
handles file from 'select button' in drop area and sends it to processFile()

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | event triggered as a file is selected |

<a name="module_DATA_LOAD.processFile"></a>

### DATA_LOAD.processFile(file)
reads a given file and sends the string to parseJSON()

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>Object</code> | file reference |

<a name="module_DATA_LOAD.parseJSON"></a>

### DATA_LOAD.parseJSON(str)
parses a string into a JSON object and sends it to visualizeObject()

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | JSON data |

<a name="module_DATA_LOAD.startDataSetLoading"></a>

### DATA_LOAD.startDataSetLoading(e)
called from a button to load a specific data set (name is in button's 'load-data' HTML property

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | click event |

<a name="module_DATA_LOAD.loadHttpDataSet"></a>

### DATA_LOAD.loadHttpDataSet(url, [showConfirmation]) ⇒ <code>Object</code>
request a data set from an url (must be same origin server!)

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
**Returns**: <code>Object</code> - request - XMLHttpRequest  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | link to JSON data set |
| [showConfirmation] | <code>boolean</code> | <code>false</code> | set to true, if a confirmation message that a 'data set' was loaded, should be shown in 'data load' window |

<a name="module_DATA_LOAD.visualizeObject"></a>

### DATA_LOAD.visualizeObject(obj, [showConfirmation])
takes a 'data set' object and creates the HTML nodes need for the charts and sends the ANIMATOR object the right animation values

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>Object</code> |  | JSON data set as object |
| [showConfirmation] | <code>boolean</code> | <code>false</code> | set to true, if a confirmation message that a 'data set' was loaded, should be shown in 'data load' window |

<a name="module_DATA_LOAD.openIndividualChart"></a>

### DATA_LOAD.openIndividualChart(e)
click event to open the individual chart for a column

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | click event |

<a name="module_DATA_LOAD.getRatioChartPart"></a>

### DATA_LOAD.getRatioChartPart(key, color, data, key_name, [icon_url]) ⇒ <code>Object</code>
generates HTML node for data key of ratio chart

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
**Returns**: <code>Object</code> - HTML node for specific key of the ratio chart  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key in data set |
| color | <code>string</code> | HEX code with the color of this specific data key |
| data | <code>Object</code> |  |
| key_name | <code>string</code> | display name of key |
| [icon_url] | <code>string</code> |  |

<a name="module_DATA_LOAD.getColumn"></a>

### DATA_LOAD.getColumn(key, color, key_name, [icon_url]) ⇒ <code>Object</code>
generates HTML node for a key of column chart

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
**Returns**: <code>Object</code> - HTML node for specific key of the column chart  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key in data set |
| color | <code>string</code> | HEX code with the color of this specific data key |
| key_name | <code>string</code> | display name of key |
| [icon_url] | <code>string</code> |  |

<a name="module_DATA_LOAD.getColumnColor"></a>

### DATA_LOAD.getColumnColor(index) ⇒ <code>string</code>
returns a HEX color code a selection of colors depending on the given index

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
**Returns**: <code>string</code> - HEX color code  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | must be integer |

<a name="module_DATA_LOAD.generateDataPointArray"></a>

### DATA_LOAD.generateDataPointArray(data, from, to) ⇒ <code>Array</code>
generates an enlarged array of data values the animation data of a key

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
**Returns**: <code>Array</code> - animation values (50x the number of input data points)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | JSON data |
| from | <code>number</code> | start data-point-key in data |
| to | <code>number</code> | end data-point-key in data |

<a name="module_MSG"></a>

## MSG
manages on-screen messages


* [MSG](#module_MSG)
    * [.generateHTML(text, type)](#module_MSG.generateHTML) ⇒ <code>Object</code>
    * [.show(text, close_after_ms, type)](#module_MSG.show)
    * [.error(text, close_after_ms)](#module_MSG.error)
    * [.warning(text, close_after_ms)](#module_MSG.warning)
    * [.hide()](#module_MSG.hide)

<a name="module_MSG.generateHTML"></a>

### MSG.generateHTML(text, type) ⇒ <code>Object</code>
generates the HTML for a message element

**Kind**: static method of [<code>MSG</code>](#module_MSG)  
**Returns**: <code>Object</code> - HTML node  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | content of the message |
| type | <code>string</code> | type of the message, defined in MSG.type |

<a name="module_MSG.show"></a>

### MSG.show(text, close_after_ms, type)
displays an overlay message

**Kind**: static method of [<code>MSG</code>](#module_MSG)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | content of the message |
| close_after_ms | <code>number</code> | milliseconds until the message gets closed |
| type | <code>string</code> | type of the message, defined in MSG.type |

<a name="module_MSG.error"></a>

### MSG.error(text, close_after_ms)
displays an overlay error message

**Kind**: static method of [<code>MSG</code>](#module_MSG)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | content of the message |
| close_after_ms | <code>number</code> | milliseconds until the message gets closed |

<a name="module_MSG.warning"></a>

### MSG.warning(text, close_after_ms)
displays an overlay warning message

**Kind**: static method of [<code>MSG</code>](#module_MSG)  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | content of the message |
| close_after_ms | <code>number</code> | milliseconds until the message gets closed |

<a name="module_MSG.hide"></a>

### MSG.hide()
hides the current overlay message

**Kind**: static method of [<code>MSG</code>](#module_MSG)  
<a name="module_NAV"></a>

## NAV

* [NAV](#module_NAV)
    * [.initialize()](#module_NAV.initialize)
    * [.toggleDarkMode()](#module_NAV.toggleDarkMode)
    * [.enableButton(btn)](#module_NAV.enableButton)
    * [.disableButton(btn)](#module_NAV.disableButton)
    * [.onlyEnableButton(btn)](#module_NAV.onlyEnableButton)
    * [.showColumnChart()](#module_NAV.showColumnChart)
    * [.showIndividualChart()](#module_NAV.showIndividualChart)
    * [.setSpeed(e)](#module_NAV.setSpeed)
    * [.setCustomSpeed(e)](#module_NAV.setCustomSpeed)
    * [.showCustomSpeedMenu()](#module_NAV.showCustomSpeedMenu)
    * [.showDefinedSpeedMenu()](#module_NAV.showDefinedSpeedMenu)
    * [.downloadIndividualChart()](#module_NAV.downloadIndividualChart)

<a name="module_NAV.initialize"></a>

### NAV.initialize()
initializes navigation elements with events

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module_NAV.toggleDarkMode"></a>

### NAV.toggleDarkMode()
toggles dark mode setting

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module_NAV.enableButton"></a>

### NAV.enableButton(btn)
enables a button

**Kind**: static method of [<code>NAV</code>](#module_NAV)  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>Object</code> | HTML node |

<a name="module_NAV.disableButton"></a>

### NAV.disableButton(btn)
disables a button

**Kind**: static method of [<code>NAV</code>](#module_NAV)  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>Object</code> | HTML node |

<a name="module_NAV.onlyEnableButton"></a>

### NAV.onlyEnableButton(btn)
sets a specific 'speed setter' button active and disables all others

**Kind**: static method of [<code>NAV</code>](#module_NAV)  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>Object</code> | HTML node |

<a name="module_NAV.showColumnChart"></a>

### NAV.showColumnChart()
shows the 'column chart' and hides the 'individual chart'

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module_NAV.showIndividualChart"></a>

### NAV.showIndividualChart()
shows the 'individual chart' and hides the 'column chart'

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module_NAV.setSpeed"></a>

### NAV.setSpeed(e)
sets the animation speed in ANIMATOR relative to the button pressed

**Kind**: static method of [<code>NAV</code>](#module_NAV)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | from click on animation speed buttons |

<a name="module_NAV.setCustomSpeed"></a>

### NAV.setCustomSpeed(e)
sets a custom animation speed defined by input value of text input

**Kind**: static method of [<code>NAV</code>](#module_NAV)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | from input on custom animation speed text input |

<a name="module_NAV.showCustomSpeedMenu"></a>

### NAV.showCustomSpeedMenu()
shows 'custom speed' menu and hides 'defined speed' menu

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module_NAV.showDefinedSpeedMenu"></a>

### NAV.showDefinedSpeedMenu()
shows 'defined speed' menu and hides 'custom speed' menu

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module_NAV.downloadIndividualChart"></a>

### NAV.downloadIndividualChart()
downloads 'individual chart' canvas as .png image

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module__"></a>

## \_

* [_](#module__)
    * [.id(selector)](#module__.id) ⇒ <code>Object</code> \| <code>null</code>
    * [.class(selector, [context])](#module__.class) ⇒ <code>HTMLCollection</code> \| <code>null</code>
    * [.tag(selector, [context])](#module__.tag) ⇒ <code>HTMLCollection</code> \| <code>null</code>
    * [.select(selector, [context], [callback])](#module__.select) ⇒ <code>HTMLCollection</code> \| <code>null</code>
    * [.contains(parent, child)](#module__.contains) ⇒ <code>boolean</code>
    * [.create(str, [settings])](#module__.create) ⇒ <code>Object</code>
    * [.append(elem1, elem2)](#module__.append)
    * [.prepend(elem1, elem2)](#module__.prepend)
    * [.after(elem1, elem2)](#module__.after)
    * [.before(elem1, elem2)](#module__.before)
    * [.remove(elem)](#module__.remove)
    * [.empty(elem)](#module__.empty)
    * [.addEvent(elem, event, fn, [useCapture])](#module__.addEvent)
    * [.removeEvent(elem, event, fn, [useCapture])](#module__.removeEvent)
    * [.onClick(elem, fn, [useCapture])](#module__.onClick)
    * [.removeClick(elem, fn, [useCapture])](#module__.removeClick)
    * [.onInput(elem, fn, [useCapture])](#module__.onInput)
    * [.removeInput(elem, fn, [useCapture])](#module__.removeInput)
    * [.onLoad(elem, fn, [useCapture])](#module__.onLoad)
    * [.removeLoad(elem, fn, [useCapture])](#module__.removeLoad)
    * [.target(e)](#module__.target) ⇒ <code>Object</code>
    * [.preventDefault(e)](#module__.preventDefault)
    * [.addClass(elem, class_)](#module__.addClass)
    * [.removeClass(elem, class_)](#module__.removeClass)
    * [.toggleClass(elem, class_)](#module__.toggleClass)
    * [.hasClass(elem, class_)](#module__.hasClass)
    * [.getStyle(elem, style)](#module__.getStyle) ⇒ <code>string</code>
    * [.setStyles(elem, styles)](#module__.setStyles)
    * [.getHeight(elem)](#module__.getHeight) ⇒ <code>number</code>
    * [.getWidth(elem)](#module__.getWidth) ⇒ <code>number</code>
    * [.exists(val)](#module__.exists) ⇒ <code>boolean</code>
    * [.isElement(val)](#module__.isElement) ⇒ <code>boolean</code>
    * [.isElementInDOM(val)](#module__.isElementInDOM) ⇒ <code>boolean</code>
    * [.isFunction(n)](#module__.isFunction) ⇒ <code>boolean</code>
    * [.isObject(n)](#module__.isObject) ⇒ <code>boolean</code>
    * [.isArray(n)](#module__.isArray) ⇒ <code>boolean</code>
    * [.isString(n)](#module__.isString) ⇒ <code>boolean</code>
    * [.isNumber(n)](#module__.isNumber) ⇒ <code>boolean</code>
    * [.isInteger(n)](#module__.isInteger) ⇒ <code>boolean</code>
    * [.isFloat(n)](#module__.isFloat) ⇒ <code>boolean</code>
    * [.escapeRegex(str)](#module__.escapeRegex) ⇒ <code>string</code>
    * [.encodeHTML(str)](#module__.encodeHTML) ⇒ <code>string</code>
    * [.decodeHTML(str)](#module__.decodeHTML) ⇒ <code>string</code>
    * [.parseJSON(str)](#module__.parseJSON) ⇒ <code>Object</code>
    * [.sortArrayObjects(arr, property, [descending])](#module__.sortArrayObjects) ⇒ <code>Array</code>
    * [.isEmptyObject(obj)](#module__.isEmptyObject) ⇒ <code>boolean</code>
    * [.getAverage(arr)](#module__.getAverage) ⇒ <code>number</code>
    * [.getMin(arr, [start_minimum])](#module__.getMin) ⇒ <code>number</code>
    * [.getMax(arr, [start_maximum])](#module__.getMax) ⇒ <code>number</code>
    * [.removeArrayIndex(arr, index)](#module__.removeArrayIndex) ⇒ <code>Array</code>
    * [.limitNumber(num, min, max, [callback])](#module__.limitNumber) ⇒ <code>number</code>

<a name="module__.id"></a>

### _.id(selector) ⇒ <code>Object</code> \| <code>null</code>
selects HTML node by id

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Object</code> - if an element was found, returns HTML node<code>null</code> - if a wrong selector was given or no element was found  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | string containing a HTML id |

<a name="module__.class"></a>

### _.class(selector, [context]) ⇒ <code>HTMLCollection</code> \| <code>null</code>
selects HTML node(s) by class

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>HTMLCollection</code> - if the selector and context (if given) were valid<code>null</code> - if non-valid selector or context was given  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | string containing one or multiple space-seperated HTML classes |
| [context] | <code>string</code> | <code>&quot;document&quot;</code> | container element in which to search for class |

<a name="module__.tag"></a>

### _.tag(selector, [context]) ⇒ <code>HTMLCollection</code> \| <code>null</code>
selects HTML node(s) by tag

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>HTMLCollection</code> - if the selector and context (if given) were valid<code>null</code> - if non-valid selector or context was given  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | string containing a HTML tag |
| [context] | <code>string</code> | <code>&quot;document&quot;</code> | container element in which to search for tag |

<a name="module__.select"></a>

### _.select(selector, [context], [callback]) ⇒ <code>HTMLCollection</code> \| <code>null</code>
selects HTML node(s) using a CSS selector

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>HTMLCollection</code> - if the selector and context (if given) were valid<code>null</code> - if non-valid selector or context was given  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | string containing a valid CSS selector |
| [context] | <code>string</code> | <code>&quot;document&quot;</code> | container element in which to search for tag |
| [callback] | <code>function</code> |  | called when querySelector is not supported by browser |

<a name="module__.contains"></a>

### _.contains(parent, child) ⇒ <code>boolean</code>
check if the first HTML node contains the second

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - returns true if the first HTML node contains the second  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Object</code> | supposed parent HTML node |
| child | <code>Object</code> | supposed child HTML node |

<a name="module__.create"></a>

### _.create(str, [settings]) ⇒ <code>Object</code>
creates a new HTML node

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Object</code> - created HTML node  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | selector in the form of tag#id.class1.class2 |
| [settings] | <code>Object</code> | object holding the HTML and style properties |

<a name="module__.append"></a>

### _.append(elem1, elem2)
appends elem2 in elem1

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem1 | <code>Object</code> | HTML node |
| elem2 | <code>Object</code> | HTML node to append |

<a name="module__.prepend"></a>

### _.prepend(elem1, elem2)
prepends elem2 in elem1

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem1 | <code>Object</code> | HTML node |
| elem2 | <code>Object</code> | HTML node to prepend |

<a name="module__.after"></a>

### _.after(elem1, elem2)
inserts elem2 after elem1

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem1 | <code>Object</code> | HTML node |
| elem2 | <code>Object</code> | HTML node to insert |

<a name="module__.before"></a>

### _.before(elem1, elem2)
inserts elem2 before elem1

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem1 | <code>Object</code> | HTML node |
| elem2 | <code>Object</code> | HTML node to insert |

<a name="module__.remove"></a>

### _.remove(elem)
removes a HTML node from the DOM

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |

<a name="module__.empty"></a>

### _.empty(elem)
removes all child HTML nodes of a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |

<a name="module__.addEvent"></a>

### _.addEvent(elem, event, fn, [useCapture])
adds an event listener to a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node |
| event | <code>string</code> |  | event type |
| fn | <code>function</code> |  | function to be called when the event is triggered |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeEvent"></a>

### _.removeEvent(elem, event, fn, [useCapture])
removes an event listener from a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node on which the event was defined |
| event | <code>string</code> |  | event type |
| fn | <code>function</code> |  | function that was defined to be triggered from the event |
| [useCapture] | <code>boolean</code> | <code>false</code> | the same useCapture value defined when creating the event |

<a name="module__.onClick"></a>

### _.onClick(elem, fn, [useCapture])
adds a 'click' event listener to a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node |
| fn | <code>function</code> |  | function called on trigger |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeClick"></a>

### _.removeClick(elem, fn, [useCapture])
removes a 'click' event listener with the given parameters from a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node |
| fn | <code>function</code> |  | function |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.onInput"></a>

### _.onInput(elem, fn, [useCapture])
adds an 'input' event listener to a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node |
| fn | <code>function</code> |  | function called on trigger |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeInput"></a>

### _.removeInput(elem, fn, [useCapture])
removes an 'input' event listener with the given parameters from a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node |
| fn | <code>function</code> |  | function |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.onLoad"></a>

### _.onLoad(elem, fn, [useCapture])
adds a 'load' event listener to a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node |
| fn | <code>function</code> |  | function called on trigger |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeLoad"></a>

### _.removeLoad(elem, fn, [useCapture])
removes a 'load' event listener with the given parameters from a HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML node |
| fn | <code>function</code> |  | function |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.target"></a>

### _.target(e) ⇒ <code>Object</code>
returns the target element of an event object

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Object</code> - target HTML node  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | HTML node on which the event was defined |

<a name="module__.preventDefault"></a>

### _.preventDefault(e)
prevents default event actions happening for this specific event

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type |
| --- | --- |
| e | <code>event</code> | 

<a name="module__.addClass"></a>

### _.addClass(elem, class_)
adds class to HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |
| class_ | <code>string</code> | class name (using multiple class names may not work in older browsers) |

<a name="module__.removeClass"></a>

### _.removeClass(elem, class_)
removes class from HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |
| class_ | <code>string</code> | class name (using multiple class names may not work in older browsers) |

<a name="module__.toggleClass"></a>

### _.toggleClass(elem, class_)
toggles class on and off on HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |
| class_ | <code>string</code> | class name (using multiple class names may not work in older browsers) |

<a name="module__.hasClass"></a>

### _.hasClass(elem, class_)
checks if the HTML node has the given class

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |
| class_ | <code>string</code> | single class name |

<a name="module__.getStyle"></a>

### _.getStyle(elem, style) ⇒ <code>string</code>
returns value of given css property

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>string</code> - CSS property value  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |
| style | <code>string</code> | CSS property name |

<a name="module__.setStyles"></a>

### _.setStyles(elem, styles)
sets the given CSS property values to the HTML node

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |
| styles | <code>Object</code> | Object holding key (CSS property name) and value (CSS property value) pairs |

<a name="module__.getHeight"></a>

### _.getHeight(elem) ⇒ <code>number</code>
returns browser-rendered height of HTML node

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - height in pixels  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |

<a name="module__.getWidth"></a>

### _.getWidth(elem) ⇒ <code>number</code>
returns browser-rendered width of HTML node

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - width in pixels  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML node |

<a name="module__.exists"></a>

### _.exists(val) ⇒ <code>boolean</code>
check if a value is defined and not null

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - returns true if the element exists  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 

<a name="module__.isElement"></a>

### _.isElement(val) ⇒ <code>boolean</code>
check if a value is a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 

<a name="module__.isElementInDOM"></a>

### _.isElementInDOM(val) ⇒ <code>boolean</code>
check if a value is a HTML element in the DOM

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 

<a name="module__.isFunction"></a>

### _.isFunction(n) ⇒ <code>boolean</code>
tests if variable is a function

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if variable is a function  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 

<a name="module__.isObject"></a>

### _.isObject(n) ⇒ <code>boolean</code>
tests if variable is an object (excluding null object)

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if variable is an object (excluding null)  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 

<a name="module__.isArray"></a>

### _.isArray(n) ⇒ <code>boolean</code>
tests if variable is an array

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if variable is an array  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 

<a name="module__.isString"></a>

### _.isString(n) ⇒ <code>boolean</code>
tests if variable is a string

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if variable is a string  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 

<a name="module__.isNumber"></a>

### _.isNumber(n) ⇒ <code>boolean</code>
tests if variable is a number

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if variable is a number  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 

<a name="module__.isInteger"></a>

### _.isInteger(n) ⇒ <code>boolean</code>
tests if variable is an integer

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if variable is an integer  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 

<a name="module__.isFloat"></a>

### _.isFloat(n) ⇒ <code>boolean</code>
tests if variable is a float (floating point number)

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if variable is a float  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 

<a name="module__.escapeRegex"></a>

### _.escapeRegex(str) ⇒ <code>string</code>
escapes string to be regex-compatible

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>string</code> - escaped regex-friendly string  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module__.encodeHTML"></a>

### _.encodeHTML(str) ⇒ <code>string</code>
encodes HTML reserved characters in a string

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>string</code> - encoded HTML-friendly string  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module__.decodeHTML"></a>

### _.decodeHTML(str) ⇒ <code>string</code>
decodes HTML reserved characters in a string

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>string</code> - decoded string  

| Param | Type |
| --- | --- |
| str | <code>string</code> | 

<a name="module__.parseJSON"></a>

### _.parseJSON(str) ⇒ <code>Object</code>
parses a string containing JSON data and returns it as an object

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Object</code> - object with JSON structure  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | JSON string |

<a name="module__.sortArrayObjects"></a>

### _.sortArrayObjects(arr, property, [descending]) ⇒ <code>Array</code>
sort array containing objects with the same key structure by the values of a given property

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Array</code> - sorted array  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> |  | array containing objects with the same key structure |
| property | <code>string</code> |  | property name (key) by which values to sort |
| [descending] | <code>Array</code> | <code>false</code> | final order of sorted values |

<a name="module__.isEmptyObject"></a>

### _.isEmptyObject(obj) ⇒ <code>boolean</code>
check if an object is empty

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if the object is empty  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module__.getAverage"></a>

### _.getAverage(arr) ⇒ <code>number</code>
returns the average of an array of number

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - average of numbers  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> | array of numbers |

<a name="module__.getMin"></a>

### _.getMin(arr, [start_minimum]) ⇒ <code>number</code>
returns the smallest number of an array of number

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - smallest number  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> |  | array of numbers |
| [start_minimum] | <code>number</code> | <code>Number.MAX_VALUE</code> | returned number needs to be smaller than this number |

<a name="module__.getMax"></a>

### _.getMax(arr, [start_maximum]) ⇒ <code>number</code>
returns the biggest number of an array of number

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - biggest number  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| arr | <code>Array</code> |  | array of numbers |
| [start_maximum] | <code>number</code> | <code>Number.MIN_VALUE</code> | returned number needs to be at least this big |

<a name="module__.removeArrayIndex"></a>

### _.removeArrayIndex(arr, index) ⇒ <code>Array</code>
removes an index from an array

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Array</code> - array without this index  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> |  |
| index | <code>number</code> | index position to remove |

<a name="module__.limitNumber"></a>

### _.limitNumber(num, min, max, [callback]) ⇒ <code>number</code>
replaces a number if it exceeds the given upper or lower limit

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - 'num' (or the closest number to it in range of min to max)  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | number to process |
| min | <code>number</code> | smallest the number is allowed to be |
| max | <code>number</code> | biggest the number is allowed to be |
| [callback] | <code>function</code> | called if the number had been below or above the limit |

<a name="module_ANIMATOR"></a>

## ANIMATOR

* [ANIMATOR](#module_ANIMATOR)
    * [.initialize()](#module_ANIMATOR.initialize)
    * [.setRange(from, to)](#module_ANIMATOR.setRange)
    * [.setTime(time)](#module_ANIMATOR.setTime)
    * [.setCSSTransitions()](#module_ANIMATOR.setCSSTransitions)
    * [.setData(obj)](#module_ANIMATOR.setData)
    * [.setColumns(obj)](#module_ANIMATOR.setColumns)
    * [.setRatioParts(obj)](#module_ANIMATOR.setRatioParts)
    * [.setInvidualChartKeys(keys)](#module_ANIMATOR.setInvidualChartKeys)
    * [.addIndividualKey(key)](#module_ANIMATOR.addIndividualKey)
    * [.removeIndividualKey(key)](#module_ANIMATOR.removeIndividualKey)
    * [.hasIndividualKey(key)](#module_ANIMATOR.hasIndividualKey) ⇒ <code>boolean</code>
    * [.startLoop()](#module_ANIMATOR.startLoop)
    * [.stopLoop()](#module_ANIMATOR.stopLoop)
    * [.play()](#module_ANIMATOR.play)
    * [.pause()](#module_ANIMATOR.pause)
    * [.restart()](#module_ANIMATOR.restart)
    * [.end()](#module_ANIMATOR.end)
    * [.stop()](#module_ANIMATOR.stop)
    * [.formatNumber(num)](#module_ANIMATOR.formatNumber) ⇒ <code>string</code>
    * [.update()](#module_ANIMATOR.update)
    * [.refreshFrame()](#module_ANIMATOR.refreshFrame)
    * [.updateColumnChart()](#module_ANIMATOR.updateColumnChart)
    * [.updateColumnRatioChart()](#module_ANIMATOR.updateColumnRatioChart)
    * [.updateIndividualCharts()](#module_ANIMATOR.updateIndividualCharts)
    * [.drawIndividualKey(canvas, context, padding, color, min, max, data)](#module_ANIMATOR.drawIndividualKey)

<a name="module_ANIMATOR.initialize"></a>

### ANIMATOR.initialize()
initializes the animator

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.setRange"></a>

### ANIMATOR.setRange(from, to)
sets the range for the animation

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>number</code> | start data-point-key |
| to | <code>number</code> | end data-point-key |

<a name="module_ANIMATOR.setTime"></a>

### ANIMATOR.setTime(time)
sets the speed of the animation

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type |
| --- | --- |
| time | <code>number</code> | 

<a name="module_ANIMATOR.setCSSTransitions"></a>

### ANIMATOR.setCSSTransitions()
sets CSS transition duration of animated elements

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.setData"></a>

### ANIMATOR.setData(obj)
sets the animation data points

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | data object |

<a name="module_ANIMATOR.setColumns"></a>

### ANIMATOR.setColumns(obj)
sets the columns in the 'column chart'

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_ANIMATOR.setRatioParts"></a>

### ANIMATOR.setRatioParts(obj)
sets the animated parts in the 'ratio chart'

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_ANIMATOR.setInvidualChartKeys"></a>

### ANIMATOR.setInvidualChartKeys(keys)
sets keys, which are shown in the 'individual chart'

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type | Description |
| --- | --- | --- |
| keys | <code>Array</code> | array containing key names |

<a name="module_ANIMATOR.addIndividualKey"></a>

### ANIMATOR.addIndividualKey(key)
adds a key to be shown in the 'individual chart'

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key name |

<a name="module_ANIMATOR.removeIndividualKey"></a>

### ANIMATOR.removeIndividualKey(key)
removes a key from being shown in the 'individual chart'

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key name |

<a name="module_ANIMATOR.hasIndividualKey"></a>

### ANIMATOR.hasIndividualKey(key) ⇒ <code>boolean</code>
checks if a key is being shown in the 'individual chart'

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
**Returns**: <code>boolean</code> - true, if the key is in the list to be shown  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | key name |

<a name="module_ANIMATOR.startLoop"></a>

### ANIMATOR.startLoop()
starts the animation loop

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.stopLoop"></a>

### ANIMATOR.stopLoop()
stops the animation loop

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.play"></a>

### ANIMATOR.play()
starts the animation

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.pause"></a>

### ANIMATOR.pause()
pauses the animation

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.restart"></a>

### ANIMATOR.restart()
restarts the animation

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.end"></a>

### ANIMATOR.end()
stops animation without resetting, freezes it in last frame (no 'unpause' possible)

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.stop"></a>

### ANIMATOR.stop()
stops animation and resets it to start state

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.formatNumber"></a>

### ANIMATOR.formatNumber(num) ⇒ <code>string</code>
formats a number to its shortened word equivalent, for example 1000000 to 1.0 Million

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
**Returns**: <code>string</code> - formatted number  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

<a name="module_ANIMATOR.update"></a>

### ANIMATOR.update()
called by loop every frame and starts the animation pipeline

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.refreshFrame"></a>

### ANIMATOR.refreshFrame()
refreshes rendered frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.updateColumnChart"></a>

### ANIMATOR.updateColumnChart()
updates 'column chart' for current frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.updateColumnRatioChart"></a>

### ANIMATOR.updateColumnRatioChart()
updates 'ratio chart' for current frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.updateIndividualCharts"></a>

### ANIMATOR.updateIndividualCharts()
updates 'individual chart' for current frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.drawIndividualKey"></a>

### ANIMATOR.drawIndividualKey(canvas, context, padding, color, min, max, data)
draws a single key in the 'individual chart' for current frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type | Description |
| --- | --- | --- |
| canvas | <code>Object</code> | HTML node to drawing canvas |
| context | <code>Object</code> | Context of drawing canvas |
| padding | <code>Object</code> | Object holds 4 numbers for the padding on each site of the canvas |
| color | <code>string</code> | HEX color code |
| min | <code>number</code> | smallest value in data set |
| max | <code>number</code> | biggest value in data set |
| data | <code>Array</code> | data set of animation points for the key |

