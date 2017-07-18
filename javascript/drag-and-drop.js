function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var file = files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        var svg = 'data:image/svg+xml,' + encodeSVG(addNameSpace(String(e.target.result).replace(/(<!--(.*?)-->)/g, "")));
        document.getElementById('init').value = svg;
        var resDemo = document.querySelector("#demo");
        $("#demo").css("background-image", "url(\"" + svg + "\")");
        console.log(svg);
    };
    fileReader.readAsText(file);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

$('button').click(function () {
    $('textarea').select();
    document.execCommand('copy');
});

$(function () {
    var demoBox = $("#demo");
    $('#bg-toggler').bootstrapToggle({
        on: 'Black',
        off: 'White'
    }).change(function () {
        var bgColor = "#000000";
        if ($(this).prop('checked')) {
            bgColor = "#ffffff";
        }
        demoBox.css("background-color", bgColor);
    });
})