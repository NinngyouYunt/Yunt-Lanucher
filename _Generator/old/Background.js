const bg = (total, side) => {
  if (side === 'right') 
    return [
      '[G1BG]',
      'Meter=String',
      'X=0',
      'Y=0',
      'W=('+(total+1)+' * #iconSize# + '+total+' * #xSpan# + 5)',
      'H=#iconSize#',
      'SolidColor=0,0,0,1',
      'MouseOverAction=[!ShowMeterGroup G1] [!Redraw]',
      'MouseLeaveAction=[!HideMeterGroup G1] [!HideMeter G1BG] [!Redraw]',
      'Hidden=1'
    ];
  if (side === 'left')
    return [
      '[G1BG]',
      'Meter=String',
      'X=0',
      'Y=0',
      'W=('+(total+1)+' * #iconSize# + '+total+' * #xSpan# + 5)',
      'H=#iconSize#',
      'SolidColor=0,0,0,1',
      'MouseOverAction=[!ShowMeterGroup G1] [!Redraw]',
      'MouseLeaveAction=[!HideMeterGroup G1] [!HideMeter G1BG] [!Redraw]',
      'Hidden=1'
    ];
  if (side === 'bottom')
    return [
      '[G1BG]',
      'Meter=String',
      'X=0',
      'Y=0',
      'W=#iconSize#',
      'H=('+(total+1)+' * #iconSize# + '+total+' * #ySpan# + 5)',
      'SolidColor=0,0,0,1',
      'MouseOverAction=[!ShowMeterGroup G1] [!Redraw]',
      'MouseLeaveAction=[!HideMeterGroup G1] [!HideMeter G1BG] [!Redraw]',
      'Hidden=1'
    ];
};