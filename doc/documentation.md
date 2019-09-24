
# Documentation
[Back to main page](../README.md)

## Modules

<dl>
<dt><a href="#module_ANIMATOR">ANIMATOR</a></dt>
<dd><p>animates the charts in respect to the elapsed time</p>
</dd>
<dt><a href="#module_COMPARE_ITEMS">COMPARE_ITEMS</a></dt>
<dd><p>manages the &#39;compare items&#39; window</p>
</dd>
<dt><a href="#module_DATA_LOAD">DATA_LOAD</a></dt>
<dd><p>manages the &#39;data load&#39; window</p>
</dd>
<dt><a href="#module_DATA">DATA</a></dt>
<dd><p>processes and saves data</p>
</dd>
<dt><a href="#module_NODE">NODE</a></dt>
<dd><p>saves references to all HTML elements needed by the app</p>
</dd>
<dt><a href="#module_FILE">FILE</a></dt>
<dd><p>reads and validates the data from JSON data sets</p>
</dd>
<dt><a href="#module_MAIN">MAIN</a></dt>
<dd><p>contains main methods to initialize the web app</p>
</dd>
<dt><a href="#module_MSG">MSG</a></dt>
<dd><p>manages overlay messages</p>
</dd>
<dt><a href="#module_NAV">NAV</a></dt>
<dd><p>manages the UI of the navigation area</p>
</dd>
<dt><a href="#module__">_</a></dt>
<dd><p>contains utility functions</p>
</dd>
<dt><a href="#module_VISUALIZER">VISUALIZER</a></dt>
<dd><p>generates HTML elements for charts</p>
</dd>
</dl>

<a name="module_ANIMATOR"></a>

## ANIMATOR
animates the charts in respect to the elapsed time


* [ANIMATOR](#module_ANIMATOR)
    * [.initialize()](#module_ANIMATOR.initialize)
    * [.setSpeed(speed)](#module_ANIMATOR.setSpeed)
    * [.setCSSTransitions()](#module_ANIMATOR.setCSSTransitions)
    * [.startLoop()](#module_ANIMATOR.startLoop)
    * [.stopLoop()](#module_ANIMATOR.stopLoop)
    * [.play()](#module_ANIMATOR.play)
    * [.pause()](#module_ANIMATOR.pause)
    * [.restart()](#module_ANIMATOR.restart)
    * [.end()](#module_ANIMATOR.end)
    * [.stop()](#module_ANIMATOR.stop)
    * [.update()](#module_ANIMATOR.update)
    * [.refreshFrame()](#module_ANIMATOR.refreshFrame)
    * [.sortItems()](#module_ANIMATOR.sortItems)
    * [.updateBarChart()](#module_ANIMATOR.updateBarChart)
    * [.updateRatioChart()](#module_ANIMATOR.updateRatioChart)
    * [.updateLineChart()](#module_ANIMATOR.updateLineChart)
    * [.drawLineGraph(canvas, context, padding, item_id, min, max)](#module_ANIMATOR.drawLineGraph)

<a name="module_ANIMATOR.initialize"></a>

### ANIMATOR.initialize()
initializes the animator

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.setSpeed"></a>

### ANIMATOR.setSpeed(speed)
sets the speed of the animation

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type |
| --- | --- |
| speed | <code>number</code> | 

<a name="module_ANIMATOR.setCSSTransitions"></a>

### ANIMATOR.setCSSTransitions()
sets CSS transition duration of animated HTML elements

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
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
<a name="module_ANIMATOR.update"></a>

### ANIMATOR.update()
called by loop every frame and starts the animation pipeline

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.refreshFrame"></a>

### ANIMATOR.refreshFrame()
refreshes rendered frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.sortItems"></a>

### ANIMATOR.sortItems()
sorts items by their current value in tick

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.updateBarChart"></a>

### ANIMATOR.updateBarChart()
updates 'bar chart' values for current frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.updateRatioChart"></a>

### ANIMATOR.updateRatioChart()
updates 'ratio chart' values for current tick

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.updateLineChart"></a>

### ANIMATOR.updateLineChart()
updates 'line chart' for current frame

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  
<a name="module_ANIMATOR.drawLineGraph"></a>

### ANIMATOR.drawLineGraph(canvas, context, padding, item_id, min, max)
draws a line graph for an item on the line chart

**Kind**: static method of [<code>ANIMATOR</code>](#module_ANIMATOR)  

| Param | Type | Description |
| --- | --- | --- |
| canvas | <code>Object</code> | HTML canvas |
| context | <code>Object</code> | Context of drawing canvas |
| padding | <code>Object</code> | Object holds 4 numbers for the padding on each site of the canvas |
| item_id | <code>string</code> |  |
| min | <code>number</code> | smallest value of all items displayed in line chart |
| max | <code>number</code> | biggest value of all items displayed in line chart |

<a name="module_COMPARE_ITEMS"></a>

## COMPARE\_ITEMS
manages the 'compare items' window


* [COMPARE_ITEMS](#module_COMPARE_ITEMS)
    * [.setItemIds(ids)](#module_COMPARE_ITEMS.setItemIds)
    * [.addItemId(id)](#module_COMPARE_ITEMS.addItemId)
    * [.removeItemId(id)](#module_COMPARE_ITEMS.removeItemId)
    * [.hasItemId(id)](#module_COMPARE_ITEMS.hasItemId) ⇒ <code>boolean</code>
    * [.resetItemIds()](#module_COMPARE_ITEMS.resetItemIds)
    * [.initialize()](#module_COMPARE_ITEMS.initialize)
    * [.openWindow()](#module_COMPARE_ITEMS.openWindow)
    * [.closeWindow()](#module_COMPARE_ITEMS.closeWindow)
    * [.createButtons()](#module_COMPARE_ITEMS.createButtons)
    * [.orderButtons()](#module_COMPARE_ITEMS.orderButtons)
    * [.moveButton(e)](#module_COMPARE_ITEMS.moveButton)

<a name="module_COMPARE_ITEMS.setItemIds"></a>

### COMPARE_ITEMS.setItemIds(ids)
sets items ids to compare in line chart

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  

| Param | Type | Description |
| --- | --- | --- |
| ids | <code>Array</code> | array of item ids (strings) |

<a name="module_COMPARE_ITEMS.addItemId"></a>

### COMPARE_ITEMS.addItemId(id)
adds an items id to compare in line chart

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | item id |

<a name="module_COMPARE_ITEMS.removeItemId"></a>

### COMPARE_ITEMS.removeItemId(id)
removes an items id, not to compare in line chart

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | item id |

<a name="module_COMPARE_ITEMS.hasItemId"></a>

### COMPARE_ITEMS.hasItemId(id) ⇒ <code>boolean</code>
check if an item is set to be compared in line chart

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  
**Returns**: <code>boolean</code> - true, if the item id is selected for comparison  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | item id |

<a name="module_COMPARE_ITEMS.resetItemIds"></a>

### COMPARE_ITEMS.resetItemIds()
resets item IDs selected for comparison in line chart

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  
<a name="module_COMPARE_ITEMS.initialize"></a>

### COMPARE_ITEMS.initialize()
initializes the 'compare items' window

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  
<a name="module_COMPARE_ITEMS.openWindow"></a>

### COMPARE_ITEMS.openWindow()
opens the 'compare items' window

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  
<a name="module_COMPARE_ITEMS.closeWindow"></a>

### COMPARE_ITEMS.closeWindow()
closes the 'compare items' window

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  
<a name="module_COMPARE_ITEMS.createButtons"></a>

### COMPARE_ITEMS.createButtons()
creates the buttons in the 'compare items' window

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  
<a name="module_COMPARE_ITEMS.orderButtons"></a>

### COMPARE_ITEMS.orderButtons()
moves the buttons into the correct position in the window

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  
<a name="module_COMPARE_ITEMS.moveButton"></a>

### COMPARE_ITEMS.moveButton(e)
handles the click on buttons in window for (un-)selecting items for line chart

**Kind**: static method of [<code>COMPARE\_ITEMS</code>](#module_COMPARE_ITEMS)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | click event |

<a name="module_DATA_LOAD"></a>

## DATA\_LOAD
manages the 'data load' window


* [DATA_LOAD](#module_DATA_LOAD)
    * [.initialize()](#module_DATA_LOAD.initialize)
    * [.openWindow()](#module_DATA_LOAD.openWindow)
    * [.closeWindow()](#module_DATA_LOAD.closeWindow)
    * [.getDroppedFile(e)](#module_DATA_LOAD.getDroppedFile) ⇒ <code>Object</code>

<a name="module_DATA_LOAD.initialize"></a>

### DATA_LOAD.initialize()
initializes the 'data load' window

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.openWindow"></a>

### DATA_LOAD.openWindow()
opens the 'data load' window

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.closeWindow"></a>

### DATA_LOAD.closeWindow()
closes the 'data load' window

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
<a name="module_DATA_LOAD.getDroppedFile"></a>

### DATA_LOAD.getDroppedFile(e) ⇒ <code>Object</code>
gets dropped file from a drop event

**Kind**: static method of [<code>DATA\_LOAD</code>](#module_DATA_LOAD)  
**Returns**: <code>Object</code> - file  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | drop event |

<a name="module_DATA"></a>

## DATA
processes and saves data


* [DATA](#module_DATA)
    * [.set(obj)](#module_DATA.set)
    * [.setItems(obj)](#module_DATA.setItems)
    * [.setRange(from, to)](#module_DATA.setRange)
    * [.setDataPoints(data)](#module_DATA.setDataPoints)
    * [.getMax(item)](#module_DATA.getMax) ⇒ <code>Object</code>
    * [.getMin(item)](#module_DATA.getMin) ⇒ <code>Object</code>
    * [.getMean(item)](#module_DATA.getMean) ⇒ <code>Object</code>
    * [.getTotalMax(index)](#module_DATA.getTotalMax) ⇒ <code>number</code>
    * [.getTotalMin(index)](#module_DATA.getTotalMin) ⇒ <code>number</code>
    * [.getTotalMean(index)](#module_DATA.getTotalMean) ⇒ <code>number</code>
    * [.calculateFixedData()](#module_DATA.calculateFixedData)
    * [.calculateUpscaledData()](#module_DATA.calculateUpscaledData)
    * [.calculateStatistics()](#module_DATA.calculateStatistics)
    * [.getItemColor(index)](#module_DATA.getItemColor) ⇒ <code>string</code>
    * [.formatNumber(num)](#module_DATA.formatNumber) ⇒ <code>string</code>

<a name="module_DATA.set"></a>

### DATA.set(obj)
sets all values for the data set

**Kind**: static method of [<code>DATA</code>](#module_DATA)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | JSON data object |

<a name="module_DATA.setItems"></a>

### DATA.setItems(obj)
sets all meta information of the items

**Kind**: static method of [<code>DATA</code>](#module_DATA)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | object holding meta information about the items in the data set |

<a name="module_DATA.setRange"></a>

### DATA.setRange(from, to)
sets the range for the animation

**Kind**: static method of [<code>DATA</code>](#module_DATA)  

| Param | Type | Description |
| --- | --- | --- |
| from | <code>number</code> | start time |
| to | <code>number</code> | end time |

<a name="module_DATA.setDataPoints"></a>

### DATA.setDataPoints(data)
sets the data points (original, fixed, upscaled)

**Kind**: static method of [<code>DATA</code>](#module_DATA)  

| Param | Type |
| --- | --- |
| data | <code>Object</code> | 

<a name="module_DATA.getMax"></a>

### DATA.getMax(item) ⇒ <code>Object</code>
returns the highest value of item's data points

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
**Returns**: <code>Object</code> - holding the maximum as 'value' and 'formatted'  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>string</code> | item id |

<a name="module_DATA.getMin"></a>

### DATA.getMin(item) ⇒ <code>Object</code>
returns the smallest value of item's data points

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
**Returns**: <code>Object</code> - holding the minimum as 'value' and 'formatted'  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>string</code> | item id |

<a name="module_DATA.getMean"></a>

### DATA.getMean(item) ⇒ <code>Object</code>
returns the mean average value of item's data points

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
**Returns**: <code>Object</code> - holding the mean average as 'value' and 'formatted'  

| Param | Type | Description |
| --- | --- | --- |
| item | <code>string</code> | item id |

<a name="module_DATA.getTotalMax"></a>

### DATA.getTotalMax(index) ⇒ <code>number</code>
returns the highest value of all item at the index

**Kind**: static method of [<code>DATA</code>](#module_DATA)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | tick |

<a name="module_DATA.getTotalMin"></a>

### DATA.getTotalMin(index) ⇒ <code>number</code>
returns the smallest value of all item at the index

**Kind**: static method of [<code>DATA</code>](#module_DATA)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | tick |

<a name="module_DATA.getTotalMean"></a>

### DATA.getTotalMean(index) ⇒ <code>number</code>
returns the mean average value of all item at the index

**Kind**: static method of [<code>DATA</code>](#module_DATA)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | tick |

<a name="module_DATA.calculateFixedData"></a>

### DATA.calculateFixedData()
calculates an object with missing data values being filled in

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
<a name="module_DATA.calculateUpscaledData"></a>

### DATA.calculateUpscaledData()
calculates an object with data points increased to (item_num-1)*50+1

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
<a name="module_DATA.calculateStatistics"></a>

### DATA.calculateStatistics()
calculates the min, max and mean of all data point values for every item

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
<a name="module_DATA.getItemColor"></a>

### DATA.getItemColor(index) ⇒ <code>string</code>
returns a HEX color code from a limited selection; depends on given index

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
**Returns**: <code>string</code> - HEX color code  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | integer |

<a name="module_DATA.formatNumber"></a>

### DATA.formatNumber(num) ⇒ <code>string</code>
formats a number to its shortened word equivalent, e.g. 1300000 -> "1.3 Million"

**Kind**: static method of [<code>DATA</code>](#module_DATA)  
**Returns**: <code>string</code> - formatted number  

| Param | Type |
| --- | --- |
| num | <code>number</code> | 

<a name="module_NODE"></a>

## NODE
saves references to all HTML elements needed by the app


* [NODE](#module_NODE)
    * [.initializeDataLoadWindow()](#module_NODE.initializeDataLoadWindow)
    * [.initializeCompareItemsWindow()](#module_NODE.initializeCompareItemsWindow)
    * [.initializeBarChart()](#module_NODE.initializeBarChart)
    * [.initialize()](#module_NODE.initialize)

<a name="module_NODE.initializeDataLoadWindow"></a>

### NODE.initializeDataLoadWindow()
adds missing references to HTML elements for 'data load' window

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_NODE.initializeCompareItemsWindow"></a>

### NODE.initializeCompareItemsWindow()
adds missing references to HTML elements for 'compare items' window

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_NODE.initializeBarChart"></a>

### NODE.initializeBarChart()
adds missing references to HTML elements for 'bar chart'

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_NODE.initialize"></a>

### NODE.initialize()
adds missing references to HTML elements

**Kind**: static method of [<code>NODE</code>](#module_NODE)  
<a name="module_FILE"></a>

## FILE
reads and validates the data from JSON data sets


* [FILE](#module_FILE)
    * [.highlightDropArea()](#module_FILE.highlightDropArea)
    * [.unhighlightDropArea()](#module_FILE.unhighlightDropArea)
    * [.loadURL(url, [showConfirmation])](#module_FILE.loadURL) ⇒ <code>Object</code>
    * [.process(file)](#module_FILE.process)
    * [.getObjectFromJSON(str)](#module_FILE.getObjectFromJSON) ⇒ <code>Object</code>
    * [.isValidData(json)](#module_FILE.isValidData) ⇒ <code>boolean</code> \| <code>string</code>

<a name="module_FILE.highlightDropArea"></a>

### FILE.highlightDropArea()
adds the 'highlight' effect to the file drop area

**Kind**: static method of [<code>FILE</code>](#module_FILE)  
<a name="module_FILE.unhighlightDropArea"></a>

### FILE.unhighlightDropArea()
removes the 'highlight' effect from the file drop area

**Kind**: static method of [<code>FILE</code>](#module_FILE)  
<a name="module_FILE.loadURL"></a>

### FILE.loadURL(url, [showConfirmation]) ⇒ <code>Object</code>
loads a data set from a URL (same origin)

**Kind**: static method of [<code>FILE</code>](#module_FILE)  
**Returns**: <code>Object</code> - request - XMLHttpRequest  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | link to JSON data set |
| [showConfirmation] | <code>boolean</code> | <code>false</code> | set to true, if a confirmation message that a 'data set' was loaded, should be shown in 'data load' window |

<a name="module_FILE.process"></a>

### FILE.process(file)
reads a JSON file and sends the generated object to MAIN

**Kind**: static method of [<code>FILE</code>](#module_FILE)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>Object</code> | file reference |

<a name="module_FILE.getObjectFromJSON"></a>

### FILE.getObjectFromJSON(str) ⇒ <code>Object</code>
parses a string into a JSON object

**Kind**: static method of [<code>FILE</code>](#module_FILE)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | JSON data |

<a name="module_FILE.isValidData"></a>

### FILE.isValidData(json) ⇒ <code>boolean</code> \| <code>string</code>
determines if the given data set is valid

**Kind**: static method of [<code>FILE</code>](#module_FILE)  
**Returns**: <code>boolean</code> - true, if data set is valid<code>string</code> - error message, if it's an invalid object  

| Param | Type |
| --- | --- |
| json | <code>Object</code> | 

<a name="module_MAIN"></a>

## MAIN
contains main methods to initialize the web app


* [MAIN](#module_MAIN)
    * [.initializeDataSet(str, [showConfirmation])](#module_MAIN.initializeDataSet)
    * [.initialize()](#module_MAIN.initialize)

<a name="module_MAIN.initializeDataSet"></a>

### MAIN.initializeDataSet(str, [showConfirmation])
takes a data set as a string, and initializes the web app with the values

**Kind**: static method of [<code>MAIN</code>](#module_MAIN)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| str | <code>string</code> |  | JSON data as string |
| [showConfirmation] | <code>boolean</code> | <code>false</code> | on true, shows a message that a 'data set' was loaded in 'data load' window |

<a name="module_MAIN.initialize"></a>

### MAIN.initialize()
initializes all components of the web app and loads example data set

**Kind**: static method of [<code>MAIN</code>](#module_MAIN)  
<a name="module_MSG"></a>

## MSG
manages overlay messages


* [MSG](#module_MSG)
    * [.generateHTML(text, type)](#module_MSG.generateHTML) ⇒ <code>Object</code>
    * [.show(text, close_after_ms, type)](#module_MSG.show)
    * [.error(text, close_after_ms)](#module_MSG.error)
    * [.warn(text, close_after_ms)](#module_MSG.warn)
    * [.hide()](#module_MSG.hide)

<a name="module_MSG.generateHTML"></a>

### MSG.generateHTML(text, type) ⇒ <code>Object</code>
generates the HTML for a message element

**Kind**: static method of [<code>MSG</code>](#module_MSG)  
**Returns**: <code>Object</code> - HTML element  

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

<a name="module_MSG.warn"></a>

### MSG.warn(text, close_after_ms)
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
manages the UI of the navigation area


* [NAV](#module_NAV)
    * [.initialize()](#module_NAV.initialize)
    * [.toggleDarkMode()](#module_NAV.toggleDarkMode)
    * [.enableButton(btn)](#module_NAV.enableButton)
    * [.disableButton(btn)](#module_NAV.disableButton)
    * [.onlyEnableButton(btn)](#module_NAV.onlyEnableButton)
    * [.showBarChart()](#module_NAV.showBarChart)
    * [.showLineChart()](#module_NAV.showLineChart)
    * [.setSpeed(e)](#module_NAV.setSpeed)
    * [.setCustomSpeed(e)](#module_NAV.setCustomSpeed)
    * [.showCustomSpeedMenu()](#module_NAV.showCustomSpeedMenu)
    * [.showDefinedSpeedMenu()](#module_NAV.showDefinedSpeedMenu)
    * [.downloadLineChart()](#module_NAV.downloadLineChart)

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
| btn | <code>Object</code> | HTML element |

<a name="module_NAV.disableButton"></a>

### NAV.disableButton(btn)
disables a button

**Kind**: static method of [<code>NAV</code>](#module_NAV)  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>Object</code> | HTML element |

<a name="module_NAV.onlyEnableButton"></a>

### NAV.onlyEnableButton(btn)
sets a specific 'speed setter' button active and disables all others

**Kind**: static method of [<code>NAV</code>](#module_NAV)  

| Param | Type | Description |
| --- | --- | --- |
| btn | <code>Object</code> | HTML element |

<a name="module_NAV.showBarChart"></a>

### NAV.showBarChart()
shows the 'bar chart' and hides the 'line chart'

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module_NAV.showLineChart"></a>

### NAV.showLineChart()
shows the 'line chart' and hides the 'bar chart'

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
<a name="module_NAV.downloadLineChart"></a>

### NAV.downloadLineChart()
downloads 'line chart' canvas as .png image

**Kind**: static method of [<code>NAV</code>](#module_NAV)  
<a name="module__"></a>

## \_
contains utility functions


* [_](#module__)
    * [.id(selector)](#module__.id) ⇒ <code>Object</code>
    * [.class(selector, [context])](#module__.class) ⇒ <code>HTMLCollection</code>
    * [.tag(selector, [context])](#module__.tag) ⇒ <code>HTMLCollection</code>
    * [.select(selector, [context], [callback])](#module__.select) ⇒ <code>HTMLCollection</code>
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
    * [.hasClass(elem, class_)](#module__.hasClass) ⇒ <code>boolean</code>
    * [.getStyle(elem, style)](#module__.getStyle) ⇒ <code>string</code>
    * [.setStyles(elem, styles)](#module__.setStyles)
    * [.getHeight(elem)](#module__.getHeight) ⇒ <code>number</code>
    * [.getWidth(elem)](#module__.getWidth) ⇒ <code>number</code>
    * [.exists(val)](#module__.exists) ⇒ <code>boolean</code>
    * [.isElement(val)](#module__.isElement) ⇒ <code>boolean</code>
    * [.isElementInDOM(val)](#module__.isElementInDOM) ⇒ <code>boolean</code>
    * [.isNodelist(val)](#module__.isNodelist) ⇒ <code>boolean</code>
    * [.isHTMLCollection(val)](#module__.isHTMLCollection) ⇒ <code>boolean</code>
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
    * [.escapeDoubleQuotes(str)](#module__.escapeDoubleQuotes) ⇒ <code>string</code>
    * [.parseJSON(str)](#module__.parseJSON) ⇒ <code>Object</code>
    * [.getMean(arr)](#module__.getMean) ⇒ <code>number</code>
    * [.getMin(arr, [start_minimum])](#module__.getMin) ⇒ <code>number</code>
    * [.getMax(arr, [start_maximum])](#module__.getMax) ⇒ <code>number</code>
    * [.limitNumber(num, min, max, [callback])](#module__.limitNumber) ⇒ <code>number</code>
    * [.truncate(num)](#module__.truncate) ⇒ <code>number</code>
    * [.sortArrayObjects(arr, property, [descending])](#module__.sortArrayObjects) ⇒ <code>Array</code>
    * [.isEmptyObject(obj)](#module__.isEmptyObject) ⇒ <code>boolean</code>
    * [.removeArrayIndex(arr, index)](#module__.removeArrayIndex) ⇒ <code>Array</code>
    * [.getObjectSize(obj)](#module__.getObjectSize) ⇒ <code>number</code>

<a name="module__.id"></a>

### _.id(selector) ⇒ <code>Object</code>
selects HTML element by id

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Object</code> - if an element was found, returns HTML element  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | string containing a HTML id |

<a name="module__.class"></a>

### _.class(selector, [context]) ⇒ <code>HTMLCollection</code>
selects HTML element(s) by class

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>HTMLCollection</code> - if the selector and context (if given) were valid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | string containing one or multiple space-seperated HTML classes |
| [context] | <code>string</code> | <code>&quot;document&quot;</code> | container element in which to search for class |

<a name="module__.tag"></a>

### _.tag(selector, [context]) ⇒ <code>HTMLCollection</code>
selects HTML element(s) by tag

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>HTMLCollection</code> - if the selector and context (if given) were valid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | string containing a HTML tag |
| [context] | <code>string</code> | <code>&quot;document&quot;</code> | container element in which to search for tag |

<a name="module__.select"></a>

### _.select(selector, [context], [callback]) ⇒ <code>HTMLCollection</code>
selects HTML element(s) using a CSS selector

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>HTMLCollection</code> - if the selector and context (if given) were valid  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| selector | <code>string</code> |  | string containing a valid CSS selector |
| [context] | <code>string</code> | <code>&quot;document&quot;</code> | container element in which to search |
| [callback] | <code>function</code> |  | called when querySelector is not supported by browser |

<a name="module__.contains"></a>

### _.contains(parent, child) ⇒ <code>boolean</code>
check if the first HTML element contains the second

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - returns true if the first HTML element contains the second  

| Param | Type | Description |
| --- | --- | --- |
| parent | <code>Object</code> | supposed parent HTML element |
| child | <code>Object</code> | supposed child HTML element |

<a name="module__.create"></a>

### _.create(str, [settings]) ⇒ <code>Object</code>
creates a new HTML element

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Object</code> - created HTML element  

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
| elem1 | <code>Object</code> | HTML element |
| elem2 | <code>Object</code> | HTML element to append |

<a name="module__.prepend"></a>

### _.prepend(elem1, elem2)
prepends elem2 in elem1

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem1 | <code>Object</code> | HTML element |
| elem2 | <code>Object</code> | HTML element to prepend |

<a name="module__.after"></a>

### _.after(elem1, elem2)
inserts elem2 after elem1

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem1 | <code>Object</code> | HTML element |
| elem2 | <code>Object</code> | HTML element to insert |

<a name="module__.before"></a>

### _.before(elem1, elem2)
inserts elem2 before elem1

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem1 | <code>Object</code> | HTML element |
| elem2 | <code>Object</code> | HTML element to insert |

<a name="module__.remove"></a>

### _.remove(elem)
removes a HTML element from the DOM

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |

<a name="module__.empty"></a>

### _.empty(elem)
removes all child HTML elements of a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |

<a name="module__.addEvent"></a>

### _.addEvent(elem, event, fn, [useCapture])
adds an event listener to a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element |
| event | <code>string</code> |  | event type |
| fn | <code>function</code> |  | function to be called when the event is triggered |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeEvent"></a>

### _.removeEvent(elem, event, fn, [useCapture])
removes an event listener from a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element on which the event was defined |
| event | <code>string</code> |  | event type |
| fn | <code>function</code> |  | function that was defined to be triggered from the event |
| [useCapture] | <code>boolean</code> | <code>false</code> | the same useCapture value defined when creating the event |

<a name="module__.onClick"></a>

### _.onClick(elem, fn, [useCapture])
adds a 'click' event listener to a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element |
| fn | <code>function</code> |  | function called on trigger |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeClick"></a>

### _.removeClick(elem, fn, [useCapture])
removes a 'click' event listener with the given parameters from a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element |
| fn | <code>function</code> |  | function |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.onInput"></a>

### _.onInput(elem, fn, [useCapture])
adds an 'input' event listener to a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element |
| fn | <code>function</code> |  | function called on trigger |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeInput"></a>

### _.removeInput(elem, fn, [useCapture])
removes an 'input' event listener with the given parameters from a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element |
| fn | <code>function</code> |  | function |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.onLoad"></a>

### _.onLoad(elem, fn, [useCapture])
adds a 'load' event listener to a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element |
| fn | <code>function</code> |  | function called on trigger |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.removeLoad"></a>

### _.removeLoad(elem, fn, [useCapture])
removes a 'load' event listener with the given parameters from a HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| elem | <code>Object</code> |  | HTML element |
| fn | <code>function</code> |  | function |
| [useCapture] | <code>boolean</code> | <code>false</code> |  |

<a name="module__.target"></a>

### _.target(e) ⇒ <code>Object</code>
returns the target element of an event object

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Object</code> - target HTML element  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>event</code> | HTML element on which the event was defined |

<a name="module__.preventDefault"></a>

### _.preventDefault(e)
prevents default event actions happening for this specific event

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type |
| --- | --- |
| e | <code>event</code> | 

<a name="module__.addClass"></a>

### _.addClass(elem, class_)
adds class to HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |
| class_ | <code>string</code> | class name (using multiple class names may not work in older browsers) |

<a name="module__.removeClass"></a>

### _.removeClass(elem, class_)
removes class from HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |
| class_ | <code>string</code> | class name (using multiple class names may not work in older browsers) |

<a name="module__.toggleClass"></a>

### _.toggleClass(elem, class_)
toggles class on and off on HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |
| class_ | <code>string</code> | class name (using multiple class names may not work in older browsers) |

<a name="module__.hasClass"></a>

### _.hasClass(elem, class_) ⇒ <code>boolean</code>
checks if the HTML element has the given class

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>boolean</code> - true, if HTML element has the given class  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |
| class_ | <code>string</code> | single class name |

<a name="module__.getStyle"></a>

### _.getStyle(elem, style) ⇒ <code>string</code>
returns value of given css property

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>string</code> - CSS property value  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |
| style | <code>string</code> | CSS property name |

<a name="module__.setStyles"></a>

### _.setStyles(elem, styles)
sets the given CSS property values to the HTML element

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |
| styles | <code>Object</code> | Object holding key (CSS property name) and value (CSS property value) pairs |

<a name="module__.getHeight"></a>

### _.getHeight(elem) ⇒ <code>number</code>
returns browser-rendered height of HTML element

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - height in pixels  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |

<a name="module__.getWidth"></a>

### _.getWidth(elem) ⇒ <code>number</code>
returns browser-rendered width of HTML element

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - width in pixels  

| Param | Type | Description |
| --- | --- | --- |
| elem | <code>Object</code> | HTML element |

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

<a name="module__.isNodelist"></a>

### _.isNodelist(val) ⇒ <code>boolean</code>
check if a value is a HTML Nodelist

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 

<a name="module__.isHTMLCollection"></a>

### _.isHTMLCollection(val) ⇒ <code>boolean</code>
check if a value is a HTMLCollection

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

<a name="module__.escapeDoubleQuotes"></a>

### _.escapeDoubleQuotes(str) ⇒ <code>string</code>
escapes the double quotes in a string

**Kind**: static method of [<code>\_</code>](#module__)  

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

<a name="module__.getMean"></a>

### _.getMean(arr) ⇒ <code>number</code>
returns the mean average of an array of number

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

<a name="module__.truncate"></a>

### _.truncate(num) ⇒ <code>number</code>
strips digits after comma from a number

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>number</code> - truncated number  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>number</code> | number to truncate |

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

<a name="module__.removeArrayIndex"></a>

### _.removeArrayIndex(arr, index) ⇒ <code>Array</code>
removes an index from an array

**Kind**: static method of [<code>\_</code>](#module__)  
**Returns**: <code>Array</code> - array without this index  

| Param | Type | Description |
| --- | --- | --- |
| arr | <code>Array</code> |  |
| index | <code>number</code> | index position to remove |

<a name="module__.getObjectSize"></a>

### _.getObjectSize(obj) ⇒ <code>number</code>
returns the amount of keys in an object

**Kind**: static method of [<code>\_</code>](#module__)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> | 

<a name="module_VISUALIZER"></a>

## VISUALIZER
generates HTML elements for charts


* [VISUALIZER](#module_VISUALIZER)
    * [.createCharts()](#module_VISUALIZER.createCharts)
    * [.getBar(item_id)](#module_VISUALIZER.getBar) ⇒ <code>Object</code>
    * [.getRatioPart(item_id)](#module_VISUALIZER.getRatioPart) ⇒ <code>Object</code>
    * [.openLineChartOnClick(event)](#module_VISUALIZER.openLineChartOnClick)

<a name="module_VISUALIZER.createCharts"></a>

### VISUALIZER.createCharts()
creates the HTML elements needed for the charts using current DATA

**Kind**: static method of [<code>VISUALIZER</code>](#module_VISUALIZER)  
<a name="module_VISUALIZER.getBar"></a>

### VISUALIZER.getBar(item_id) ⇒ <code>Object</code>
generates HTML element for a item in the bar chart

**Kind**: static method of [<code>VISUALIZER</code>](#module_VISUALIZER)  
**Returns**: <code>Object</code> - multiple HTML elements in object  

| Param | Type |
| --- | --- |
| item_id | <code>string</code> | 

<a name="module_VISUALIZER.getRatioPart"></a>

### VISUALIZER.getRatioPart(item_id) ⇒ <code>Object</code>
generates HTML element for item in ratio chart

**Kind**: static method of [<code>VISUALIZER</code>](#module_VISUALIZER)  
**Returns**: <code>Object</code> - multiple HTML elements in object  

| Param | Type |
| --- | --- |
| item_id | <code>string</code> | 

<a name="module_VISUALIZER.openLineChartOnClick"></a>

### VISUALIZER.openLineChartOnClick(event)
called by a click event to open a specific line chart

**Kind**: static method of [<code>VISUALIZER</code>](#module_VISUALIZER)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>e</code> | click event |

