let slides = ["title","slide2","slide3","slide4","slide5","slide6","slide7","slide8","slide9","slide10","slide11","slide12","slide13","slide14"];
let audio = [];
let script = [
    "",
    "This is a story from ancient China. Long, long ago the Emperor of the Heavens, Tentei, had a daughter. Her name was Orihime, which means weaver princess.",
    "Just as her name suggests, Orihime was very good at weaving. She used the pattern of the clouds as inspiration for the designs of her beautiful cloth.\nTentei was delighted with her work, \“These are indeed heavenly garments\”, he said.\n\“Ton karan, ton karan\”. Even today you can hear the sound of Orihime’s loom as she weaves cloth.",
    "On the other side of The Milky Way River, a young man heard the sound of Orihime’s loom. He was a hard working boy who was a cattle herder. He was called Hikoboshi.\n\“What a beautiful sound, I wonder who is weaving\", thought Hikoboshi.",
    "Tentei became concerned that Orihime was working too hard. He thought that she might be lonely, with nobody to talk to or help her with her work.\nOne day Tentei said, \“I think that Orihime and Hikoboshi would get on well. If they get married, they will be able to work together, and I am doubtless that they will be even stronger than before. Orihime will be happy and they will make our life in the heavens much more prosperous.\” And so…",
    "Orihime crossed the Milky Way River which divided the heavens to marry Hikoboshi.\nHikoboshi looked at the woman he had heard weaving and thought that he’d never seen anyone so beautiful.\nOrihime looked at the strong, hard working young man and felt as though she’d known him all her life.\nThe two gazed happily into each other’s eyes. Before they met, both Orihime and Hikoboshi had been all alone and had filled their days with work. However, now things were different. Together they laughed, together they sang, together they talked. It was as if the two of them were in a dream.",
    "They loved spending time together. From morning until evening, in the shade of the trees, Orihime and Hikoboshi would sit talking to each other. Orihime would comb her long black hair and nearby Hikoboshi would make music by blowing through a reed.\nOnly after a short while, Orihime’s fingers forgot how to weave and Hikoboshi’s skilled hands forgot how to control cattle.",
    "Tentei despaired. He said, \“If this continues then all our heavenly garments will be rags and all the cattle will be left to roam freely and become sick.\”\nHe was sad that Orihime and Hikoboshi’s great skills were lost. But the two young people continued to sit under the trees and showed no signs of doing any work.",
    "Tentei thought about what he should do and decided to take action. He decided that Orihime should return to her own side of the Milky Way River and she had no choice but to follow his orders.",
    "\“Ton karan, ton karan\”, went Orihime’s loom. Orihime began to weave again and Hikoboshi once again cared for the cattle. However, they were both overcome by sadness as a result of their separation.\n\“I long to meet with Hikoboshi, I long to hear his voice\”, said Orihime. \“I wonder what Orihime is doing. How happy I would be if I could just catch a glimpse of her\”, thought Hikoboshi.\nOrihime and Hikoboshi’s faces grew pale and they both gradually lost weight. Seeing this, Tentei felt sorry for them.",
    "So he announced, \“Orihime and Hikoboshi, I will permit you to meet once a year.\”\nHe decided that the day would be the 7th of July. So on the evening of July 7th, Orihime and Hikoboshi came running from the east and from the west until they reached the banks of the Milky Way River.",
    "Suddenly a flock of magpies appeared from nowhere and spread out their wings to form a bridge. This happens every year and Orihime crosses the bridge to join Hikoboshi.\nHowever, if it rains, it is said the Magpies don’t come and Orihime is unable to cross the river to meet Hikoboshi. If this happens, the couple has to wait another year until they can be reunited.\nThe day on which Orihime and Hikoboshi meet has come to be known as Tanabata which means \“7th evening\”.",
    "On the evening of Tanabata if there is a clear night sky, why don’t you try looking up.\nIf you do, you should be able to see Vega, the star of the Weaver Girl, and Altair, the star of the Cowherd Boy, shining brightly and happily next to each other.",
    "Today, during Tanabata it is tradition to write wishes on tanzaku, colorful strips of paper. We hand the paper on a sasatake bamboo wishing tree so it will grow tall and straight towards the heavens."
    
];


let slideIndex = 0;

const SPACE = 32;
const MARGIN = 20*4;
const TEXT_Y = 60;
const TEXT_SIZE = 25;

let blackMarginWidth = 0;

let textBox;

function preload(){
    let file;
    for(let i = 0;i<slides.length;i++){
        file = slides[i];
    //load all the art
        slides[i] = loadImage(`assets/${file}.png`);
    //load all the audio
//        audio[i] = loadSound(`assets/sound/${file}.mp3`);
    }
}

function setup(){
    createCanvas(windowWidth-MARGIN, windowHeight-MARGIN);

//    for(let sound of audio){
//        sound.onended(()=>{nextSlide();});
//    }

    //create the slides
    for(let i = 0;i<slides.length;i++){
      let multiplier = 1;//.60;
      slides[i].resize(1280*multiplier,720*multiplier);
        slides[i] = new Slide(slides[i], audio[i], script[i]);
    }
    blackMarginWidth = slides[0].x; 
    textBox= document.getElementById("slideText");
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

    //ccc
//    fill(255);
//    textSize(TEXT_SIZE);
////    print(slides[slideIndex].text);
//
//    text(slides[slideIndex].text, width/2-(textWidth(slides[slideIndex].text)/2), TEXT_Y);
    textBox.innerHTML = slides[slideIndex].text;
}

function mouseClicked(){
    playStory();
}

function keyPressed(){
//    print(keyCode);
    switch(keyCode){
//        case LEFT_ARROW:
//            nextSlide();
//            break;
//        case RIGHT_ARROW:
//            if(slideIndex<=0){
//                return;
//            }
//            //prev
//            slideIndex--;
//            //previous slide becomes active
//            slideIndex = max(slideIndex,0);
//            slides[slideIndex].show();
//            break;
        case SPACE:
            //print("reset");
            //restart
            playStory();
    }
}


let slideTimer;
const SLIDE_INTERVAL = 12000;

function playStory(){
    for(let slide of slides){
        slide.reset();
    }
    slideIndex = 0;
//     slides[slideIndex].playSound(1000);
//    slides[slideIndex].playSound();
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
}

function nextSlide(){
//    print("nextSlide")
    //next
    //active is hidden
    slides[slideIndex].hide();
    slideIndex++;
    if(slideIndex>slides.length-1){
      //reset by running play playStory
      playStory();
        // slideIndex = 0;
        // slides[slideIndex].show();
        return;
    }
    slideIndex = min(slideIndex,slides.length-1);
    slides[slideIndex].playSound();
}

//CLASSES AFTER HERE


class Slide{
    constructor(art, sound = null, text = ""){
        this.art = art;
        // this.art.resize(1200);
        this.sound = sound;
        this.text = text;
        this.w = this.art.width;
        this.h = this.art.height;
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

    //adjust the delay for the slides here
    playSound(delay = 1500){
        if(this.sound){
            this.showTimer = setTimeout(()=>{this.sound.play();}, delay)
        }
    }
}
