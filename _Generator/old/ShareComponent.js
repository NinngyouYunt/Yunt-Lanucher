const variables = (number) => {
  return [
    '[Variables]',
    'iconSize=48',
    'xSpan=10',
    'ySpan=10',
    'fontSize=20',
    'fontFace=Arial',
    'iconPath=#CURRENTPATH#\\Icons',
    'toggleMode=0'
  ];
};
const fields = (number) => {
  return [
    'name'+number+'=ProgramName',
    'link'+number+'="Path"'
  ]
};
const master = (total, side) => {
  if (side === 'left')
    return [
      '[Master]',
      'Meter=Image',
      'ImageName=#iconPath#\\Category.png',
      'X=('+total+' * #iconSize# + '+total+' * #xSpan# + 5)',
      'Y=0',
      'W=#iconSize#',
      'H=#iconSize#',
      'MouseOverAction=[!ShowMeter G1BG]'
    ];
  return [
    '[Master]',
    'Meter=Image',
    'ImageName=#iconPath#\\Category.png',
    'X=0',
    'Y=0',
    'W=#iconSize#',
    'H=#iconSize#',
    'MouseOverAction=[!ShowMeter G1BG]'
  ];
};
const append = (line) => {
  content = document.getElementById('content').innerHTML;
  document.getElementById('content').innerHTML = content + line;
}
const appendL = (line) => {
  append(line+'<br/>')
}

const generate = (side) => {
  document.getElementById('title').innerHTML=side.toUpperCase()+'  Generated';
  let number = Number(document.getElementById('input').value);
  document.getElementById('content').innerHTML="";
  appendL('====================================================');
  variables().forEach(appendL);
  appendL("");
  for (let i=1; i<=number; i++){
    fields(i).forEach(appendL);
    appendL("");
  }
  appendL('====================================================');
  bg(number, side).forEach(appendL);
  appendL('<br/>====================================================');
  master(number, side).forEach(appendL);
  appendL('<br/>====================================================');
  for (let i=1; i<=number; i++){
    icon(i, side, number).forEach(appendL);
    appendL("");
  }
  appendL('====================================================');
  for (let i=1; i<=number; i++){
    text(i, side, number).forEach(appendL);
    appendL("");
  }
  append('====================================================');
  // variable - bg - master - icon - text
}