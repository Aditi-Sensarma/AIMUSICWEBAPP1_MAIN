MJ="";
HCW="";
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist =0;
MJ1 = "";
HCW1 ="";


function setup(){
    
    canvas = createCanvas(600,530);

    canvas.center();
    video = createCapture(VIDEO);

    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);

    
}

function preload(){
 MJ  = loadSound("Chicago.mp3");
 HCW = loadSound("HeavenCanWait.mp3");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    MJ1 = MJ.isPlaying();
    console.log(MJ1);

    HCW1 = HCW.isPlaying();
    console.log(HCW1);

  
    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        HCW.stop();
        if(MJ1 == false){
         MJ.play();
        }
        else{
            console.log("Song Name: Chicago");
            document.getElementById("song_id").innerHTML = "Song Name: Chicago";
        }
    }
    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        MJ.stop();
        if(HCW1 == false){
            HCW.play();
        }
        else{
            console.log("Song Name: Heaven Can Wait");
            document.getElementById("song_id").innerHTML = "Song Name: Heaven Can Wait";
        }
    }

}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

 

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);
        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);


    }
}
function stop() {
    MJ.stop();
    HCW.stop();
}
