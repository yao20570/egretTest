/**
 *
 * @author 
 *
 */
namespace components {
    export class HSliderView extends eui.HSlider{
        public bgImg:string = "v1_bar_b1_png";
        public bgRoll:string= "v1_bar_yellow_3_png";
        public butStr:string= "v2_btn_tuodong_png";
        public Text:string= "购买次数：1";
        public bLeft:string="v1_btn_reduce_png";
        public bRight:string="v1_btn_increase_png";
        public _img:eui.Image;

    	public constructor() {
            super();
            this.skinName=skins.HSliderViewSkin;
            this._img.anchorOffsetX=this._img.width/2;
            this._img.anchorOffsetY=this._img.height/2;
    	}
    	/**
         * @language en_US
         * This method is called when handling a <code>egret.TouchEvent.TOUCH_END</code> event
         * when the user touches on the button. It is only called when the button
         * is the target and when <code>touchCaptured</code> is <code>true</code>.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        /**
         * @language zh_CN
         * 当在用户单击按钮之后处理 <code>egret.TouchEvent.TOUCH_END</code> 事件时，将调用此方法。
         * 仅当以按钮为目标，并且 <code>touchCaptured</code> 为 <code>true</code> 时，才会调用此方法。
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected buttonReleased():void {
            egret.log("buttonReleased")
            /**
             * 暂时没音效
             */
            App.SoundManager.playEffect("sound_dianji");

        }
        
    }
}