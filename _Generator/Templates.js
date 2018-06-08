const nl = "<br/>";

function name(x, y) {
    return String(x) + '-' + String(y);
}
getIconTemplate = (x, y) => {
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
getField = (x, y) => {
    return [
        'name' + name(x, y) + '=NAME',
        'path' + name(x, y) + '="PATH"'
    ];
};

createIcon = (x, y, groupName = 'Ungroup') => {
    let result = getIconTemplate(x, y).concat([
        'LeftMouseUpAction=["#path' + name(x, y) + '#"]',
        'Group=' + groupName
    ]);
    if (!(groupName === 'Ungroup')) {
        result.concat(['Hidden=1']);
    }
    return result;
};

createToggleParent = (x, y, groupName) => {
    let result = getIconTemplate(x, y).concat([
        'MouseOverAction=[!ToggleMeterGroup ' + groupName + '] [!Redraw]',
        'Group=ToggleParent'
    ]);
    return result;
};

createHoverParent = (x, y, groupName) => {
    let result = getIconTemplate(x, y).concat([
        'MouseOverAction=[!ShowMeter ' + groupName + '] [!Redraw]',
        'Group=HoverParent'
    ]);
    return result;
};

createBackground = (x, y, length, direction = 'Right', groupName) => {
    let result = [
        '[' + groupName + ']',
        'Meter=String',
        'SolidColor=0,0,0,1',
        'MouseOverAction=[!ShowMeterGroup ' + groupName + '] [!Redraw]',
        'MouseLeaveAction=[!HideMeterGroup ' + groupName + '] [!HideMeter ' + groupName + '] [!Redraw]',
        'Hidden=1'
    ];
    switch (direction.toUpperCase()[0]) {
        case 'L':
            result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#)) - (' + length + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#))',
                'W=(' + length + ' * (#SIZE# + #GAP#))',
                'H=#SIZE#'
            ]);
            break;
        case 'R':
            result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#))',
                'W=(' + length + ' * (#SIZE# + #GAP#))',
                'H=#SIZE#'
            ]);
            break;
        case 'U':
            result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#)) - (' + length + ' * (#SIZE# + #GAP#))',
                'W=#iconSize#',
                'H=(' + length + ' * (#SIZE# + #GAP#))'
            ]);
        case 'D':
            result.concat([
                'X=(' + x + ' * (#SIZE# + #GAP#))',
                'Y=(' + y + ' * (#SIZE# + #GAP#))',
                'W=#iconSize#',
                'H=(' + length + ' * (#SIZE# + #GAP#))'
            ]);
            break;
    }
};


createHoverGroup = (x, y, length, direction, groupName) => {
    let parent = createHoverParent(x, y, groupName);
    let children = [];
    switch (direction.toUpperCase()[0]) {
        case 'L':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x - 1, y, groupName))
            }
            break;
        case 'R':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x + 1, y, groupName))
            }
            break;
        case 'U':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, y - 1, groupName))
            }
        case 'D':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, y + 1, groupName))
            }
            break;
    }
    let background = createBackground(x, y, length, direction, groupName);
    return {
        parent: parent,
        children: children,
        background: background
    };
};

createToggleGroup = () => {
    let parent = createToggleGroup(x, y, groupName);
    let children = [];
    switch (direction.toUpperCase()[0]) {
        case 'L':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x - 1, y, groupName))
            }
            break;
        case 'R':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x + 1, y, groupName))
            }
            break;
        case 'U':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, y - 1, groupName))
            }
        case 'D':
            for (let i = 1; i < length; i++) {
                children.push(createIcon(x, y + 1, groupName))
            }
            break;
    }
    return {
        parent: parent,
        children: children
    };
};