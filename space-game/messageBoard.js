var MessageBoard = function(canvas) {
    this.canvas = canvas;
    this.messageSlots = [];
};

MessageBoard.prototype.nextAvailableSlot = function() {
    for (var i = 0 ; i < this.messageSlots.length ; i++)
        if (this.messageSlots[i]==='free') {
            this.messageSlots[i]='occupied';
            return i;
        }
    this.messageSlots.push('occupied');
    return this.messageSlots.length;
};

MessageBoard.prototype.addMessage = function addMessage(text) {
    var alpha = 1.0;
    function fadeOut(text, stackNo) {
        var ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'rgba(255, 0, 0, '+alpha+')';
        ctx.font = 'italic 20px Arial';
        ctx.fillText(text, 50, stackNo*50);
        if (alpha>0) {
            alpha-=0.01;
            var f = (function(obj) {
                return function() {
                    fadeOut.apply(obj, [text, stackNo]);
                };
            })(this);
            window.requestAnimationFrame( f );
        } else {
            this.messageSlots[stackNo]='free';
        }
    };
    fadeOut.apply(this, [text, this.nextAvailableSlot()]);
    console.log('slots are: '+this.messageSlots);
};

