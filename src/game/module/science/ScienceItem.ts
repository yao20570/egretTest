/*
 * @Author: Liuxn 
 * @Date: 2018-04-13 16:14:13 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-13 16:35:31
 */

class ScienceItem extends eui.Panel {
    public icon:eui.Image;
    public itemName:eui.Label;
    public discreable:eui.Label;
    public btn:components.Button;
    public progress:eui.Label;


    public constructor(){
        super();
        this.skinName = ScienceInfoItem;
    }

    public initData(_data:any):void{
        this.icon = _data.icon;
        this.itemName = _data.itemName;
        this.discreable = _data.discreable;
    }
}