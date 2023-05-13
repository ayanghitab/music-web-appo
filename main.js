song1 = "";
song2 = "";


leftWristX = 0;
leftWristY=0;

rightWristX = 0;
leftWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
 
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded() {
    console.log('PoseNet Is Intialized');
}

 
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);
       
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.Y;
        console.log("leftWristX = " + leftWristX +"leftWristY = "+ leftWristY)

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = " +rightWristY);

    }
}


function draw() {
    image(video, 0, 0, 600, 500);
    if(scoreRightWrist > 0.2) 
    { circle  (rightWristX,rightWristY,20);
         song2.stop(); 
         if(song1_status == false) 
         { 
            song1.play(); 
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song" } 
        }
       
        if(scoreleftWrist > 0.2) 
        { circle  (lefttWristX,leftWristY,20);
             song1.stop(); 
             if(song2_status == false) 
             { 
                song2.play(); 
                document.getElementById("song").innerHTML = "Playing - Peter Pan Theme Song" } 
            }
        
}


function play1() {
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
}



function play2() {
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
}

