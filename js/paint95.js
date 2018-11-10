paint = {};

paint.colors = ["red", "blue", "yellow", "green", "black"];

paint.selectedColor = "black";
paint.selectedSize = "20";
console.log(paint.selectedColor);

paint.generateColorsButton = function () {
    for (var i = 0; i < paint.colors.length; i++) {
        var buttonItem = document.createElement('li');
        var newButton = document.createElement('button');
        newButton.style.backgroundColor = paint.colors[i];
        newButton.className = "selector";
        buttonItem.id = paint.colors[i];
        buttonItem.appendChild(newButton);
        document.getElementById("colors-menu").appendChild(buttonItem);
    }
    buttonItem.addEventListener('click', function (e) {
        paint.selectedColor = this.id;
    })
}

paint.selectRubber = function(){
    document.getElementById("rubber").addEventListener("click", function(){
        paint.selectedColor = "white";
    })
}

paint.selectSize = function () {
    document.getElementById("size").addEventListener("input", function () {
        paint.selectedSize = document.getElementById("size").value;
    });
}


paint.startDrawing = function () {
    var newDiv = document.createElement('div');
    newDiv.style.backgroundColor = paint.selectedColor;
    newDiv.style.width = paint.selectedSize + 'px';
    newDiv.style.height = paint.selectedSize + 'px';
    newDiv.style.borderRadius = '50%';
    newDiv.style.position = 'absolute';
    newDiv.style.left = (event.pageX - this.offsetLeft) + 'px';
    newDiv.style.top = (event.pageY - this.offsetTop) + 'px';
    var elem = document.getElementById("canvas");
    elem.appendChild(newDiv);
}

document.getElementById("canvas").addEventListener("mousedown", function () {
    document.getElementById("canvas").addEventListener("mousemove", paint.startDrawing);

});

document.addEventListener("click", function () {
    document.getElementById("canvas").removeEventListener("mousemove", paint.startDrawing);
});

paint.clearPainting = function(){
    document.getElementById("clear").addEventListener("click", function(){
        var canvas = document.getElementById("canvas");
        var drawing = canvas.getElementsByTagName('div');
        while(drawing.length>0){
            canvas.removeChild(drawing[0]);
        }
    })
}



paint.generateColorsButton();
paint.selectSize();
paint.selectRubber();
paint.clearPainting();