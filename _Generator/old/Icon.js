const icon = (number, side, total) => {
  if (side === 'right') 
    return [
      '[M'+number+']',
      'Meter=Image',
      'Meter=Image',
      'ImageName=#iconPath#\\#name'+number+'#.png',
      'W=#iconSize#',
      'H=#iconSize#',
      'X=('+number+' * #iconSize# + '+number+' * #xSpan#)',
      'Y=0',
      'MouseOverAction=[!ShowMeter T'+number+'] [!Redraw]',
      'MouseLeaveAction=[!HideMeter T'+number+'] [!Redraw]',
      'LeftMouseUpAction=["#link'+number+'#"]',
      'Group=G1',
      'AntiAlias=1',
      'Hidden=1'
    ];
  if (side === 'left')
    return [
      '[M'+number+']',
      'Meter=Image',
      'Meter=Image',
      'ImageName=#iconPath#\\#name'+number+'#.png',
      'W=#iconSize#',
      'H=#iconSize#',
      'X=('+(total-number)+' * #iconSize# + '+(total-number)+' * #xSpan# + 5)',
      'Y=0',
      'MouseOverAction=[!ShowMeter T'+number+'] [!Redraw]',
      'MouseLeaveAction=[!HideMeter T'+number+'] [!Redraw]',
      'LeftMouseUpAction=["#link'+number+'#"]',
      'Group=G1',
      'AntiAlias=1',
      'Hidden=1'
    ];
  if (side === 'bottom')
    return [
      '[M'+number+']',
      'Meter=Image',
      'Meter=Image',
      'ImageName=#iconPath#\\#name'+number+'#.png',
      'W=#iconSize#',
      'H=#iconSize#',
      'X=0',
      'Y=('+number+' * #iconSize# + '+number+' * #ySpan#)',
      'MouseOverAction=[!ShowMeter T'+number+'] [!Redraw]',
      'MouseLeaveAction=[!HideMeter T'+number+'] [!Redraw]',
      'LeftMouseUpAction=["#link'+number+'#"]',
      'Group=G1',
      'AntiAlias=1',
      'Hidden=1'
    ];
};