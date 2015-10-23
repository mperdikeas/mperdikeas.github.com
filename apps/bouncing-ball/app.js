function utilsModule(utils) {

    var square = function(x) {return x*x;};

    var point2d = function(x,y) {
        var rv = {};
        rv.getX = function() {return x;};
        rv.getY = function() {return y;};
        rv.toString = '('+x.toFixed(3)+','+y.toFixed(3)+')';
        rv.distanceTo = function(p2) {
            return Math.sqrt(square(p2.getX()-x)+square(p2.getY()-y));
        };
        rv.add = function(p) {
            var x2 = x+p.getX();
            var y2 = y+p.getY();
            return point2d(x2,y2);
        };
        rv.mul = function(n) {
            var x2 = x*n;
            var y2 = y*n;
            return point2d(x2,y2);
        };
        rv.applyMeasure = function(measure) {
            var currentMeasure = Math.sqrt(square(x)+square(y));
            var ratio = measure/currentMeasure;
            var x2 = x*ratio;
            var y2 = y*ratio;
            return point2d(x2,y2);
        };
        rv.mul2d = function(p) {
            var x2 = x*p.getX();
            var y2 = y*p.getY();
            return point2d(x2,y2);
        };
        return rv;
        
    };


    point2d.randomPoint = function() {
        var x = Math.random(1);
        var y = Math.random(1);
        return point2d(x,y);
    };

    point2d['point.1.1']           = point2d( 1, 1);
    point2d['point.-1.-1']         = point2d(-1,-1);
    point2d['point.-1.1']          = point2d(-1, 1);
    point2d['point.1.-1']          = point2d( 1,-1);


    var circle = function(radius) {
        var rv = {};
        rv.getRadius = function() { return radius; };
        rv.setRadius = function(_radius) { radius = _radius; };
        return rv;
    };

    var circleObject = function(circle, p, velocity) {
        var rv = {};
        rv.getCenter = function()  {return p;};
        rv.getRadius = function()  {return circle.getRadius();};
        rv.setRadius = function(r) {return circle.setRadius(r);};
        rv.paint = function(ctx, color) {
            var _color = color || 'green';
            ctx.beginPath();
            ctx.arc(p.getX(), p.getY(), circle.getRadius(), 0, 2 * Math.PI, false);
            ctx.fillStyle = _color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        };
        rv.updatePosition = function (msecs) {
            p = p.add(velocity.mul(msecs/1000));
        };
        rv.setVelocity = function(_velocity) {
            velocity = _velocity;
        };
        rv.mulVelocity = function(p) {
            velocity = velocity.mul2d(p);
        };
        rv.updateVelocityMeasure = function(n) {
            velocity = velocity.applyMeasure(n);
        };
        rv.getVelocity = function() {
            return velocity;
        };
        return rv;
    };

    var rectangle = function(_p1, _p2) {
        var p1 = point2d(Math.min(_p1.getX(), _p2.getX())
                         , Math.min(_p1.getY(), _p2.getY()));

        var p2 = point2d(Math.max(_p1.getX(), _p2.getX())
                         , Math.max(_p1.getY(), _p2.getY()));
        if ((p1.getX()>p2.getX())||(p1.getY()>p2.getY()))
            throw 'Bug: bad orientation even after adjustment: '+p1.toString+' * '+p2.toString;
        var rv = {};
        var getWidth = function() {
            rv = p2.getX()-p1.getX();
            return rv;
        }; 
        rv.getWidth = getWidth;

        var getHeight = function() {
            rv = p2.getY()-p1.getY();
            return rv;
        };
        rv.getHeight = getHeight;
        function inRange(x1, x2, x) {
            return (x>=x1) && (x<=x2);
        };
        function touchesWestEdge(p) {
            return p1.getX()===p.getX();
        };
        function touchesEastEdge(p) {
            return p2.getX()===p.getX();
        };
        function touchesNorthEdge(p) {
            return p1.getY()===p.getY();
        };
        function touchesSouthEdge(p) {
            return p2.getY()===p.getY();
        };

        var layOfLand = {};
        layOfLand.OUT = {};
        layOfLand.ON = {};
        layOfLand.OUT.N     =  -1;
        layOfLand.OUT.NE    =  -2;
        layOfLand.OUT.E     =  -3;
        layOfLand.OUT.SE    =  -4;
        layOfLand.OUT.S     =  -5;
        layOfLand.OUT.SW    =  -6;
        layOfLand.OUT.W     =  -7;
        layOfLand.OUT.NW    =  -8;
        layOfLand.IN        =   0;
        layOfLand.ON        =  {};
        layOfLand.ON.N      = 0.1;
        layOfLand.ON.NE     = 0.2;
        layOfLand.ON.E      = 0.3;
        layOfLand.ON.SE     = 0.4;
        layOfLand.ON.S      = 0.5;
        layOfLand.ON.SW     = 0.6;
        layOfLand.ON.W      = 0.7;
        layOfLand.ON.NW     = 0.8;

        rv.layOfLand = layOfLand;
        rv.whereDoesItLay = function (p) {
            if (! (inRange(p1.getX(), p2.getX(), p.getX()) &&
                   inRange(p1.getY(), p2.getY(), p.getY()))) {
                if ((p.getX()<p1.getX()) && (p.getY()<p1.getY()))
                    return layOfLand.OUT.NW;
                else if ((inRange(p1.getX(), p2.getX(), p.getX()))&&(p.getY()<p1.getY()))
                    return layOfLand.OUT.N;
                else if ((p.getX()>p2.getX()) && (p.getY()<p1.getY()))
                    return layOfLand.OUT.NE;
                else if ((inRange(p1.getY(), p2.getY(), p.getY()))&&(p.getX()>p2.getX()))
                    return layOfLand.OUT.E;
                else if ((p.getX()>p2.getX()) && (p.getY()>p2.getY()))
                    return layOfLand.OUT.SE;
                else if ((inRange(p1.getX(), p2.getX(), p.getX()))&&(p.getY()>p2.getY()))
                    return layOfLand.OUT.S;
                else if ((p.getX()<p1.getX()) && (p.getY()>p2.getY()))
                    return layOfLand.OUT.SW;
                else if ((inRange(p1.getY(), p2.getY(), p.getY()))&&(p.getX()<p1.getX()))
                    return layOfLand.OUT.W;
                else
                    throw 'bug: rectangle ['+p1.toString+','+p2.toString+'] point is: '+p.toString+' and could not be placed.';
            };
            if (touchesNorthEdge(p)&&touchesEastEdge(p))
                return layOfLand.ON.NE;
            if (touchesEastEdge(p)&&touchesSouthEdge(p))
                return layOfLand.ON.SE;
            if (touchesSouthEdge(p)&&touchesWestEdge(p))
                return layOfLand.ON.SW;
            if (touchesWestEdge(p)&&touchesNorthEdge(p))
                return layOfLand.ON.NW;
            if (touchesNorthEdge(p))
                return layOfLand.ON.N;
            if (touchesEastEdge(p))
                return layOfLand.ON.E;
            if (touchesSouthEdge(p))
                return layOfLand.ON.S;
            if (touchesWestEdge(p))
                return layOfLand.ON.W;
            return layOfLand.IN;
        };
        var toString = '['+p1.toString+'-->'+p2.toString+']'; 
        rv.toString = toString;
        rv.whereDoesItLayCircle = function(c) {
            var innerRect = rectangle( p1.add( point2d["point.1.1"]    .mul(c.getRadius()))
                                      , p2.add( point2d["point.-1.-1"].mul(c.getRadius())));
            innerRect.paint( document.createElement("canvas").getContext('2d'));
            return innerRect.whereDoesItLay(c.getCenter());
        };

        var randomX = function(_buffer) {
            var buffer = _buffer || 0;
            return Math.floor(p1.getX()+buffer+(getWidth()-2*buffer)*Math.random());
        }; 
        rv.randomX = randomX;
        var randomY = function(_buffer) {
            var buffer = _buffer || 0;
            return Math.floor(p1.getY()+buffer+(getHeight()-2*buffer)*Math.random());
        };
        rv.randomY = randomY;

        rv.random = function(_buffer) {
            var buffer = _buffer || 0;
            return utils.point2d(randomX(buffer), randomY(buffer));
        };

        rv.paint     = function(ctx, color) {
            var _color = color || 'green';
            ctx.beginPath();
            ctx.rect(p1.getX(), p1.getY(), getWidth(), getHeight());
            ctx.fillStyle = 'yellow';
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'black';
            ctx.stroke();
        };
        return rv;
    };

    utils.square       =  square;
    utils.point2d      = point2d;
    utils.rectangle    = rectangle;
    utils.circle       = circle;
    utils.circleObject = circleObject;
};

if (false)
(function test() {
    var utils = {};
    utilsModule(utils);
    // on purpose providing the points in the wrong order
    var p1 = utils.point2d(2,1);
    var p2 = utils.point2d(1,0);

    console.log(p1.distanceTo(p2));
    var rect = utils.rectangle(p1, p2);
    console.log(rect.insideIndication(p1));
    console.log(rect.insideIndication(p2));
})();
