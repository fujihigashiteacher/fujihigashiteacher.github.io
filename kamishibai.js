let slides = ["title","page1","page2","page3","page4","page7","page5","page6","page8","page9","page10","page11","page12","page13","page14","page15","page16","page17","page18","page19","page20","page21","page22","page23","page24","page25","page26","page27","page28","page29","page30","page31","page32","page33","page34","page35","page36","page37","page38","page39"];
let audio = [];

let slideIndex = 0;

const SPACE = 32;
const MARGIN = 20;

let blackMarginWidth = 0;

function preload(){
    let file;
    for(let i = 0;i<slides.length;i++){
        file = slides[i];
    //load all the art
        slides[i] = loadImage(`assets/${file}.png`);
    //load all the audio
        audio[i] = loadSound(`assets/sound/${file}.mp3`);
    }
}

function setup(){
    createCanvas(windowWidth-MARGIN, windowHeight-MARGIN);
    
    for(let sound of audio){
        sound.onended(()=>{nextSlide();});
    }
    
    //create the slides
    for(let i = 0;i<slides.length;i++){
        slides[i] = new Slide(slides[i], audio[i]);
    }
    blackMarginWidth = slides[0].x;  
}

function draw(){
    //black background
    background(0);
    //draw them backwards so the first slide is on top and you can see the back one ass the slides transition
    for(let i = slideIndex+1;i>=slideIndex-1;i--){
        //skip if the i is invalid
        if(i<0||i>=slides.length){
            continue;
        }
        //draw all the slides
        slides[i].draw();       
    } 
    //draw a black margin on the left
    fill(0);
    rect(0,0,blackMarginWidth,height);
}

function mouseClicked(){
    playStory();
}

function keyPressed(){
//    print(keyCode);
    switch(keyCode){
        case LEFT_ARROW:
            nextSlide();
            break;
        case RIGHT_ARROW:
            if(slideIndex<=0){
                return;
            }
            //prev
            slideIndex--;
            //previous slide becomes active
            slideIndex = max(slideIndex,0);
            slides[slideIndex].show();
            break;
        case SPACE:
            //print("reset");
            //restart
            playStory();
    }
}

function playStory(){
    for(let slide of slides){
        slide.reset();
    }
    slideIndex = 0;  
    slides[slideIndex].playSound(1000);
}

function nextSlide(){
//    print("nextSlide")
    //next
    //active is hidden
    slides[slideIndex].hide();
    slideIndex++;
    if(slideIndex>=slides.length-1){ 
        slideIndex = 0;
        slides[slideIndex].show();
        return;
    }
    slideIndex = min(slideIndex,slides.length-1);
    slides[slideIndex].playSound();    
}

//CLASSES AFTER HERE


class Slide{    
    constructor(art, sound = null){
        this.art = art;
        this.sound = sound;
        this.w = 1920;
        this.h = 1080;
        this.activeX = width/2-this.w/2;
        this.hiddenX = -(this.w+MARGIN);
        this.targetX = this.activeX;
        this.x = this.activeX;
        this.y = height/2-this.h/2;
        this.speed = -20;
        this.showTimer;
    }    
    
    draw(){      
        let diff = this.x-this.targetX;
        if(abs(diff)<=abs(this.speed)){
            this.x = this.targetX;
        }else{
            diff = diff/abs(diff);
            this.x += this.speed*diff;
        } 
        image(this.art, this.x, this.y);
    }
    
    show(){        
        this.targetX = this.activeX;
    }
        
    hide(){
        this.targetX = this.hiddenX;
    }
    
    reset(){
        this.targetX = this.activeX;
        this.x = this.activeX;
        clearTimeout(this.showTimer);
        if(this.sound!=undefined){
            this.sound.stop();
        }
    }
    
    playSound(delay = 1500){
        if(this.sound){
            this.showTimer = setTimeout(()=>{this.sound.play();}, delay)
        }
    }
}