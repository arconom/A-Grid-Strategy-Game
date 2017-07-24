var SVGModel =
{
    "svg": {}
    , "maxWidth": 0
    , "maxHeight": 0
}

/*
*/
var SVGController =
{

    "init": function (model, target)
    {
        model.svg = document.getElementById(target) || this.buildSVG(target);
        model.maxWidth = model.svg.width || screen.width;
        model.maxHeight = model.svg.height || screen.height;

        return model;
    }

    , "buildSVG": function (target)
    {
        var returnMe = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        returnMe.id = target;
        return returnMe;
    }

    , "addItem": function (model, addMe)
    {
        addMe = this.applyAspectRatio(
                    this.getAspectRatio(
                        addMe.width
                        , addMe.height
                        , model.maxWidth
                        , model.maxHeight)
                    , addMe);

        model.svg.appendChild(addMe);

        return model;
    }

    , "applyAspectRatio": function (ratio, shape)
    {
        shape.width = ratio.width;
        shape.height = ratio.height;
        return shape;
    }

    , "clear": function (model)
    {
        model.svg.innerHTML = "";

        return model;
    }

    , "getChild": function (model, id)
    {
        for (var i = 0; i < model.svg.length; i++)
        {

            model.svg[i].id
        }
    }

    /*
    Conserve aspect ratio of the orignal region. Useful when shrinking/enlarging
    images to fit into a certain area.
     
    @param {Number} srcWidth Source area width
    @param {Number} srcHeight Source area height
    @param {Number} maxWidth Fittable area maximum available width
    @param {Number} maxHeight Fittable area maximum available height
    @return {Object} { width, heigth }
    */
    , "getAspectRatio": function (srcWidth, srcHeight, maxWidth, maxHeight)
    {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        return { "width": srcWidth * ratio, "height": srcHeight * ratio };
    }

    /**/
    , "resize": function (model)
    {
        model = this.applyAspectRatio(this.getAspectRatio(model.svg.width, model.svg.height, model.maxWidth, model.maxHeight));

        return model;
    }

    , "resizeChild": function (model, id)
    {
        var child = model.getChild(id);
        child = this.applyAspectRatio(this.getAspectRatio(child.width, child.height, model.maxWidth, model.maxHeight));
    }

    , "zoomIn": function (model, factor)
    {
        var newWidth = model.width * factor,
            newHeight = model.height * factor;
        model = this.applyAspectRatio(newWidth, newHeight, model.maxWidth, model.maxHeight);

        return model;
    }
}


/*
SVGArtist is meant to be used as a function library.  Its draw functions will return objects that can be added to an SVG control.
*/
var SVGArtist =
{
    /*
    drawLine
    start
    end
    */
    "drawLine": function (x, y, x2, y2)
    {
        var returnMe = document.createElementNS("http://www.w3.org/2000/svg", "line");
        returnMe.x1 = x;
        returnMe.y1 = y;
        returnMe.x2 = x2;
        returnMe.y2 = y2;
        returnMe.setAttribute("y", y);
        returnMe.setAttribute("y", y);
        returnMe.setAttribute("y", y);
        returnMe.setAttribute("y", y);

        return returnMe;
    }

    /*
    drawRect
    x
    y
    width
    height
    rx is the radius of the rounded corner
    ry is the radius of the rounded corner
    */
    , "drawRect": function (x, y, width, height, rx, ry)
    {
        var returnMe = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        returnMe.setAttribute("width", width);
        returnMe.setAttribute("height", height);
        returnMe.setAttribute("x", x);
        returnMe.setAttribute("y", y);
        returnMe.setAttribute("rx", rx);
        returnMe.setAttribute("ry", ry);

        return returnMe;
    }

    /*
    drawCircle
    x
    y
    r
    */
    , "drawCircle": function (x, y, r)
    {
        var returnMe = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        returnMe.setAttribute("cx", x);
        returnMe.setAttribute("cy", y);
        returnMe.setAttribute("r", r);
        return returnMe;
    }

    , "drawHexagon": function (x, y, len)
    {
        var offset = 
            {
                "x": len / 2
                , "y": len / 2
            }
        ;

        return this.drawPolygon(RenderHelper.getPolygonPoints(x, y, len / 2, 6, Math.PI / 6, offset));
    }

    /*
    drawPolygon
    points is a string that contains the points in the shape
    */
    , "drawPolygon": function (points)
    {
        var steve = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        steve.setAttribute("points", this.formatPointArrayAsString(points));
        return steve;
    }

    /*
    These functions are for internal use only.  Do not expose to air.
    START INTERNAL FUNCTION LIST
    */
    , "getPoint": function (x, y)
    {
        return { "x": x, "y": y };
    }

    , "formatPointArrayAsString": function (points)
    {
        var returnMe = "";

        for (var i = 0; i < points.length; i++)
        {
            returnMe += this.formatPointAsString(points[i].x, points[i].y);
        }

        return returnMe;
    }

    , "formatPointAsString": function (x, y)
    {
        return x + "," + y + " ";
    }


    /*
    END INTERNAL FUNCTION LIST
    */
}
