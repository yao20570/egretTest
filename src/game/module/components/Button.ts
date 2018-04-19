/**
 *
 * @author 
 *
 */
namespace components {
    export class Button extends eui.Button {
        public ji: eui.Label;
        public _mask:eui.Image;
        public _rect: eui.Rect;
        public _bgImg: eui.Image;
        public bgStr: string = 'v1_btn_blue1_png';
        public bgGrayStr: string = 'v1_btn_blue1_png';
        public constructor() {
            super();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        }
        private touchHandler(evt: egret.TouchEvent) {
            switch (evt.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this._rect.mask = this._mask;
                    App.SoundManager.playEffect("sound_dianji");
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this._rect.mask=null;
                    this._mask.$maskedObject = null;
                    break;
            }
        }
    
    }
}