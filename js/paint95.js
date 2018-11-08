var paint={};

paint.colors = ["red", "blue", "yellow", "green", "black"];

paint.generateColorsButton = function(){
    for (var i=0; i<paint.colors.length; i++){
        var buttonItem = document.createElement('li');
        var newButton = document.createElement('button');
        newButton.style.backgroundColor = paint.colors[i];
        newButton.className = "selector";
        buttonItem.id = paint.colors[i];
        buttonItem.appendChild(newButton);
        document.getElementById("colors-menu").appendChild(buttonItem);
        
    }
}

paint.startDrawing = function(){
    var newDiv = document.createElement('div');
    newDiv.style.backgroundColor = "black";
    newDiv.style.width = "5px";
    newDiv.style.height = "5px";
    newDiv.style.borderRadius = '50%';
    newDiv.style.position = 'absolute';
    newDiv.style.left = (event.pageX -this.offsetLeft)+'px';
    newDiv.style.top = (event.pageY - this.offsetTop)+'px';
    var elem = document.getElementById("canvas");
    elem.appendChild(newDiv);
}

document.getElementById("canvas").addEventListener("mousedown", function(){
    document.getElementById("canvas").addEventListener("mousemove", paint.startDrawing);

});

document.addEventListener("click", function () {
    document.getElementById("canvas").removeEventListener("mousemove", paint.startDrawing);
});



paint.generateColorsButton();