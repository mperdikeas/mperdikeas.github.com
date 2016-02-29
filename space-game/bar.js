var Bar = function(cx, linkedTo, offset) {
    if (typeof offset === 'undefined')
        offset = {x: 0, y:0};
    this.cx = cx;
    this.linkedTo = linkedTo;
    this.offset   = offset;
    this.initialHealth      = this.linkedTo.health;
    this.initialHealthWidth = this.initialHealth/1;
    console.log(this);
};


Bar.HEIGHT = 10;

Bar.prototype.healthWidth = function () {
    var rv =  (this.linkedTo.health/this.initialHealth)*this.initialHealthWidth;
    return rv;
};

Bar.prototype.render = function () {
    this.cx.save();
    this.cx.fillStyle = 'green';
    this.cx.strokeStyle = 'white';
    var x = this.linkedTo.x+this.offset.x;
    var y = this.linkedTo.y+this.offset.y;
    this.cx.strokeRect(x, y, this.initialHealthWidth, Bar.HEIGHT);
    this.cx.fillRect  (x, y, this.healthWidth()     , Bar.HEIGHT);
    this.cx.restore();
};


