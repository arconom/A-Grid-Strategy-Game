$(window).scroll(function ()
{

    // to account for a footer
    //var end = $("#BottomThing").offset().top;
    var end = $(document).height();
    var viewEnd = $(window).scrollTop() + $(window).height();
    var distance = end - viewEnd;

    if (distance < 300) // do load
    //if ($(window).scrollTop() == $(document).height() - $(window).height())
    {
        // this needs to adjust the hexes rendered, only rendering the hexes within the viewport
        //redrawHexGrid();

        // First line appends elements in nice way, second assures that your function never stops at the bottom of the page
        //new_element.hide().appendTo('.your_div').fadeIn();
        //$(window).scrollTop($(window).scrollTop() - 1);

        // ajax call get data from server and append to the div
    }
});


$(document).ready(function ()
{
    console.log("UI start");
    /* 
    structure description:  
    foreground canvas contains the graphical representation of things contained by the grid
    background canvas contains the graphical representation of the environment on which the grid is placed
    grid is a container of entities that will interact via a coordinate system
    item is an entity that will exist in the grid
    char is a drawing that will represent item

    a method will request the items from the grid and send them to a canvas to be drawn.  
    How do we differentiate background from foreground items?  
    Another class that takes gridItems as input can return things that will be drawn on the background canvas.

    */

    //  add things in the order of their z-index, since SVG only does DOM ordering
    var grid = Object.create(GridModel);
    var item = Object.create(GridItemModel);
    var LOWCANVAS = Object.create(CanvasModel);
    var MAPCANVAS = Object.create(CanvasModel);
    var char = Object.create(ShapeModel);

    CanvasController.init(MAPCANVAS, CONSTANTS.MAPCANVAS);
    CanvasController.init(LOWCANVAS, CONSTANTS.LOWCANVAS);
    GridController.init(grid, "svgGrid", null, null, 64);
    GridItemController.init(item, "char", { "x": 3, "y": 5 }, { "width": 50, "height": 50 }, 1);
    //ShapeController.init(char, "steve", { "x": 0, "y": 0 }, "#000000", "#CCCCCC", 1, false);
    ShapeController.init(char, "steve", { "x": 0, "y": 0 }, false, null, null, 1, null, 1, false);

    GridController.drawHexGrid(grid);
    GridItemController.addShape(item, char);
    GridController.addItem(grid, item);

    var drawMe = GridController.getItems(grid);

    drawItems(LOWCANVAS, [item]);

    console.log("grid");
    console.log(grid);
    console.log("item");
    console.log(item);
    console.log("char");
    console.log(char);
    console.log("drawMe");
    console.log(drawMe);

});

function drawItems(canvas, items)
{
    console.log("canvas");
    console.log(canvas);

    for (var i = 0; i < items.length; i++)
    {
        CanvasController.drawShape(canvas, items[i]);
    }
}


var CONSTANTS =
{
    "SVGNAME": "svgGrid"
    // for storing the picture on top of which things will be drawn
    , "MAPCANVAS": "MAPCANVAS"
    // for storing markers that indicate the position of events
    , "LOWCANVAS": "LOWCANVAS"
    // for storing miniatures, objects, etc
    , "MEDCANVAS": "MEDCANVAS"
    // for fog of war
    , "HIGHCANVAS": "HIGHCANVAS"
    , "GRIDCSS": "grid"
    , "INVERTEDGRIDCSS": "invertedGrid"
    , "HEXGROUPID": "hexes"
    , "HIGHLIGHT": "highlighted"
    , "HEXCLASS": "hex"
    , "HALFSQRT3": Math.sqrt(3) / 2
}

var KeyInterface =
{
    "focus": {}

    , "KEYCODES":
    {
        "backspace": 8
       , "tab": 9
       , "enter": 13
       , "shift": 16
       , "ctrl": 17
       , "alt": 18
       , "pauseBreak": 19
       , "capsLock": 20
       , "escape": 27
       , "pageUp": 33
       , "pageDown": 34
       , "end": 35
       , "home": 36
       , "leftArrow": 37
       , "upArrow": 38
       , "rightArrow": 39
       , "downArrow": 40
       , "insert": 45
       , "delete": 46
       , "0": 48
       , "1": 49
       , "2": 50
       , "3": 51
       , "4": 52
       , "5": 53
       , "6": 54
       , "7": 55
       , "8": 56
       , "9": 57
       , "a": 65
       , "b": 66
       , "c": 67
       , "d": 68
       , "e": 69
       , "f": 70
       , "g": 71
       , "h": 72
       , "i": 73
       , "j": 74
       , "k": 75
       , "l": 76
       , "m": 77
       , "n": 78
       , "o": 79
       , "p": 80
       , "q": 81
       , "r": 82
       , "s": 83
       , "t": 84
       , "u": 85
       , "v": 86
       , "w": 87
       , "x": 88
       , "y": 89
       , "z": 90
       , "leftWindowKey": 91
       , "rightWindowKey": 92
       , "selectKey": 93
       , "numpad0": 96
       , "numpad1": 97
       , "numpad2": 98
       , "numpad3": 99
       , "numpad4": 100
       , "numpad5": 101
       , "numpad6": 102
       , "numpad7": 103
       , "numpad8": 104
       , "numpad9": 105
       , "multiply": 106
       , "add": 107
       , "subtract": 109
       , "decimalPoint": 110
       , "divide": 111
       , "f1": 112
       , "f2": 113
       , "f3": 114
       , "f4": 115
       , "f5": 116
       , "f6": 117
       , "f7": 118
       , "f8": 119
       , "f9": 120
       , "f10": 121
       , "f11": 122
       , "f12": 123
       , "numLock": 144
       , "scrollLock": 145
       , "semicolon": 186
       , "equal": 187
       , "comma": 188
       , "dash": 189
       , "period": 190
       , "forwardSlash": 191
       , "accent": 192
       , "openBracket": 219
       , "backSlash": 220
       , "closeBraket": 221
       , "singleQuote": 222
    }

    , "KeyPress": function (e)
    {
        // Ensure event is not null
        e = e || window.event;

        if ((e.which == 90 || e.keyCode == 90) && e.ctrlKey)
        {
            // Ctrl + Z
            // Do Something
        }
    }
}