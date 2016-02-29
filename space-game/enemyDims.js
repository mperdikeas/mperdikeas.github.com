var Dim = function(topLeftX, topLeftY, bottomRightX, bottomRightY) {
    this.topLeftX     = topLeftX;
    this.topLeftY     = topLeftY;
    this.bottomRightX = bottomRightX;
    this.bottomRightY = bottomRightY;
};

Dim.prototype.width = function() {
    return this.bottomRightX - this.topLeftX;
};

Dim.prototype.height = function() {
    return this.bottomRightY - this.topLeftY;
};


var EnemyDims = function() {
    this.enemyDims =
        [new Dim(26, 84, 230, 350)
         , new Dim(12, 425, 225, 741)
         , new Dim(72, 849, 178, 941)
         , new Dim(20, 1329, 228, 1460)
         , new Dim(63, 1596, 186, 1750)
         , new Dim(70, 1846, 188, 1995)
         , new Dim(22, 2099, 230, 2273)
         , new Dim(16, 2353, 233, 2534)
         , new Dim(23, 2617, 228, 2761)
         , new Dim(49, 2871, 195, 3012)
         , new Dim(49, 3143, 207, 3257)
        ];
};


EnemyDims.prototype.randomDim = function() {
    var rv = this.enemyDims[Math.floor(Math.random()*this.enemyDims.length)];
    return rv;
};

var enemyDims = new EnemyDims();

