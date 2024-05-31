document.addEventListener("DOMContentLoaded", function() {
    // Properties
    var dotSize = 2,
      spacing = 40,
      attractionDistance = spacing * 4,
      attractionSmoothness = 0.5;
  
    var $wrapper = document.getElementById("dots-wrapper"),
      $canvas = document.getElementById("dots"),
      ctx = $canvas.getContext("2d"),
      width = 800,
      height = 800,
      canvasX = 0,
      canvasY = 0,
      mousePosition = { x: 0, y: 0 };
  
    function update() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
  
      for (var w = 1; w < width / spacing; w++) {
        for (var h = 1; h < height / spacing; h++) {
          var x = w * spacing,
            y = h * spacing,
            distance = getDistance({ x: x, y: y }, mousePosition);
          ctx.fillRect(distance.x, distance.y, dotSize, dotSize);
        }
      }
      window.requestAnimationFrame(update);
    }
  
    function resize() {
      var size = $wrapper.getBoundingClientRect();
      console.log(size);
      width = size.width;
      height = size.height;
      canvasX = size.x;
      canvasY = size.y;
      ctx.canvas.width = width;
      ctx.canvas.height = height;
    }
  
    function getDistance(dot, mouse) {
      var dx = dot.x - mouse.x;
      var dy = dot.y - mouse.y;
      var da = Math.sqrt(dx * dx + dy * dy);
  
      // Tend à ramener la distance entre les segments à length
      if (da < attractionDistance) {
        var ox = dx / da * attractionDistance - dx;
        var oy = dy / da * attractionDistance - dy;
        dot.x += ox * attractionSmoothness;
        dot.y += oy * attractionSmoothness;
      }
  
      return dot;
    }
  
    window.addEventListener("resize", function(event) {
      resize();
    });
  
    $canvas.addEventListener("mousemove", function(event) {
      mousePosition.x = event.pageX - canvasX;
      mousePosition.y = event.pageY - canvasY;
    });
  
    resize();
    window.requestAnimationFrame(update);
  });