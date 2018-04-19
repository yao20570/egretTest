/**
 *
 * @author 
 *
 */
namespace components{
    export class TextControl extends eui.Button{
        public normalTextrue:string ='';
        public selectTexture:string ='';
        public disabledTextrue:string = '';

        public constructor(){
            super();
            
        }

        public buttonReleased():void{
            console.log("---->>>  TextControl 弹起！");
        }

    }
}