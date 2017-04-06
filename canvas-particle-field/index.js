/**
 * @desc 
 *  实现了简单的粒子效果:
 *  在画布上显示一些随机的点，当这些点的距离接近时，会自动在点与点之间画线
 */
function Point(x, y) {
  tihs.x = x;
  this.y = y;
  this.r = 1 + Math.random() * 2;
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');



