status1 = "";
objects1 = [];
x = "";
function preload(){
    alarm = loadSound("alarm.mp3");
}
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    x = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("cocossd has loaded!");
    status1 = true;
}
function detectedObject(error, result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects1 = result;
    }
}
function draw(){
    image(video, 0, 0, 640, 420);
    if(status1 != ""){
        x.detect(video, detectedObject);
        r = random(255);
        g = random(255);
        b = random(255);
for(var i = 0; i < objects1.length; i++){
    document.getElementById('status').innerHTML = "Status: Object Detected"
    percent = floor(objects1[i].confidence * 100);
    fill(r, g, b);
    text(objects1[i].label + " " + percent + "%", objects1[i].x + 10, objects1[i].y + 15);
    noFill();
    stroke(r, g, b);
    rect(objects1[i].x, objects1[i].y, objects1[i].width, objects1[i].height);
    if(objects1[i].label == 'person'){
        document.getElementById("objectdetected").innerHTML = "Baby found!";
        alarm.stop();
    }
    else{
        document.getElementById("objectdetected").innerHTML = "Baby not found";
        alarm.play();
    }
    if(objects1.length == 0){
        document.getElementById("objectdetected").innerHTML = "Baby not found";
        alarm.play();
    }
}
}
}