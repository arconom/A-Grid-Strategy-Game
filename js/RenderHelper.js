/*
I contain functions that are useful for rendering shapes
*/
var RenderHelper =
{

    "hexRadius": function (len)
    {
        return CONSTANTS.HALFSQRT3 * len;
    }

    , "hexShortDimension": function (len)
    {
        return 2 * this.hexRadius(len);
    }

    , "getPolygonPoints": function (x, y, radius, sides, theta, offset)
    {
        var returnMe = [];

        for (var i = 0; i < sides; i++)
        {
            var point = this.calcPoint(i, radius, sides, theta, offset);
            point.x += x;
            point.y += y;
            returnMe.push(point);
        }

        return returnMe;
    }

    , "calcPoint": function (n, radius, sides, theta, offset)
    {
        var returnMe =
        {
            "x": radius * Math.cos(2 * Math.PI * n / sides + theta) + offset.x
            , "y": radius * Math.sin(2 * Math.PI * n / sides + theta) + offset.y

        };

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
            offset.x = x * ((scale * CONSTANTS.HALFSQRT3) / 2) - (x * .5);
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
}