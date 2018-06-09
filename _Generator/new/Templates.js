const nl = "<br/>";
const lb = "====================================================<br/>"

function name(x, y) {
    return String(x) + '-' + String(y);
}
const getIconTemplate = (x, y) => {
    return [
        '[' + name(x, y) + ']',
        'Meter=Image',
        'ImageName=#PATH#\\#name' + name(x, y) + '#.png',
        'X=(' + x + ' * (#SIZE# + #GAP#))',
        'Y=(' + y + ' * (#SIZE# + #GAP#))',
        'W=#SIZE#',
        'H=#SIZE#',
        'AntiAlias=1'
    ];
};
const getField = (x, y) => {
    return [
        'name' + name(x, y) + '=NAME',
        'path' + name(x, y) + '="PATH"'
    ];
};

const createIcon = (x, y, groupName = 'Ungroup') => {
    let result = getIconTemplate(x, y).concat([
        'LeftMouseUpAction=["#path' + name(x, y) + '#"]',
        'Group=' + groupName
    ]);
    if (!(groupName === 'Ungroup')) {
        result.push('Hidden=1');
    }
    return result;
};

const createToggleParent = (x, y, groupName) => {
    let result = getIconTemplate(x, y).concat([
        'LeftMouseUpAction=[!ToggleMeterGroup ' + groupName + '] [!Redraw]',
        'Group=ToggleParent'
    ]);
    return result;
};

const createHoverParent = (x, y, groupName) => {
    let result = getIconTemplate(x, y).concat([
        'MouseOverAction=[!ShowMeter ' + groupName + '] [!Redraw]',
        'Group=HoverParent'
    ]);
    return result;
};

const createBackground = (x, y, length, direction, groupName) => {
    let result = [
        '[' + groupName + ']',
        'Meter=String',
        'SolidColor=0,0,0,1',
        'MouseOverAction=[!ShowMeterGroup ' + groupName + '] [!Redraw]',
        'MouseLeaveAction=[!HideMeterGroup ' + groupName + '] [!HideMeter ' + groupName + '] [!Redraw]',
        'Hidden=1'
    ];

    switch (direction) {
        case 'L':
            result = result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#)) - (' + length + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#))',
                'W=(' + length + ' * (#SIZE# + #GAP#))',
                'H=#SIZE#'
            ]);
            break;
        case 'R':
            result = result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#))',
                'W=(' + length + ' * (#SIZE# + #GAP#))',
                'H=#SIZE#'
            ]);
            break;
        case 'U':
            result = result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#)) - (' + length + ' * (#SIZE# + #GAP#))',
                'W=#SIZE#',
                'H=(' + length + ' * (#SIZE# + #GAP#))'
            ]);
        case 'D':
            result = result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#))',
                'W=#SIZE#',
                'H=(' + length + ' * (#SIZE# + #GAP#))'
            ]);
            break;
    }
    return result
};


const createHoverGroup = (x, y, length, direction, groupName) => {
    let parent = createHoverParent(x, y, groupName);
    x = Number(x);
    y = Number(y);
    length = Number(length);
    let children = [];
    let fields = [getField(x, y)];
    switch (direction) {
        case 'L':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(Number(x - i), y, groupName));
                fields.push(getField(Number(x - i), y));
            }
            break;
        case 'R':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(Number(x + i), y, groupName));
                fields.push(getField(Number(x + i), y));
            }
            break;
        case 'U':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, Number(y - i), groupName));
                fields.push(getField(x, Number(y - i)));
            }
            break;
        case 'D':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, Number(y) + i, groupName));
                fields.push(getField(x, Number(y + i)));
            }
            break;
    }
    let background = createBackground(x, y, length, direction, groupName);
    return {
        parent: parent,
        children: children,
        fields: fields,
        background: background
    };
};

const createToggleGroup = (x, y, length, direction, groupName) => {
    let parent = createToggleParent(x, y, groupName);
    let children = [];
    let fields = [getField(x, y)];
    switch (direction) {
        case 'L':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(Number(x) - i, y, groupName));
                fields.push(getField(Number(x) - i, y));
            }
            break;
        case 'R':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(Number(x) + i, y, groupName));
                fields.push(getField(Number(x) + i, y));
            }
            break;
        case 'U':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, Number(y) - i, groupName));
                fields.push(getField(x, Number(y) - i));
            }
            break;
        case 'D':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, Number(y) + i, groupName));
                fields.push(getField(x, Number(y) + i));
            }
            break;
    }
    return {
        parent: parent,
        children: children,
        fields: fields
    };
};

const createHeader = () => {
    return [
        '[Variables]',
        'SIZE=48',
        'GAP=10',
        'FONT=Arial',
        'FONTSIZE=20',
        'PATH=#@#\\',
    ];
};