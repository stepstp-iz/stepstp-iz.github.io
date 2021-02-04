var flakes = (function () {
    var canvas, ctx, W, H;
    var particles = [];
    var shapes = ['2746', '2745', '2744', '2733'];
    var mp = 50;
    var angle = 0;

    function randomItem() {
        return shapes[Math.floor(Math.random() * 3)];
    }

    function init(id, height) {
        try {
            canvas = document.getElementById(id);
            ctx = canvas.getContext("2d");

            W = window.innerWidth;
            H = height;
            canvas.width = W;
            canvas.height = H;
            var i = mp;
            while (i--) {
                particles.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    d: Math.random() * 50,
                    c: randomItem()
                });
            }
            return setInterval(draw, 33);
        } catch(e) {

        } 
        
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        for (var j = 0; j < mp; j++) {
            var p = particles[j];
            ctx.moveTo(p.x, p.y);
            ctx.font = p.d + "px Georgia";
            ctx.fillText(String.fromCharCode(parseInt(p.c, 16)), p.x, p.y);
        }
        ctx.fill();
        update();
    }

    function update() {
        angle += 0.01;
        for (var i = 0; i < mp; i++) {
            var p = particles[i];
            p.y += Math.cos(angle + p.d) + 2;
            p.x += Math.sin(angle) * 2;
            if (p.x > W + 5 || p.x < -5 || p.y > H) {
                if (i % 3 > 0) {
                    particles[i] = { x: Math.random() * W, y: -10, d: p.d, c: p.c };
                } else {
                    if (Math.sin(angle) > 0) {
                        particles[i] = { x: -5, y: Math.random() * H, d: p.d, c: p.c };
                    } else {
                        particles[i] = { x: W + 5, y: Math.random() * H, d: p.d, c: p.c };
                    }
                }
            }
        }
    }

    return {
        init: init
    };
})();
