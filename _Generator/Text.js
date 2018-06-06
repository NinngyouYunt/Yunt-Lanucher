const text = (number, side, total) => {
  if (side === 'right') 
    return [
      '[T'+number+']',
      'Meter=STRING',
      'X=('+number+' * #iconSize# + '+number+' * #xSpan#)',
      'Y=(#iconSize# + #ySpan#)',
      'FontColor=255,255,255,255',
      'SolidColor=0,0,0,170',
      'FontSize=#fontSize#',
      'FontFace=#fontFace#',
      'StringStyle=NORMAL',
      'StringAlign=LEFT',
      'Text=#name'+number+'#',
      'AntiAlias=1',
      'Hidden=1'
    ];
  if (side === 'left')
  return [
    '[T'+number+']',
    'Meter=STRING',
    'X=('+(total-number)+' * #iconSize# + '+(total-number)+' * #xSpan# + 5)',
    'Y=(#iconSize# + #ySpan#)',
    'FontColor=255,255,255,255',
    'SolidColor=0,0,0,170',
    'FontSize=#fontSize#',
    'FontFace=#fontFace#',
    'StringStyle=NORMAL',
    'StringAlign=LEFT',
    'Text=#name'+number+'#',
    'AntiAlias=1',
    'Hidden=1'
  ];
  if (side === 'bottom')
    return [
      '[T'+number+']',
      'Meter=STRING',
      'X=(#iconSize# + #xSpan#)',
      'Y=('+number+' * #iconSize# + '+number+' * #ySpan# + (#iconSize# - #fontSize#) / 4)',
      'FontColor=255,255,255,255',
      'SolidColor=0,0,0,170',
      'FontSize=#fontSize#',
      'FontFace=#fontFace#',
      'StringStyle=NORMAL',
      'StringAlign=LEFT',
      'Text=#name'+number+'#',
      'AntiAlias=1',
      'Hidden=1'
    ];
};