function get(id) {
    return document.getElementById(id);
}
function canvas(i) {
    return get('canvas'+i);
}
function ctx(i) {
    return canvas(i).getContext('2d');
}


var Plane = function Plane(idx) {
    this.canvas = canvas(idx);
    this.ctx    = ctx   (idx);
};

const XX_PLANE_ID           = 'XX';
const DEEP_SPACE_PLANE_ID   = 10;
const GALAXY_PLANE_ID       = 20;
const SOLAR_SYSTEM_PLANE_ID = 30;
const PLANET_PLANE_ID       = 40;
const BATTLE_PLANE_ID       = 50;
const MESSAGE_PLANE_ID      = 60;


var Scroller = function (plane, image, speed) {
    this.plane = plane;
    this.image = image;
    this.speed = speed;
    this.i     = 0;
};

Scroller.prototype.scroll = function () {
       if (this.i===this.image.height)
         i=0;
       this.plane.ctx.clearRect(0, 0, this.plane.canvas.width, this.plane.canvas.height);
       this.plane.ctx.drawImage(image, 0, i++);
       this.plane.ctx.drawImage(image, 0, i-image.height);

};
