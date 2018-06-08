// createIcon, getFields, createHoverGroup, createToggleGroup
// x,y,n / x,y,l,d,n
// {parent, children[], background} {background} 
function getHtmlCode(list) {
    let output = "";
    list.forEach(element => {
        output = output + element + nl;
    });
    return output;
}

function changeContent(id, content) {
    document.getElementById(id).innerHTML = content;
}

function getInput(id) {
    return document.getElementById(id).value;
}

function getChoice(id) {
    let e = document.getElementById(id);
    return e.options[e.selected()].value;
}

function allInput() {
    return {
        x: getInput('x'),
        y: getInput('y '),
        group: getInput('group'),
        length: getInput('length'),
        type: getChoice('type'),
        direction: getChoice('direction')
    };
}