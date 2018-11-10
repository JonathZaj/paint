paint = {};

paint.colors = ["red", "blue", "yellow", "green", "black"];

paint.selectedColor = "black";
paint.selectedSize = "20";

paint.generateColorsButton = function () {
    for (var i = 0; i < paint.colors.length; i++) {
        var buttonItem = document.createElement('li');
        var newButton = document.createElement('button');
        newButton.style.backgroundColor = paint.colors[i];
        newButton.className = "selector";
        buttonItem.id = paint.colors[i];
        buttonItem.appendChild(newButton);
        document.getElementById("colors-menu").appendChild(buttonItem);
        buttonItem.addEventListener('click', function (e) {
            paint.selectedColor = this.id;
        })
    }
}

paint.selectRubber = function () {
    document.getElementById("rubber").addEventListener("click", function () {
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

paint.clearPainting = function () {
    document.getElementById("clear").addEventListener("click", function () {
        var canvas = document.getElementById("canvas");
        var drawing = canvas.getElementsByTagName('div');
        while (drawing.length > 0) {
            canvas.removeChild(drawing[0]);
        }
    })
}

paint.save = function () {
    var canvas = document.getElementById("canvas");
    var canvasLeft = canvas.getBoundingClientRect().left;
    var canvasTop = canvas.getBoundingClientRect().top;
    var canvasObj = {};
    canvasObj["dots"] = [];
    var allDots = canvas.getElementsByTagName('div');
    for (var i = 0; i < allDots.length; i++) {
        var currentDot = allDots[i];
        var dotObj = {};
        dotObj["color"] = currentDot.style.backgroundColor;
        dotObj["size"] = currentDot.clientHeight;
        dotObj["top"] = currentDot.getBoundingClientRect().top - canvasTop;
        dotObj["left"] = currentDot.getBoundingClientRect().left - canvasLeft;
        canvasObj["dots"].push(dotObj);
    }
    localStorage.setItem('drawing', JSON.stringify(canvasObj));
    alert("Drawing Saved");
}

paint.load = function () {
    var loadedDrawing = localStorage.getItem('drawing');
    var canvasObj = JSON.parse(loadedDrawing);
    var canvas = document.getElementById("canvas");
    var drawing = canvas.getElementsByTagName('div');
    while (drawing.length > 0) {
        canvas.removeChild(drawing[0]);
    }
    var allDots = canvasObj["dots"];
    for (var i = 0; i < allDots.length; i++) {
        var currentDot = allDots[i];
        var newDot = document.createElement("div");
        newDot.style.backgroundColor = currentDot["color"];
        newDot.clientHeight = currentDot["size"]+"px";
        newDot.offsetWidth = currentDot["size"]+"px";
        newDot.borderRadius = "50%"
        document.getElementById("canvas").appendChild(newDot);
        newDot.style.top = currentDot["top"] + "px";
        newDot.style.left = currentDot["left"] + "px";
    }
    alert("Drawing Loaded");
}

document.getElementById('save').addEventListener("click", paint.save);
document.getElementById('load').addEventListener("click", paint.load);

paint.generateColorsButton();
paint.selectSize();
paint.selectRubber();
paint.clearPainting();