var CanvasModel =
{
    "canvas": {}
    //, "paths": []   //cant use because IE sucks
};

var CanvasController =
{
    "init": function (model, id)
    {
        console.log("CanvasController.init");
        model.canvas = document.getElementById(id);
    }

    /*
    get2dContext returns a 2dContext for the given canvas

        var context = this.get2dContext(canvas, fillStyle, strokeStyle, lineWidth);//"#000000", "#CCCCCC", 1);

    */
    , "get2dContext": function (canvas, fillStyle, strokeStyle, lineWidth)
    {
        console.log("CanvasController.get2dContext");
        if (canvas.getContext)
        {
            var ctx = canvas.getContext('2d');

            ctx.fillStyle = fillStyle;
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;

            return ctx;
        }
        else
        {
            return null;
        }
    }

    /*
    cant use this because IE doesn't do paths

    I draw a path
    canvas
    path is a Path2D() object. 
    fill is a boolean that indicates our choice of filled or not
    */
    , "drawPath": function (canvas, path)
    {
        console.log("CanvasController.drawPath");
        // you left off considering whether or not to use the array in the model to store paths and then iterate through and draw them all at once

        context = this.get2dContext(canvas, path.fillStyle, path.strokeStyle, path.lineWidth);
        path = this.lookupDrawFunction(path.name);

        fill = fill || false;

        if (fill)
        {
            canvasContext.fill(path);
        }
        else
        {
            canvasContext.stroke(path);
        }
    }

    /*
    cant use this because IE doesn't do paths
    Give me an array of points and I will give you a Path2D object.
    */
    , "getPath": function (points)
    {
        console.log("CanvasController.getPath");
        var returnMe = new Path2D();

        returnMe.beginPath();
        returnMe.moveTo(points[0].x, points[0].y);

        for (var i = 0; i < points.length - 1; i++)
        {
            returnMe.lineTo(points[0].x, points[0].y);
        }

        returnMe.closePath();

        return returnMe;
    }

    , "setFill": function (canvasContext, fill)
    {
        console.log("CanvasController.setFill");
        var doFill = fill || false;

        if (doFill)
        {
            canvasContext.fill();
        }
        else
        {
            canvasContext.stroke();
        }
    }

    , "addGridItemPaths": function (model, item)
    {
        console.log("CanvasController.addGridItemPaths");
        this.addPath(model, this.getGridItemPaths(model, item));
    }

    , "drawShape": function (model, shape)
    {
        console.log("CanvasController.drawShape");
        var context = this.get2dContext(model.canvas, shape.fillStyle, shape.strokeStyle, shape.lineWidth)
        CanvasArtist.lookup(context, shape);
        this.setFill(context, shape.fill);
    }

}

var CanvasArtist =
{

    "lookup": function (context, shape)
    {
        console.log("CanvasArtist.lookup");
        console.log("context");
        console.log(context);
        console.log("shape");
        console.log(shape);
        // lets simplify this
        //var dimensions = GridItemController.getDimensions(shape);


        switch (shape.name)
        {
            case "steve":
                {
                    this.steve(context, shape.position, shape.width, shape.height);
                }

            case "gun":
                {
                    //this.drawGun(drawMe);
                }

            default:;
        }
    }

    , "circle": function (context, position, radius)
    {
        console.log("CanvasArtist.circle");
        var centerX = position.x + radius
        , centerY = position.y + radius;

        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.closePath();
    }

    , "hexagon": function (context, position, radius, theta, offset)
    {
        console.log("CanvasArtist.hexagon");
        this.polygon(context, position, 6, radius, theta, offset);
    }

    , "polygon": function (context, position, sides, radius, theta, offset)
    {
        console.log("CanvasArtist.polygon");
        var points = RenderHelper.getPolygonPoints(position.x, position.y, radius, sides, theta, offset);
        this.drawPath(context, points);
    }

    , "rectangle": function (context, position, w, h, fill)
    {
        console.log("CanvasArtist.rectangle");
        context.beginPath();

        if (fill)
        {
            context.fillRect(position.x, position.y, w, h);
        }
        else
        {
            context.strokeRect(position.x, position.y, w, h);
        }

        context.closePath();
    }

    , "ellipse": function (context, position, w, h)
    {
        console.log("CanvasArtist.ellipse");
        context.beginPath();
        context.moveTo(position.x + (w / 2), position.y);
        context.quadraticCurveTo(position.x + w, position.y + (h / 2), position.x + (w / 2), position.y + h);
        context.quadraticCurveTo(position.x, position.y + (h / 2), position.x + (w / 2), position.y);
        context.closePath();
    }

    , "steve": function (context, position, w, h)
    {
        console.log("CanvasArtist.steve");

        var headRadius = w / 6
            , headPos = { "x": position.x + (w / 2) - headRadius, "y": position.y + (h / 8) }
            , torsoPos = { "x": position.x, "y": position.y + (h / 8) }

        context.beginPath();

        context.addPath(this.circle(headPos, headRadius));
        context.addPath(this.ellipse(torsoPos, w, h / 3));

        context.closePath();
    }

    /*
    Give me an array of points and I will connect them with line segments
    */
    , "drawPath": function (context, points)
    {
        console.log("CanvasArtist.drawPath");
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);

        for (var i = 0; i < points.length - 1; i++)
        {
            context.lineTo(points[0].x, points[0].y);
        }

        context.closePath();
    }

}