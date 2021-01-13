function init(){
    canvas = document.getElementById('myCanvas');
    w = h = canvas.width = canvas.height = 1000;
    pen = canvas.getContext('2d');
    cs = 66;
    food = getFood();
    gameOver = false;

    score = 0;


    foodImg = new Image()
    foodImg.src = 'apple.png'

    trophy = new Image()
    trophy.src = 'trophy.png'

    snake = {
        init_len : 5,
        color : "blue",
        cells : [],
        direction : 'right',

        createSnake : function(){
            for(var i = this.init_len; i > 0; i--){
                this.cells.push({x : i, y : 0});
            }

        },
        drawSnake : function(){
            for(var i = 0; i < this.cells.length; i++){
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },
        updateSnake : function(){
            
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            if(headX == food.x && headY == food.y){
                food = getFood();
                score++;
            }
            else{
                this.cells.pop();
            }


            var nextX, nextY;

            if(this.direction == 'right'){
                nextX = headX + 1;
                nextY = headY;
            }
            else if(this.direction == 'left'){
                nextX = headX - 1;
                nextY = headY;
            }
            else if(this.direction == 'down'){
                nextX = headX;
                nextY = headY + 1;
            }
            else{
                nextX = headX;
                nextY = headY - 1;
            }


            this.cells.unshift({x : nextX, y : nextY});

            var lastX = Math.round(w/cs);
            var lastY = Math.round(h/cs);

            if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x > lastX || this.cells[0].y > lastY){
                
                gameOver = true;
            }
        }

    };
    snake.createSnake();
    function keyPressed(e){
        if(e.key == 'ArrowRight'){
            snake.direction = 'right';
        }
        else if(e.key == 'ArrowLeft'){
            snake.direction = 'left';
        }
        else if(e.key == 'ArrowUp'){
            snake.direction = 'up';

        }
        else{
            snake.direction = 'down'}

    }

    document.addEventListener('keydown', keyPressed);
}

function draw(){
    pen.clearRect(0, 0, w, h);
    snake.drawSnake();
    pen.drawImage(foodImg, food.x * cs, food.y * cs, cs, cs);

    pen.drawImage(trophy, 23, 20, cs, cs);
    pen.fillStyle = 'blue';
    pen.font = '30px Roboto';
    pen.fillText(score, 50, 50);

}

function update(){
    snake.updateSnake();
    
}

function getFood(){
    var foodX = Math.round(Math.random() * (w - cs)/cs);
    var foodY = Math.round(Math.random() * (w - cs)/cs);

    var food = {
        x : foodX,
        y : foodY,
        color : 'red',
    }
    return food
}


function gameLoop(){
    if(gameOver == true){
        clearInterval(f);
        alert('Game Over\nYour score is : ' + score);
      //  alert('Your score is : ' + score)
    }
    draw();
    update();

}

init();
var f = setInterval(gameLoop, 100);

