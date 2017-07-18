var doc = document;

var initTar = doc.querySelector("#init");
var resTar = doc.querySelector("#result");

var expanders = doc.querySelectorAll(".expander");
var expandedClass = "expanded";
var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;

initTar.onchange = function () {
    resTar.value = encodeSVG(initTar.value);
};

for (var i = 0; i < expanders.length; i++) {
    var expander = expanders[i];

    expander.onclick = function () {
        var parent = this.parentNode;
        var expanded = parent.querySelector("." + expandedClass);
        expanded.classList.toggle("hidden");
        this.classList.toggle("opened");
    };
}

function addNameSpace(data) {
    if (data.indexOf("http://www.w3.org/2000/svg") < 0) {
        data = data.replace(/<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'");
    }

    return data;
}

function encodeSVG(data) {
    if (data.indexOf('"') >= 0) {
        data = data.replace(/"/g, "'");
    }

    data = data.replace(/>\s{1,}</g, "><");
    data = data.replace(/\s{2,}/g, " ");

    return data.replace(symbols, escape);
}

function out(data) {
    console.log(data);
}