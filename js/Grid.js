


/*
GridModel contains an array of items that exist on planar coordinates
Each of these items are likely drawable

should this contain a reference to the background and foreground canvas?

*/
var GridModel =
{
    "items": []
    , "svg": {}
    , "scale": 0
    , "rows": 0
    , "columns": 0
}

var GridController =
{
    "init": function (grid, svg, rows, columns, scale)
    {
        grid.scale = scale || 32;
        grid.rows = rows || this.calcRows(grid.scale);
        grid.columns = columns || 2.5 * this.calcColumns(grid.scale);
        grid.svg = Object.create(SVGModel);
        SVGController.init(grid.svg, svg);

        return grid;
    }

    , "calcRows": function (scale)
    {
        var height = screen.height || window.screen.height;
        return height / scale;
    }

    , "calcColumns": function (scale)
    {
        var width = screen.width || window.screen.width;
        return width / scale;
    }

    , "drawHexGrid": function (grid)
    {
        var addMe = this.hexgrid(grid);
        SVGController.addItem(grid.svg, addMe);
    }

    , "hexgrid": function (grid)
    {
        var returnMe = document.createElementNS("http://www.w3.org/2000/svg", "g");
        returnMe.setAttribute("id", CONSTANTS.HEXGROUPID);

        for (var x = 0; x < grid.columns; x++)
        {
            for (var y = 0 ; y < grid.rows; y++)
            {
                var offset = this.getOffset(x, y, grid.scale);
                var item = SVGArtist.drawHexagon(offset.x, offset.y, grid.scale);
                item.setAttribute("id", this.getHexId(x, y));
                item.setAttribute("class", CONSTANTS.HEXCLASS);
                returnMe.appendChild(item);
            }
        }

        return returnMe;
    }

    , "getOffset": function (x, y, scale, rotated)
    {
        var offset = {};

        // the .866 is there to account for the slight difference a hex has between width and height.
        // without the -(x * .5) the alignment messes up for some sizes of hex
        if (!rotated)
        {
            offset.x = x * ((scale * CONSTANTS.HALFSQRT3) / 2);// - (x * .5);
            offset.y = ((x % 2) * (3 * scale / 4)) + (y * (scale * 1.5));
        }
        else
        {
            offset.x = x * ((scale * CONSTANTS.HALFSQRT3) / 2);// - (x * .5);
            offset.y = ((x % 2) * (3 * scale / 4)) + (y * (scale * 1.5));

        }

        return offset;
    }

    , "centerOnHex": function (offset, scale, width, height)
    {
        offset.x += .5 * scale;
        offset.x -= .5 * width;

        offset.y += .5 * scale;
        offset.y -= .5 * height;

        return offset;
    }

    , "highlightHex": function (grid, id)
    {
        grid.getChild(CONSTANTS.HEXGROUPID)[id].css += " " + CONSTANTS.HIGHLIGHTED;
    }

    , "getHexId": function (x, y)
    {
        return "hexX" + x + "Y" + y;
    }

    , "addItem": function (grid, item)
    {
        grid.items.push(item);
    }

    , "getItem": function (grid, i)
    {
        return grid.items[i];
    }

    , "getItems": function (grid)
    {
        return grid.items;
    }

    , "getItemCount": function (grid)
    {
        return grid.items.length;
    }

    , "getShapes": function (item)
    {
        var returnMe = [];

        for (var j = 0; j < item.getShapeCount(item) ; j++)
        {
            var shape = this.getScaledShape(item.getShape(j), scale);
            returnMe.push(shape);
        }

        return returnMe;
    }

    , "getScaledShape": function (shape, scale)
    {
        shape.position = getScaledPosition({ "x": item.position.x + shape.offset.x, "y": item.position.y + shape.offset.y }, scale);
        return shape;
    }

    , "getScaledPosition": function (position, scale)
    {
        return { "x": position.x * scale, "y": position.y * scale };
    }

    , "calcDistance": function (x, y, x2, y2)
    {
        return Math.abs(x2 - x) + Math.abs(y2 - y);
    }
};
