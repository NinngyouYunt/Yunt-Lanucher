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

function getHtmlCodes(list) {
    let output = "";
    list.forEach(element => {
        output = output + getHtmlCode(element);
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
    return e.options[e.selectedIndex].value;
}

function allInput() {
    return {
        x: getInput('x'),
        y: getInput('y'),
        group: getInput('group'),
        length: getInput('length'),
        type: getChoice('type'),
        direction: getChoice('direction')
    };
}

function generate() {
    input = allInput();
    changeContent('header', getHtmlCode(createHeader()));
    switch (input.type) {
        case "0": //Normal
            changeContent('icon', getHtmlCode(createIcon(input.x, input.y, input.group)));
            changeContent('fields', getHtmlCode(getField(input.x, input.y)));
            break;
        case "1": //Hover
            let group1 = createHoverGroup(input.x, input.y, input.length, input.direction, input.group);
            changeContent('icon', getHtmlCode(group1.parent));
            changeContent('fields', getHtmlCodes(group1.fields));
            changeContent('children', getHtmlCodes(group1.children));
            changeContent('background', getHtmlCode(group1.background));
            break;
        case "2": //Toggle
            let group2 = createToggleGroup(input.x, input.y, input.length, input.direction, input.group);
            changeContent('icon', getHtmlCode(group2.parent));
            changeContent('fields', getHtmlCodes(group2.fields));
            changeContent('children', getHtmlCodes(group2.children));
            break;
    }
}

function generateAll() {
    input = allInput();
    let html = getHtmlCode(createHeader()) + nl;
    switch (input.type) {
        case "0": //Normal
            html = html +
                getHtmlCode(getField(input.x, input.y)) + nl + lb +
                getHtmlCode(createIcon(input.x, input.y, input.group));

            break;
        case "1": //Hover
            let hoverGroup = createHoverGroup(input.x, input.y, input.length, input.direction, input.group);
            html = html +
                getHtmlCodes(hoverGroup.fields) + nl + lb +
                getHtmlCode(hoverGroup.background) + lb + nl +
                getHtmlCode(hoverGroup.parent) + lb + nl +
                getHtmlCodes(hoverGroup.children)
            break;
        case "2": //Toggle
            let toggleGroup = createToggleGroup(input.x, input.y, input.length, input.direction, input.group);
            html = html +
                getHtmlCodes(toggleGroup.fields) + nl + lb +
                getHtmlCode(toggleGroup.parent) + lb + nl +
                getHtmlCodes(toggleGroup.children)
            break;
    }
    changeContent('header', html);
}

const copy = (id) => {
    console.log(123)
    const el = document.createElement('textarea');
    el.value = document.getElementById(id).innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};