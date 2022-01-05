status="";
object_name="";
objects=[];

function setup() {
    canvas=createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);

    if(status !="") {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++) {
            fill("yellow");
            percentage=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percentage+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("yellow");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label==object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("number_of_objects").innerHTML=object_name+" found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("number_of_objects").innerHTML=object_name+" not found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}

function start() {
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Is Loaded!");
    status=true;
}