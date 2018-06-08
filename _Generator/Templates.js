class Onigiri{
  constructor(x, y){
    // Just Icon and do nothing
    this.x = x;
    this.y = y;
    this.code = [
      '['+this.name()+']',
      'Meter=Image',
      'ImageName=#PATH#\\#name'+this.name()+'#.png',
      'X=('+this.x+' * (#SIZE# + #GAP#))',
      'Y=('+this.y+' * (#SIZE# + #GAP#))',
      'W=#SIZE#',
      'H=#SIZE#',
      'AntiAlias=1'
    ];
    this.config = [
      'name'+this.name()+'=NAME',
      'path'+this.name()+'="PATH"'
    ];
  }

  name(){
    return String(this.x)+'-'+String(this.y);
  }

  createHoverParent(groupName){
    let result = this.code.concat([
      'MouseOverAction=[!ShowMeter B-'+groupName+'] [!Redraw]',
      'Group=Parent'
    ]);
    return result;
  }

  createToggleParent(){
    let result = this.code.concat([
      'LeftMouseUpAction=[!ToggleMeterGroup '+groupName+'] [!Redraw]',
      'Group=Parent'
    ]);
    return result;
  }

  createChild(groupName='DEFAULT'){
    let result = this.code.concat([
      'LeftMouseUpAction=["#path'+this.name()+'#"]',
      'Group='+groupName
    ]);
    if (!(groupName === 'DEFAULT')){
      result.concat(['Hidden=1']);
    }
    return result;
  }

  createTooltip(){
  }


class HoverBackground{
  // Hover will show group
  constructor(x,y,length,groupName){
    thix.x = x;
    this.y = y;
    this.length = length;
    this.code = [
      'Meter=String',
      'X=('+this.x+' * (#SIZE# + #GAP#))',
      'Y=('+this.y+' * (#SIZE# + #GAP#))',
      'SolidColor=0,0,0,1',
      'MouseOverAction=[!ShowMeterGroup '+groupName+'] [!Redraw]',
      'MouseLeaveAction=[!HideMeterGroup '+groupName+'] [!HideMeter B-'+groupName+'] [!Redraw]',
      'Hidden=1'
    ];
  }
  createVertical(){
    let result = this.code.concat([
      'W=#iconSize#',
      'H=('+this.length+' * (#SIZE# + #GAP#))'
    ]);
    return result;
  }
  createHorizontal(){
    let result = this.code.concat([
      'W=('+this.length+' * (#SIZE# + #GAP#))',
      'H=#SIZE#'
    ]);
    return result;
  }
}

export {HoverParent, ToggleParent, Child, HoverBackground, Tooltip};