
/*
I am a thing that is subordinate to a GridItemModel
name is a key referenced by the CanvasArtist to know what to draw
offset is an adjustment of the coordinates of the owning GridItemModel
fillStyle
strokeStyle
lineWidth
fill is a boolean that indicates fill preference
*/
var ShapeModel =
{
    "name": ""
    , "offset": {}
    , "collisions": false
    , "dimensions": {}
    , "fillStyle": ""
    , "scale": 0
    , "strokeStyle": ""
    , "lineWidth": 0
    , "fill": false
}

var ShapeController =
{
    "init": function (model, name, offset, collisions, dimensions, fillStyle, scale, strokeStyle, lineWidth, fill)
    {
        console.log("ShapeController.init");
        model.name = name;
        model.offset = offset;
        model.collisions = collisions;
        model.dimensions = dimensions;
        model.fillStyle = fillStyle;
        model.scale = scale;
        model.strokeStyle = strokeStyle;
        model.lineWidth = lineWidth;
        model.fill = fill;

        return model;
    }

    , "getDimensions": function (model)
    {
        console.log("ShapeController.getDimensions");
        var returnMe =
        {
            "width": model.dimensions.width * model.scale
            , "height": model.dimensions.height * model.scale
        };

        return returnMe;
    }

    , "getPosition": function ()
    {
        console.log("ShapeController.getPosition");

    }
}

/*
GridItemModel will be an item that is drawn on the grid map.
It could be a tree or a dood or some blood.
*/
var GridItemModel =
{
    "id": ""
    // this is the starting position that will be used for drawing
    , "position": {}
    , "shapes": []
};

var GridItemController =
{
    // not sure what dimensions, scale, and collisions are for atm.
    "init": function (item, id, position, dimensions, scale, collisions)
    {
        console.log("GridItemController.init");
        item.id = id;
        this.setPosition(item, position);
        return item;
    }

    , "addShape": function (item, addMe)
    {
        console.log("GridItemController.addShape");
        item.shapes.push(addMe);
        return item;
    }

    , "getShape": function (model, i)
    {
        console.log("GridItemController.getShape");
        return model.shapes[i];
    }

    , "getShapeCount": function (model)
    {
        console.log("GridItemController.getShapeCount");
        return model.shapes.length;
    }

    , "setPosition": function (item, position)
    {
        console.log("GridItemController.setPosition");
        item.position = position;

        return item;
    }
}

