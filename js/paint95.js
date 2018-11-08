
function line(){
    var newDiv = document.createElement('div');
    newDiv.style.backgroundColor = "black";
    newDiv.style.width = "5px";
    newDiv.style.height = "5px";
    newDiv.style.borderRadius = '50%';
    newDiv.style.position = 'absolute';
    newDiv.style.left = (event.pageX - event.target.offsetLeft)+'px';
    newDiv.style.top = (event.pageY - event.target.offsetTop)+'px';
    var elem = document.getElementById("canvas");
    elem.appendChild(newDiv);
}

document.getElementById("canvas").addEventListener("mousedown", function(){
    document.getElementById("canvas").addEventListener("mousemove", line);

});

document.getElementById("canvas").addEventListener("click", function () {
    document.getElementById("canvas").removeEventListener("mousemove", line);
});