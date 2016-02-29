var Sprite = function(cx, imageSrc, x, y, scaleX, scaleY, config) {
    this.cx = cx;
    this.x = x;
    this.y = y;
    this.canBeRendered = false;
    this.image = new Image();
    this.image.src = imageSrc;
    this.config = config;
    if (typeof config === 'undefined') {
        var self = this;
        this.image.onload = function() {
            self.srcX   = 0;
            self.srcY   = 0;
            self.width  = self.image.width;
            self.height = self.image.height;
            self.projectedWidth  = scaleX*self.width;
            self.projectedHeight = scaleY*self.height;
            self.canBeRendered = true;
        };
    } else {
        self = this;
        this.image.onload = function() {
            self.srcX   = config.topLeftX;
            self.srcY   = config.topLeftY;
            self.width  = config.bottomRightX - config.topLeftX;
            self.height = config.bottomRightY - config.topLeftY;
            self.projectedWidth  = scaleX*self.width;
            self.projectedHeight = scaleY*self.height;
            self.canBeRendered = true;
        };
    }
};

Sprite.prototype.render = function() {
    if (false)
    console.log(this.srcX+','+this.srcY+', '+this.width+', '+this.height+', '+this.x+', '+this.y+', '+this.projectedWidth+', '+this.projectedHeight);
    if (this.canBeRendered) {
        this.cx.drawImage(this.image
                          , this.srcX
                          , this.srcY
                          , this.width
                          , this.height
                          , this.x
                          , this.y
                          , this.projectedWidth
                          , this.projectedHeight);
    }
};
