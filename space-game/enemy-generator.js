var EnemyGenerator = function(_canvas, everyMs) {
    this.canvas    = _canvas;
    this.everyMs   = everyMs;
    this.lastCreatedMs = (new Date()).getTime();
};

EnemyGenerator.prototype.generateNewEnemy = function() {
    var randomDiff = (Math.random()*2-1)*this.everyMs/2;
    var now = (new Date()).getTime();
    if (now - this.lastCreatedMs > (this.everyMs + randomDiff))    {
        this.lastCreatedMs = now;
        const border = 50;
        return new Enemy(this.canvas
                         , border+Math.random()*(this.canvas.width-2*border)
                         , 0
                         , Math.random()*100
                         , Math.random()*gameConfig.MAX_ENEMY_SPEED);
    }
    else
        return null;
};
