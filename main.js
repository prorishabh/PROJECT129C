song1="";
song2="";

leftWristX=0;
leftWristY=0;

status1="";

scoreleftWrist=0;

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup()
{
    canvas=createCanvas(600,530);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);

}

function draw()
{
    image(video,0,0,600,530);

    fill("#ffff05");
    stroke("#ff0505");

    status1=song1.isPlaying();
    console.log("Peter pan song");

    if(scoreleftWrist>0.2)
    {

     circle(leftWristX,leftWristY,20);
     song2.stop();
     if(status1==false)
     {
        song1.play();
        document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song"

     }     

    }
}


function modelLoaded()
{
    console.log("Model is Loaded");
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist"+scoreleftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX="+leftWristX+" leftWristY="+leftWristY);
    }
}