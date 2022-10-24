quickDrawDataset = ["caneta","papel","livro","garrafa"]
randomNo = Math.floor((Math.random() * quickDrawDataset.length)+1) -1
sketch = quickDrawDataset[randomNo]
console.log(randomNo)
console.log(sketch)

document.getElementById("desenhar").innerHTML = "Esboço a Ser Desenhado: "+sketch

timerCounter = 0;
timerCheck = "";
drawSketch = "";
answerHolder = "";
score = 0;

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup(){
    canvas = createCanvas(280,280)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function draw(){
    //checkSketch()

    if(drawSketch == sketch){
        answerHolder = "set";
        score = +1;
    }
        document.getElementById("pontos").innerHTML = "pontuação:"+score;
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
  
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
  }

  function gotResult(error, results) {
    if (error) {
      console.error(error);
    }
    console.log(results);
    var result = results[0].label;
    document.getElementById('esboço').innerHTML = 'Seu Esboço é:' + result.replace('_', ' ');
  
  
    document.getElementById('Precisao').innerHTML = 'Precisão: ' + Math.round(results[0].confidence * 100) + '%';
  
    utterThis = new SpeechSynthesisUtterance(result.replace('_', ' '));
    synth.speak(utterThis);
    
  }



function updateCanvas(){
    background("white")
}

 function checkSketch(){
    timerCounter  = +1;
    document.getElementById("tempo").innerHTML = "tempo:"+timerCounter;
    
    console.log(timerCounter)

    if(timerCounter > 400){
        timerCounter = 0;
        
    }

    if(timerCheck == "completed",answerHolder == "set"){
        timerCheck = ""
        answerHolder = ""
        updateCanvas()
    }
 }

 


