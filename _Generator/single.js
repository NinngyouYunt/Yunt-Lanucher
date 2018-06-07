class Onigiri{
  constructor(x, y, gruopNumber=0) {
    this.icon = [
      '['+x+'-'+y+']',
      'Meter=Image',
      'ImageName=#PATH#\\#name'+x+'-'+y+'#.png',
      'X=('+x+' * (#SIZE# + #GAP#))',
      'Y=('+y+' * (#SIZE# + #GAP#))',
      'W=#SIZE#',
      'H=#SIZE#',
      'AntiAlias=1',
      // 'MouseOverAction=[!ShowMeter T'+x+'-'+y+'] [!Redraw]',
      // 'MouseLeaveAction=[!HideMeter T'+x+'-'+y+'] [!Redraw]',
      'LeftMouseUpAction=["#link'+x+'-'+y+'#"]',
      'Group=G'+gruopNumber,
      'Hidden=0',
    ];
    this.tooltip = [
      '[T'+x+'-'+y+']',
      'Meter=STRING',
      'X=('+x+' * (#GAP#+#SIZE#) + #SIZE#)',
      'Y=('+y+' * (#GAP#+#SIZE#) + 0.5 * #SIZE#)',
      'FontColor=255,255,255,255',
      'SolidColor=0,0,0,170',
      'FontSize=#FONTSIZE#',
      'FontFace=#FONT#',
      'StringStyle=NORMAL',
      'StringAlign=LEFTCENTER',
      'Text=#name'+x+'-'+y+'#',
      'AntiAlias=1',
      'Hidden=1'
    ];
  }
  iconHtml() {
    let html="";
    this.icon.forEach((line)=>{html=html+line+'<br/>'});
    return html;
  }
  tooltipHtml() {
    let html="";
    this.tooltip.forEach((line)=>{html=html+line+'<br/>'});
    return html;
  }
}

class Set{
  constructor(width, height) {
    this.vars = [
      '[Variables]',
      'SIZE=48',
      'GAP=10',
      'FONT=Arial',
      'FONTSIZE=20',
      'PATH=#@#\\',
    ];
    this.fields = [];
    this.onigiris = [];
    for (let x=0;x<width;x++){
      this.onigiris.push([]);
      for (let y=0;y<height;y++){
        this.onigiris[x].push(new Onigiri(x,y));
        this.fields.push('name'+x+'-'+y+'=onigiri');
        this.fields.push('link'+x+'-'+y+'="PATH"');
      }
    }
  }
  getHtml() {
    let html = '====================================================<br/>';
    this.vars.forEach((line)=>{html=html+line+'<br/>'});
    html=html+'<br/>';
    this.fields.forEach((line)=>{html=html+line+'<br/>'});
    html=html+'<br/>====================================================<br/>';
    this.onigiris.forEach((row)=>{
      row.forEach((line)=>{html=html+line.iconHtml()+'<br/>';});
    });
    html=html+'====================================================<br/>';
    // this.onigiris.forEach((row)=>{
    //   row.forEach((line)=>{html=html+line.tooltipHtml()+'<br/>';});
    // });
    // html=html+'====================================================<br/>';
    return html;
  }
}
const generate = () => {
  let width = Number(document.getElementById('w').value);
  let height = Number(document.getElementById('h').value);
  let set = new Set(width,height);
  document.getElementById('content').innerHTML=set.getHtml();
}
const generateOne = () => {
  let width = Number(document.getElementById('w').value);
  let height = Number(document.getElementById('h').value);
  let onigiri = new Onigiri(width, height);
  document.getElementById('content').innerHTML=onigiri.iconHtml()+'<br/>'+onigiri.tooltipHtml()+'<br/>'+'name'+width+'-'+height+'=onigiri'+'<br/>'+'link'+width+'-'+height+'="PATH"';
}