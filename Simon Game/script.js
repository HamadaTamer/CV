

const timer = ms => new Promise(res => setTimeout(res, ms))  // this will enable us to be able to use await and wait for a certain amount of time however the funciton it is used in has to be an async function 

async function show_sequence(){   // this will show the sequence to the player
   for (var i=0; i<sequence.length; i++){
       click_button_show(sequence[i]);
       await timer(450);    // this will wait for the indicated amount of time in miliseconds
   }   
}


function click_button_show(button){       // this function will take the buttons as color names i.e.: green, red, yellow, blue
    switch(button){                 // this will play the coreesponding sound of the button
        case 'green':
            greenAudio.play();
            break;
        case 'red':
            redAudio.play();
            break;
        case 'yellow':
            yellowAudio.play();
            break;
        case 'blue':
            blueAudio.play();
            break;
        default:
            break;
    }
    $("."+button).fadeOut(100).fadeIn(100);    // this will make the button appear and disappear
}

async function player_click_button(button){       // this function will take the buttons as color names i.e.: green, red, yellow, blue
    switch(button){                 // this will play the coreesponding sound of the button
        case 'green':
            greenAudio.play();
            break;
        case 'red':
            redAudio.play();
            break;
        case 'yellow':
            yellowAudio.play(); 
            break;
        case 'blue':
            blueAudio.play();
            break;
        default:
            break;
    }
    
    $("."+button).toggleClass("pressed");    // this will make the button appear ;
    $("."+button).fadeOut(100).fadeIn(100);    // this will make the button appear and disappear
    await timer(100);  
    $("."+button).toggleClass("pressed");  
}

let buttons=['green', 'red', 'yellow', 'blue'];
let sequence=[];  //will store all the sequences of the game
let player_clicks=[];

let sounds={green:'./sounds/green.mp3', red:'./sounds/red.mp3', yellow:'./sounds/yellow.mp3', blue:'./sounds/blue.mp3'};
var greenAudio = new Audio(sounds.green);
var redAudio= new Audio(sounds.red);
var yellowAudio= new Audio(sounds.yellow);
var blueAudio= new Audio(sounds.blue);
var game_over_audio= new Audio("./sounds/wrong.mp3");


var level=1;

//knwoing what he pressed:
$(".btn").on("click", function(){
    player_click_button(this.id);
    player_clicks.push(this.id);
    setTimeout(() => {
        checkAnswer();
    }, 1000);
});

$(document).on("keydown", function(event){
    if (level===1){
        setTimeout(() => {
            start_game();
        }, 600);
    }
    else {
        
        switch(event.key){
            case 'w':
                player_click_button('green');
                player_clicks.push('green');
                break;
            case 'a':
                player_click_button('red');
                player_clicks.push('red');
                break;
            case 's':
                player_click_button('yellow');
                player_clicks.push('yellow');
                break;
            case 'd':
                player_click_button('blue');
                player_clicks.push('blue');
                break;
            default:
                break;    
        }
        setTimeout(() => {
            checkAnswer();
        }, 1000);
    }
});

function checkAnswer(){
    if (player_clicks.length===sequence.length){
        if (player_clicks.toString() === sequence.toString()){
            player_clicks=[];
            setTimeout(() => {
                start_game();
            }, 500);
        }
        else {
            game_over();
        }
    }
    else if( player_clicks.length > sequence.length){
        game_over();
    }
}

function game_over(){
    $('body').addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    level=1;
    sequence=[];
    player_clicks=[];
    game_over_audio.play();
    setTimeout(() => {
        $('body').removeClass("game-over");
    }, 200);
}
function start_game(){
    $("#level-title").text("Level "+level);
    sequence.push(buttons[Math.floor(Math.random()*4)]);    // this adds a random button to the sequence
    level++;
    click_button_show(sequence[sequence.length-1]);    
}

