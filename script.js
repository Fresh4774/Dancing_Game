var sketchProc = function(processingInstance) {
  with (processingInstance) {
    size(600, 600); 
    frameRate(60);    
    smooth();
    
var clicked = false, hover = false;
mouseClicked = function () {
    clicked = true;
};

smooth();

var scene;

var Button = function(args) {
    this.x = args.x;
    this.y = args.y;
    this.w = args.w || 80;
    this.h = args.h || 30;
    this.content = args.content;
    this.func = args.func;

    this.over = function() {
        return (mouseX > this.x && 
                mouseX < this.x + this.w && 
                mouseY > this.y && 
                mouseY < this.y + this.h);
    };
    this.draw = function() {
        noStroke();

        if(this.over()) {
            fill(0,0,0);
            hover = true;
        }
        else {
            fill(0,0,0);
        }

        rect(this.x, this.y, this.w, this.h);

        pushStyle();
            textAlign(CENTER, CENTER);
            textSize(14);
            fill(255);
            text(this.content, this.x + this.w / 2, this.y + this.h / 2);
        popStyle();

        if(clicked && this.over()) {
            this.func();
        }
    };
};

var Curtain = function(args) {
    this.x = 0;
    this.speed = args.speed || 10;
    this.show = args.show || false;
    this.weight = args.weight || 2;
    this.colors = args.colors || {
        curtain: color(130, 205, 71),
        curtain: color(55, 146, 55),
        curtain: color(84, 180, 53),
        border: color(240, 255, 66)
    };

    this.draw = function() {
        fill(this.colors.curtain);
        stroke(this.colors.border);
        strokeWeight(this.weight);
        noStroke();
        beginShape();
            vertex(300 + this.x * 0.25, -this.weight);
            bezierVertex(
                300 + this.x * 0.33, 300 + this.x * 0.33, 
                300 + this.x * 0.66, 600 + this.x * 0.66, 
                300 + this.x, 900 + this.x);
            vertex(-this.weight, 900);
            vertex(-this.weight, -this.weight);
        endShape(CLOSE);
        
        beginShape();
            vertex(300 - this.x * 0.25, -this.weight);
            bezierVertex(
                300 - this.x * 0.33, 300 + this.x * 0.33, 
                300 - this.x * 0.66, 600 + this.x * 0.66, 
                300 - this.x, 900 + this.x);
            vertex(600 + this.weight, 900);
            vertex(600 + this.weight, -this.weight);
        endShape(CLOSE);
        
        noStroke();
        for(var i = 0; i < 300; i+=50) {
            fill(this.colors.border, 40);
            beginShape();
                vertex(300 - i + this.x * 0.25, -this.weight);
                bezierVertex(
                    300 - i + this.x * 0.33, 300 + this.x * 0.33, 
                    300 - i + this.x * 0.66, 600 + this.x * 0.66, 
                    300 - i + this.x, 900 + this.x);
                vertex(-this.weight, 900);
                vertex(-this.weight, -this.weight);
            endShape(CLOSE);
            
            beginShape();
                vertex(300 + i - this.x * 0.25, -this.weight);
                bezierVertex(
                    300 + i - this.x * 0.33, 300 + this.x * 0.33, 
                    300 + i - this.x * 0.66, 600 + this.x * 0.66, 
                    300 + i - this.x, 900 + this.x);
                vertex(600 + this.weight, 900);
                vertex(600 + this.weight, -this.weight);
            endShape(CLOSE);
        }
    };
    this.update = function() {
        if(this.show) {
            this.x = constrain(this.x - this.speed, -600 - this.weight, this.weight);
        }
        else {
            this.x = constrain(this.x + this.speed, -600 - this.weight, this.weight);
        }
    };
    this.go = function() {
        this.draw();
        this.update();
    };
};

var Man = function(args) {
    this.x = args.x || 0;
    this.y = args.y || 0;
    this.colors = args.colors || {
        hair: color(0, 0, 0),
        skin: color(250, 200, 200),
        shading: color(250, 200, 200),
        shirt: color(164, 190, 123),
        pants: color(0, 0, 0),
        eyes: color(223, 145, 171),
        mouth: color(223, 145, 171)
    };
    this.timer = 0;
    this.sin = sin;
    this.cos = cos;
    this.speed = args.speed || 0;
    this.move = {
        s: 0,
        c: 0,
        bs: 0,
        ls: 0
    };
    this.arms = {
        left: {
            sleeve: {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: 0,
                    y: 0
                },
                c: {
                    x: 0,
                    y: 0
                }
            },
            active: {
                x1: 100,
                y1: 342,
                x2: 125,
                y2: 342,
                x3: 150,
                y3: 342,
                x4: 175,
                y4: 342
            },
            rest: {
                x1: 100,
                y1: 342,
                x2: 126,
                y2: 337,
                x3: 142,
                y3: 368,
                x4: 144,
                y4: 393
            },
            value: {
                x1: 100,
                y1: 342,
                x2: 125,
                y2: 342,
                x3: 150,
                y3: 342,
                x4: 175,
                y4: 342
            }
        },
        right: {
            sleeve: {
                a: {
                    x: 0,
                    y: 0
                },
                b: {
                    x: 0,
                    y: 0
                },
                c: {
                    x: 0,
                    y: 0
                }
            },
            active: {
                x1: 100,
                y1: 342,
                x2: 75,
                y2: 342,
                x3: 50,
                y3: 342,
                x4: 25,
                y4: 342
            },
            rest: {
                x1: 100,
                y1: 342,
                x2: 74,
                y2: 337,
                x3: 58,
                y3: 368,
                x4: 56,
                y4: 393
            },
            value: {
                x1: 100,
                y1: 342,
                x2: 75,
                y2: 342,
                x3: 50,
                y3: 342,
                x4: 25,
                y4: 342
            }
        }
    };
    this.images = {
        head: undefined,
        body: undefined
    };
    
    this.getHead = function() {
        //get head image
        background(0, 0);
        
        //head
        noStroke();
        fill(this.colors.skin);
        ellipse(100, 275, 110, 110);
        fill(this.colors.shading);
        arc(100, 275, 110, 110, radians(90), radians(270));
        
        //hair
        fill(this.colors.hair);
        beginShape();
            vertex(46, 277);
            bezierVertex(36, 245, 62, 212, 102, 213);
            bezierVertex(144, 214, 166, 245, 156, 277);
            bezierVertex(156, 253, 141, 237, 131, 231);
            bezierVertex(122, 235, 110, 234, 97, 231);
            bezierVertex(84, 228, 75, 228, 66, 234);
            bezierVertex(55, 243, 47, 262, 46, 277);
        endShape(CLOSE);
        line(135, 224, 136, 211);
        line(135, 224, 144, 215);
        line(135, 224, 148, 223);
        
        //ears
        fill(this.colors.skin);
        ellipse(40, 282, 20, 20);
        ellipse(160, 282, 20, 20);
        fill(this.colors.shading);
        ellipse(40, 282, 20, 20);
        
        //eyes
        noFill();
        stroke(this.colors.eyes);
        strokeWeight(3);
        arc(90, 240, 15, 15, 0, radians(180));
        arc(115, 240, 15, 15, 0, radians(180));
        
        //mouth
        noFill();
        stroke(this.colors.mouth);
        strokeWeight(3);
        arc(100, 275, 80, 80, 0, radians(180));
        
        //nose
        noStroke();
        fill(this.colors.skin);
        rect(85, 265, 15, 10, 20, 0, 0, 20);
        
        return get(26, 211, 147, 122);
    };
    this.getBody = function() {
        background(0, 0);
        
        //body
        noStroke();
        fill(this.colors.shirt);
        arc(100, 345, 40, 30, radians(180), radians(360));
        rect(79, 345, 41, 20);
        //pants
        fill(this.colors.pants);
        arc(100, 365, 40, 30, 0, radians(180));
        
        return get(76, 330, 47, 54);
    };
    this.setHead = function() {
        this.images.head = this.getHead();
    };
    this.setBody = function() {
        this.images.body = this.getBody();
    };
    this.init = function() {
        this.setHead();
        this.setBody();
    };
    this.init();
    this.updateArms = function(from, to) {
        from.x1 = lerp(from.x1, to.x1, 0.1);
        from.y1 = lerp(from.y1, to.y1, 0.1);
        from.x2 = lerp(from.x2, to.x2, 0.1);
        from.y2 = lerp(from.y2, to.y2, 0.1);
        from.x3 = lerp(from.x3, to.x3, 0.1);
        from.y3 = lerp(from.y3, to.y3, 0.1);
        from.x4 = lerp(from.x4, to.x4, 0.1);
        from.y4 = lerp(from.y4, to.y4, 0.1);
    };
    this.stop = function() {
        this.move.s = lerp(this.move.s, 0, 0.1);
        this.move.c = lerp(this.move.c, 0, 0.1);
        this.move.bs = lerp(this.move.bs, 0, 0.1);
        this.move.ls = lerp(this.move.ls, 0, 0.1);
        
        this.updateArms(this.arms.right.value, this.arms.right.rest);
        this.updateArms(this.arms.left.value, this.arms.left.rest);
    };
    this.getPoint = function(p1, p2, p3, p4, n) {
        return {x: bezierPoint(p1.x, p2.x, p3.x, p4.x, n), y: bezierPoint( p1.y, p2.y, p3.y, p4.y, n)};
    };
    this.updateSleevePoints = function(side, x1, y1, x2, y2, x3, y3, x4, y4) {
        if(side === "left") {
            this.arms.left.sleeve.a = this.getPoint({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y: y4}, 0.1);
            this.arms.left.sleeve.b = this.getPoint({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y: y4}, 0.2);
            this.arms.left.sleeve.c = this.getPoint({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y: y4}, 0.37);
        }
        else {
            this.arms.right.sleeve.a = this.getPoint({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y: y4}, 0.1);
            this.arms.right.sleeve.b = this.getPoint({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y: y4}, 0.2);
            this.arms.right.sleeve.c = this.getPoint({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y: y4}, 0.37);
        }
    };
    this.draw = function() {
        strokeWeight(1);
        noStroke();

        pushMatrix();
            translate(this.x, this.y + this.move.ls * 5);
            
            //neck - connected to center of head and center of body
            noFill();
            stroke(this.colors.skin);
            strokeWeight(10);
            line(100, 275, 100 + this.move.c * 4, 350);
            strokeWeight(1);
        
            //HEAD
            pushMatrix();
                translate(100, 275);
                rotate(radians(constrain(this.move.s * 12, -8, 8)));
                translate(-100, -275);

                image(this.images.head, 26, 211);
            popMatrix();
            
            //arms
            noFill();
            stroke(this.colors.skin);
            strokeWeight(10);
            //left arm
            bezier(
                this.arms.left.value.x1 + this.move.c * 5, this.arms.left.value.y1, 
                this.arms.left.value.x2, this.arms.left.value.y2, 
                this.arms.left.value.x3, this.arms.left.value.y3 + this.move.c * 10, 
                this.arms.left.value.x4, constrain(this.arms.left.value.y4 - this.move.c * 30, 0, 393));
            //right arm
            bezier(
                this.arms.right.value.x1 + this.move.c * 5, this.arms.right.value.y1, 
                this.arms.right.value.x2, this.arms.right.value.y2, 
                this.arms.right.value.x3, this.arms.right.value.y3 - this.move.c * 10, 
                this.arms.right.value.x4, constrain(this.arms.right.value.y4 + this.move.c * 30, 0, 393));
            
            //update sleeves
            this.updateSleevePoints(
                "left", 
                this.arms.left.value.x1 + this.move.c * 5, this.arms.left.value.y1, 
                this.arms.left.value.x2, this.arms.left.value.y2, 
                this.arms.left.value.x3, this.arms.left.value.y3 + this.move.c * 10, 
                this.arms.left.value.x4, this.arms.left.value.y4 - this.move.c * 30);
            this.updateSleevePoints(
                "right", 
                this.arms.right.value.x1 + this.move.c * 5, this.arms.right.value.y1, 
                this.arms.right.value.x2, this.arms.right.value.y2, 
                this.arms.right.value.x3, this.arms.right.value.y3 - this.move.c * 10, 
                this.arms.right.value.x4, this.arms.right.value.y4 + this.move.c * 30);

            //sleeves
            stroke(this.colors.shirt);
            strokeCap(SQUARE);
            strokeWeight(12);
            //left sleeve
            bezier(
                100 + this.move.c * 5, this.arms.left.value.y1, 
                this.arms.left.sleeve.a.x, this.arms.left.sleeve.a.y, 
                this.arms.left.sleeve.b.x, this.arms.left.sleeve.b.y, 
                this.arms.left.sleeve.c.x, this.arms.left.sleeve.c.y);
            //right sleeve
            bezier(
                100 + this.move.c * 5, this.arms.right.value.y1, 
                this.arms.right.sleeve.a.x, this.arms.right.sleeve.a.y, 
                this.arms.right.sleeve.b.x, this.arms.right.sleeve.b.y, 
                this.arms.right.sleeve.c.x, this.arms.right.sleeve.c.y);
            strokeCap(ROUND);

            //legs
            noFill();
            stroke(this.colors.pants);
            strokeWeight(10);

            //left leg
            pushMatrix();
                translate(107, 375 - this.move.ls * 5);
                rotate(radians(constrain(this.move.ls * 30, -30, 0)));
                line(0, 0, 0, 55);
                
                translate(0, 55);
                rotate(radians(-constrain(this.move.ls * 60, -60, 0)));
                line(0, 0, 0, 55);
            popMatrix();

            //right leg
            pushMatrix();
                translate(92, 375 - this.move.ls * 5);
                rotate(radians(constrain(this.move.ls * 30, 0, 30)));
                line(0, 0, 0, 55);
                translate(0, 55);
                rotate(radians(-constrain(this.move.ls * 60, 0, 60)));
                line(0, 0, 0, 55);
            popMatrix();
            
            //BODY
            pushMatrix();
                translate(100, 357);
                rotate(radians(this.move.c * 14));
                translate(-100, -355);

                image(this.images.body, 76, 330);
            popMatrix();

        popMatrix();
    };
    this.update = function() {
        this.timer++;
        
        if(this.speed === 0) {
            this.stop();
        }
        else {
            this.move.s = this.sin(radians(this.timer * this.speed));
            this.move.c = this.cos(radians(this.timer * this.speed));
            this.move.bs = this.sin(radians(this.timer * this.speed * 0.5));
            this.move.ls = this.sin(radians(this.timer * this.speed * 2));
            
            this.updateArms(this.arms.right.value, this.arms.right.active);
            this.updateArms(this.arms.left.value, this.arms.left.active);
        }
    };
    this.go = function() {
        this.draw();
        this.update();
    };
};

var Woman = function(args) {
    this.x = args.x || 20;
    this.y = args.y || 0;
    this.colors = args.colors || {
        hair: color(0, 0, 0),
        skin: color(250, 200, 200),
        shading: color(250, 200, 200),
        dress: color(164, 190, 123),
        eyes: color(223, 145, 171),
        mouth: color(223, 145, 171)
    };
    this.timer = 0;
    this.sin = sin;
    this.cos = cos;
    this.speed = args.speed || 0;
    this.move = {
        s: 0,
        c: 0,
        bs: 0,
        ls: 0
    };
    this.arms = {
        left: {
            active: {
                x1: 445,
                y1: 368,
                x2: 460,
                y2: 368,
                x3: 485,
                y3: 368,
                x4: 500,
                y4: 368
            },
            rest: {
                x1: 445,
                y1: 368,
                x2: 462,
                y2: 374,
                x3: 474,
                y3: 394,
                x4: 481,
                y4: 420
            },
            value: {
                x1: 445,
                y1: 368,
                x2: 460,
                y2: 368,
                x3: 485,
                y3: 368,
                x4: 500,
                y4: 368
            }
        },
        right: {
            active: {
                x1: 445,
                y1: 368,
                x2: 430,
                y2: 368,
                x3: 405,
                y3: 368,
                x4: 390,
                y4: 368
            },
            rest: {
                x1: 445,
                y1: 368,
                x2: 428,
                y2: 374,
                x3: 416,
                y3: 394,
                x4: 409,
                y4: 420
            },
            value: {
                x1: 445,
                y1: 368,
                x2: 430,
                y2: 368,
                x3: 405,
                y3: 368,
                x4: 390,
                y4: 368
            }
        }
    };
    this.images = {
        head: undefined,
        dress: undefined
    };
    
    this.getHead = function() {
        //get head image
        background(0, 0);
        
        noStroke();
        fill(this.colors.skin);
        rect(400, 280, 90, 31);
        arc(445, 280, 90, 90, radians(180), radians(360));
        arc(445, 310, 90, 90, 0, radians(180));
        
        //main head shading
        fill(this.colors.shading);
        rect(400, 280, 45, 30);
        arc(445, 280, 90, 90, radians(180), radians(270));
        arc(445, 310, 90, 90, radians(90), radians(180));
        
        //shading on cheek
        fill(this.colors.shading);
        beginShape();
            vertex(484, 332);
            bezierVertex(471, 321, 476, 304, 490, 300);
            vertex(490, 310);
            bezierVertex(490, 317, 489, 324, 484, 331);
        endShape(CLOSE);
        
        //hair
        fill(this.colors.hair);
        beginShape();
            vertex(406, 257);
            bezierVertex(424, 260, 436, 272, 446, 290);
            bezierVertex(458, 301, 475, 309, 490, 310);
            vertex(491, 280);
            bezierVertex(490, 255, 472, 233, 442, 235);
            bezierVertex(426, 235, 416, 241, 406, 257);
        endShape(CLOSE);
        
        //eyes
        noFill();
        stroke(this.colors.eyes);
        strokeWeight(2);
        arc(420, 294, 20, 20, radians(180), radians(360));
        
        //mouth
        noFill();
        stroke(this.colors.mouth);
        strokeWeight(2);
        arc(442, 308, 70, 80, radians(6), radians(180));
        
        //nose
        noStroke();
        fill(this.colors.skin);
        rect(433, 302, 12, 10, 20, 0, 0, 20);
        
        return get(397, 233, 96, 124);
    };
    this.getDress = function() {
        background(0, 0);
        
        noFill();
        stroke(this.colors.dress);
        strokeWeight(6);
        line(437, 374, 437, 362);
        line(453, 374, 453, 362);
        noStroke();
        fill(this.colors.dress);
        beginShape();
            vertex(435, 367);
            vertex(455, 367);
            vertex(460, 410);
            vertex(430, 410);
        endShape(CLOSE);
        arc(445, 422, 52, 71, radians(180), radians(360));
        
        return get(418, 357, 54, 67);
    };
    this.setHead = function() {
        this.images.head = this.getHead();
    };
    this.setDress = function() {
        this.images.dress = this.getDress();
    };
    this.init = function() {
        this.setHead();
        this.setDress();
    };
    this.init();
    this.updateArms = function(from, to) {
        from.x1 = lerp(from.x1, to.x1, 0.1);
        from.y1 = lerp(from.y1, to.y1, 0.1);
        from.x2 = lerp(from.x2, to.x2, 0.1);
        from.y2 = lerp(from.y2, to.y2, 0.1);
        from.x3 = lerp(from.x3, to.x3, 0.1);
        from.y3 = lerp(from.y3, to.y3, 0.1);
        from.x4 = lerp(from.x4, to.x4, 0.1);
        from.y4 = lerp(from.y4, to.y4, 0.1);
    };
    this.stop = function() {
        this.move.s = lerp(this.move.s, 0, 0.1);
        this.move.c = lerp(this.move.c, 0, 0.1);
        this.move.bs = lerp(this.move.bs, 0, 0.1);
        this.move.ls = lerp(this.move.ls, 0, 0.1);
        
        this.updateArms(this.arms.right.value, this.arms.right.rest);
        this.updateArms(this.arms.left.value, this.arms.left.rest);
    };
    this.draw = function() {
        noFill();
        stroke(0);

        pushMatrix();
            translate(this.x, this.y + this.move.ls * 5);
            
            //hair swinging at back of head
            pushMatrix();
                translate(445, 290);
                rotate(radians(constrain(this.move.s * 18, -8, 8)));
                translate(-445, -290);
                
                //hair swaying at back
                noFill();
                stroke(this.colors.hair);
                strokeWeight(88);
                bezier(
                    445, 280, 
                    445 + this.move.c * 10, 310 + constrain(this.move.ls * 10, -10, 0), 
                    445 + this.move.c * 40, 340 + constrain(this.move.ls * 20, -20, 0), 
                    445 + this.move.c * 70, 350 + constrain(this.move.ls * 20, -20, 0));
            popMatrix();
            
            //neck - connected to the head and body
            noFill();
            stroke(this.colors.skin);
            strokeWeight(10);
            // line(445, 280, 445 + c * 4, 350);
            line(445, 350, 445 + this.move.c * 4, 370);
            strokeWeight(1);
            
            //head
            pushMatrix();
                translate(445, 290);
                rotate(radians(constrain(this.move.s * 12, -8, 8)));
                translate(-445, -290);

                image(this.images.head, 397, 233);
            popMatrix();

            //arms
            noFill();
            stroke(this.colors.skin);
            strokeWeight(10);
            //right arm
            bezier(
                this.arms.right.value.x1 + this.move.c * 5, this.arms.right.value.y1, 
                this.arms.right.value.x2, this.arms.right.value.y2, 
                this.arms.right.value.x3, this.arms.right.value.y3 + this.move.c * 10, 
                this.arms.right.value.x4, constrain(this.arms.right.value.y4 - this.move.c * 30, 0, 420));
            // left arm
            bezier(
                this.arms.left.value.x1 + this.move.c * 5, this.arms.left.value.y1, 
                this.arms.left.value.x2, this.arms.left.value.y2, 
                this.arms.left.value.x3, this.arms.left.value.y3 - this.move.c * 10, 
                this.arms.left.value.x4, constrain(this.arms.left.value.y4 + this.move.c * 30, 0, 420));
            
            //legs
            pushMatrix();
                translate(0, this.move.ls * -5);
            
                noFill();
                strokeWeight(12);
                //right leg
                stroke(this.colors.skin);
                bezier(
                    438, 415, 
                    438 - constrain(this.move.ls * 15, 0, 15), 435 - constrain(this.move.ls * 10, 0, 10), 
                    438 - constrain(this.move.ls * 15, 0, 15), 455 - constrain(this.move.ls * 20, 0, 20), 
                    438, 475 - constrain(this.move.ls * 30, 0, 30));
                stroke(this.colors.shading);
                bezier(
                    438, 415, 
                    438 - constrain(this.move.ls * 15, 0, 15), 435 - constrain(this.move.ls * 10, 0, 10), 
                    438 - constrain(this.move.ls * 15, 0, 15), 455 - constrain(this.move.ls * 20, 0, 20), 
                    438, 475 - constrain(this.move.ls * 30, 0, 30));
                //left leg
                stroke(this.colors.skin);
                bezier(
                    452, 415, 
                    452 - constrain(this.move.ls * 15, -15, 0), 435 + constrain(this.move.ls * 10, -10, 0), 
                    452 - constrain(this.move.ls * 15, -15, 0), 455 + constrain(this.move.ls * 20, -20, 0), 
                    452, 475 + constrain(this.move.ls * 30, -30, 0));
            
            popMatrix();
            
            //body
            pushMatrix();
                translate(445, 390);
                rotate(radians(this.move.c * 6));
                translate(-445, -390);

                image(this.images.dress, 418, 357);
            popMatrix();

        popMatrix();
    };
    this.update = function() {
        this.timer++;
        
        if(this.speed === 0) {
            this.stop();
        }
        else {
            this.move.s = this.sin(radians(this.timer * this.speed));
            this.move.c = this.cos(radians(this.timer * this.speed));
            this.move.bs = this.sin(radians(this.timer * this.speed * 0.5));
            this.move.ls = this.sin(radians(this.timer * this.speed * 2));
            
            this.updateArms(this.arms.right.value, this.arms.right.active);
            this.updateArms(this.arms.left.value, this.arms.left.active);
        }
    };
    this.go = function() {
        this.draw();
        this.update();
    };
};

var Baby = function(args) {
    this.x = args.x || 10;
    this.y = args.y || 0;
    this.colors = args.colors || {
        hair: color(165, 85, 32),
        skin: color(250, 200, 200),
        shading: color(250, 200, 200),
        pants: color(164, 190, 123),
        eyes: color(223, 145, 171),
        mouth: color(223, 145, 171)
    };
    this.timer = 0;
    this.sin = sin;
    this.cos = cos;
    this.speed = args.speed || 0;
    this.move = {
        s: 0,
        c: 0,
        bs: 0,
        ls: 0
    };
    this.images = {
        head: undefined,
        body: undefined
    };
    this.moveForward = true;
    this.getHead = function() {
        //get head image
        background(0, 0);
        
        //main head
        noStroke();
        fill(this.colors.skin);
        ellipse(280, 390, 95, 65);
        
        //hair
        noFill();
        stroke(this.colors.hair);
        strokeWeight(3);
        bezier(280, 360, 275, 345, 291, 355, 286, 340);
        
        //cheeks
        noStroke();
        fill(this.colors.shading);
        ellipse(250, 388, 18, 18);
        ellipse(310, 388, 18, 18);
        
        //ears
        fill(this.colors.skin);
        ellipse(330, 395, 14, 8);
        ellipse(230, 395, 14, 8);
        
        //eyes
        noFill();
        stroke(this.colors.eyes);
        strokeWeight(3);
        arc(260, 370, 15, 15, 0, radians(180));
        arc(300, 370, 15, 15, 0, radians(180));
        
        //mouth
        noFill();
        stroke(this.colors.mouth);
        strokeWeight(2);
        arc(280, 390, 60, 55, 0, radians(180));
        
        return get(221, 337, 118, 87);
    };
    this.setHead = function() {
        this.images.head = this.getHead();
    };
    this.init = function() {
        this.setHead();
    };
    this.init();
    this.stop = function() {
        this.move.s = lerp(this.move.s, 0, 0.1);
        this.move.c = lerp(this.move.c, 0, 0.1);
        this.move.bs = lerp(this.move.bs, 0, 0.1);
        this.move.ls = lerp(this.move.ls, 0, 0.1);
    };
    this.draw = function() {
        noFill();
        stroke(0);

        pushMatrix();
            translate(this.x, this.y + 15 + this.move.ls * 2);
            
            //legs
            pushMatrix();
                translate(0, -this.move.ls * 2);
                
                //legs
                noFill();
                stroke(this.colors.skin);
                strokeWeight(12);
                strokeCap(SQUARE);
                //right leg
                line(273, 445, 273, 471 - constrain(this.move.ls * 10, 0, 10));
                //left leg
                line(287, 445, 287, 471 + constrain(this.move.ls * 10, -10, 0));
                strokeCap(ROUND);
            popMatrix();
            
            //body
            pushMatrix();
                translate(280, 435);
                rotate(radians(this.move.c * 10));
                translate(-280, -435);
                
                //pants
                noStroke();
                fill(this.colors.pants);
                beginShape();
                    vertex(279, 431);
                    bezierVertex(309, 429, 308, 459, 279, 457);
                    bezierVertex(252, 459, 250, 429, 279, 431);
                endShape(CLOSE);

                //main body
                fill(this.colors.skin);
                triangle(
                    280, 417, 
                    264, 440, 
                    296, 440);
            popMatrix();
            
            //head
            pushMatrix();
                translate(280, 390);
                rotate(radians(this.move.s * 12));
                translate(-280, -390);

                image(this.images.head, 221, 337);
            popMatrix();
            
            //arms
            pushMatrix();
                noFill();
                stroke(this.colors.skin);
                strokeWeight(6);

                //right arm
                bezier(
                    280, 428, 
                    275, 428, 
                    265, 428 - this.move.c * 2, 
                    258, 426 + this.move.c * 2);

                //left arm
                bezier(
                    280, 428, 
                    285, 428, 
                    295, 428 + this.move.c * 2, 
                    302, 426 - this.move.c * 2);
                    
            popMatrix();
            
        popMatrix();
    };
    this.update = function() {
        this.timer++;
        
        if(this.speed === 0) {
            this.stop();
        }
        else {
            this.move.s = this.sin(radians(this.timer * this.speed));
            this.move.c = this.cos(radians(this.timer * this.speed));
            this.move.bs = this.sin(radians(this.timer * this.speed * 0.5));
            this.move.ls = this.sin(radians(this.timer * this.speed * 2));
        }
        
        if(this.moveForward) {
            this.y += sin(radians(this.timer)) * 0.5;
        }
    };
    this.go = function() {
        this.draw();
        this.update();
    };
};

var Scene = function() {
    this.page = "load";
    this.images = undefined;
    this.imageIndex = 0;
    this.loaded = false;
    this.showButtons = false;
    this.offsetButtons = -200;
    this.speed = 5;
    this.timer = 0;
    this.curtain = new Curtain({
        show: false
    });
    this.man = new Man({
        speed: this.speed * 1
    });
    this.woman = new Woman({
        speed: this.speed * 1
    });
    this.baby = new Baby({
        speed: this.speed * 2
    });
    this.buttons = {
        man: {
            stop: new Button({
                    x: 60,
                    y: 10,
                    content: "STOP", 
                    func: function() {
                        scene.man.speed = scene.speed * 0;
                    }
                }
            ),
            slow: new Button({
                    x: 60,
                    y: 45,
                    content: "SLOW-MO", 
                    func: function() {
                        scene.man.speed = scene.speed * 0.2;
                    }
                }
            ),
            normal: new Button({
                    x: 60,
                    y: 80,
                    content: "NORMAL", 
                    func: function() {
                        scene.man.speed = scene.speed * 1;
                    }
                }
            ),
            fast: new Button({
                    x: 60,
                    y: 115,
                    content: "FAST", 
                    func: function() {
                        scene.man.speed = scene.speed * 3;
                    }
                }
            ),
            crazy: new Button({
                    x: 60,
                    y: 150,
                    content: "CRAZY", 
                    func: function() {
                        scene.man.speed = scene.speed * 8;
                    }
                }
            )
        },
        woman: {
            stop: new Button({
                    x: 450,
                    y: 10,
                    content: "STOP", 
                    func: function() {
                        scene.woman.speed = scene.speed * 0;
                    }
                }
            ),
            slow: new Button({
                    x: 450,
                    y: 45,
                    content: "SLOW-MO", 
                    func: function() {
                        scene.woman.speed = scene.speed * 0.2;
                    }
                }
            ),
            normal: new Button({
                    x: 450,
                    y: 80,
                    content: "NORMAL", 
                    func: function() {
                        scene.woman.speed = scene.speed * 1;
                    }
                }
            ),
            fast: new Button({
                    x: 450,
                    y: 115,
                    content: "FAST", 
                    func: function() {
                        scene.woman.speed = scene.speed * 3;
                    }
                }
            ),
            crazy: new Button({
                    x: 450,
                    y: 150,
                    content: "CRAZY", 
                    func: function() {
                        scene.woman.speed = scene.speed * 8;
                    }
                }
            )
        },
        baby: {
            stop: new Button({
                    x: 250,
                    y: 10,
                    content: "STOP", 
                    func: function() {
                        scene.baby.speed = scene.speed * 0;
                    }
                }
            ),
            slow: new Button({
                    x: 250,
                    y: 45,
                    content: "SLOW-MO", 
                    func: function() {
                        scene.baby.speed = scene.speed * 0.2;
                    }
                }
            ),
            normal: new Button({
                    x: 250,
                    y: 80,
                    content: "NORMAL", 
                    func: function() {
                        scene.baby.speed = scene.speed * 1;
                    }
                }
            ),
            fast: new Button({
                    x: 250,
                    y: 115,
                    content: "FAST", 
                    func: function() {
                        scene.baby.speed = scene.speed * 3;
                    }
                }
            ),
            crazy: new Button({
                    x: 250,
                    y: 150,
                    content: "CRAZY", 
                    func: function() {
                        scene.baby.speed = scene.speed * 8;
                    }
                }
            )
        }
    };
    
    this.pattern = function(args) {
        var xoff = 0.0, yoff, bright;
        for(var x = args.px; x < args.px + args.w; x++) {
            yoff = 0.0;
            for(var y = args.py; y < args.py + args.h; y++) {
                bright = map(noise(xoff, yoff), 0, 1, args.min, args.max);
                if(bright > 47) {
                    stroke(args.sc);
                }
                else {
                    stroke(args.r - bright, args.g - bright, args.b - bright);
                }
                point(x, y);
                yoff += args.yf;
            }
            xoff += args.xf;
        }
    };
    this.setup = function() {
        background(0, 0);
        this.images = {
            back: function() {
                background(95, 141, 78);

                stroke(229, 217, 182);
                for(var i = 0; i < 600; i+=50) {
                    line(i, 0, i, 450);
                }
                
                noStroke();
                fill(85, 113, 83);
                rect(0, 440, 600, 450);
                
                scene.pattern({
                   px: 0,
                   py: 450, 
                   w: 600, 
                   h: 150, 
                   r: 227, 
                   g: 163, 
                   b: 91, 
                   xf: 0.02, 
                   yf: 0.2,
                   min: 0,
                   max: 80,
                   sc: color(227, 163, 91)
                });
                
                stroke(229, 217, 182);
                noFill();
                
                line(300, 450, 300, 600);
                for(var i = 1; i < 20; i++) {
                    line(300 + i * 15, 450, 300 + i * 60, 600);
                    line(300 - i * 15, 450, 300 - i * 60, 600);
                }
                
                return get(0, 0, width, 600);
            }
        };
    };
    this.setup();
    this.load = function (s) {
        var obj = Object.keys(this.images);
        this.images[obj[this.imageIndex]] = this.images[obj[this.imageIndex]]();
        this.imageIndex++;
        
        background(this.curtain.colors.border);
        pushStyle();
            fill(125, 143, 105);
            textAlign(CENTER, CENTER);
            textSize(40);
            text('LOADING :)', 300, 300);
            noFill();
            stroke(240, 150);
            strokeWeight(10);
            arc(300, 300, 300, 300, 0, radians(map(this.imageIndex / obj.length, 0, 1, 0, 360)));
            strokeWeight(1);
        popStyle();
    
        if(this.imageIndex < obj.length){
            this.loaded = false;
        }
        else {
            this.loaded = true;
            this.page = s;
        }
    };
    this.updateSpeed = function(speed) {
        this.speed = speed;
        this.man.speed = speed;
        this.woman.speed = speed;
        this.baby.speed = speed;
    };
    this.showCurtain = function() {
        image(this.images.back, 0, 0);
        this.curtain.go();
        
        pushStyle();
            textAlign(CENTER, CENTER);
            textFont(createFont("Trebuchet MS Bold"), 42);
            fill(0,0,0);
            text("START", 300, 300);
        popStyle();
        
        if(clicked) {
            this.curtain.show = true;
            this.page = "go";
        }
    };
    this.go = function() {
        image(this.images.back, 0, 0);
        
        this.timer++;

        this.man.go();
        this.woman.go();
        this.baby.go();
        
        this.curtain.go();
        
        if(this.baby.moveForward && this.timer > 300 && this.baby.y < 0.01) {
            this.baby.moveForward = false;
            this.baby.speed = 0;
            this.man.speed = 0;
            this.woman.speed = 0;
            this.showButtons = true;
        }
        
        if(this.showButtons && this.offsetButtons !== 0 && this.timer > 420) {
            this.offsetButtons = ~~lerp(this.offsetButtons, 0, 0.05);
        }
        
        if(this.showButtons) {
            pushMatrix();
                translate(0, this.offsetButtons);
                this.buttons.man.stop.draw();
                this.buttons.man.slow.draw();
                this.buttons.man.normal.draw();
                this.buttons.man.fast.draw();
                this.buttons.man.crazy.draw();
                
                this.buttons.woman.stop.draw();
                this.buttons.woman.slow.draw();
                this.buttons.woman.normal.draw();
                this.buttons.woman.fast.draw();
                this.buttons.woman.crazy.draw();
                
                this.buttons.baby.stop.draw();
                this.buttons.baby.slow.draw();
                this.buttons.baby.normal.draw();
                this.buttons.baby.fast.draw();
                this.buttons.baby.crazy.draw();
            popMatrix();
        }
    };
};

scene = new Scene();

draw = function() {
    background(30, 150, 150);
    
    switch(scene.page) {
        case "load":
            scene.load("curtain");
            break;
        case "curtain":
            scene.showCurtain();
            break;
        case "go":
            scene.go();
            break;
    }
    
    cursor(hover ? 'pointer' : 'default');
    clicked = false;
    hover = false;
};
    
  }
}

var canvas = document.getElementById("canvas"); 
var processingInstance = new Processing(canvas, sketchProc);