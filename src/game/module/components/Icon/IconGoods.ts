/**
 *
 * @author 
 *
 */

namespace components {
    export class IconData {
        public sIcon: string = "";               /**iocn图片名称*/

        public nQuality: number = 1;             /**品质*/
        public bShowQualityTx: boolean = false;  /**是否显示特效*/

        public bShowNum: boolean = false;        /**是否显示数量*/
        public bZeroShow: boolean = false;       /**数量0时不显示数量*/
        public nNum: number = 0;                 /**数量*/
        public sSymbol: string = "";             /**数量描述*/

        public nCostNum: number = 0;             /**消耗数量*/

        public bShowName: boolean = false;       /**是否显示名称*/
        public sName: string = "";               /**名称*/
    }

    export class IconGoods extends eui.Component implements IBaseComponent {
        public group_icon: eui.Group;
        public img_icon_bg: eui.Image;
        public img_icon: eui.Image;
        public img_num_bg: eui.Image;
        public lab_num: eui.Label;

        public group_name: eui.Group;
        public lab_name: eui.Label;


        private tCurData: components.IconData;
        private touchHandle: any;

        public constructor() {
            super();

            this.skinName = IconGoodsSkin;

            this.initUI();
        }

        public initUI(): void {

        }

        public open() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        public close() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        private onTouch(...parmas): void {
            if (this.touchHandle != null) {
                this.touchHandle(this.tCurData);
            }
        }

        /**
         * 设置点击回调函数
        */
        public setTouchHandle(_handle: void): void {
            this.touchHandle = _handle;
        }

        /**
         * 设置数据
         * @param _tData:数据
         * */
        public setCurData(_tData: components.IconData): void {
            this.tCurData = _tData
            this.updateView()
        }

        /**
         * 更新物品展示
         * _bIsShowNum:是否显示数量
         * */
        private updateView(): void {
            if (this.tCurData == null) {
                return;
            }
            /**设置icon*/
            this.setIconImg(this.tCurData.sIcon)

            /**设置Icon标签*/
            //this.setSideIcon(self.tCurData.sSideIcon)

            /**设置品质*/
            setBgQuality(this.img_icon_bg, this.tCurData.nQuality);

            /**设置特效*/
            if (this.tCurData.bShowQualityTx) {
                //setIconTx(this.group_icon, this.tCurData.nQuality)
                Error("功能还没实现")
            }

            /**设置数量*/
            if (this.tCurData.bShowNum) {
                this.setIsShowNumber(true);
                this.setNumber(this.tCurData);
            } else {
                this.setIsShowNumber(false);
            }

            /**设置名称*/
            if (this.tCurData.bShowName) {
                this.setIsShowMore(true);
                this.setMoreText(this.tCurData.sName);
                this.setMoreTextColor(ColorUtils.getColorByQuality(this.tCurData.nQuality));
            } else {
                this.setIsShowMore(false);
            }
        }

        /**
         * 设置缩放值
         * @param _scale：缩放值
         */
        public setScale(_scale: number): void {
            this.scaleX = _scale;
            this.scaleY = _scale;
        }

        /**
         * 设置icon图片
         * @param _img icon路径
         * */
        private setIconImg(_img: string): void {
            if (_img == null) {
                return;
            }
            this.img_icon.source = _img;
            //this.pImgIcon:setScale(__nItemWidth / self.pImgIcon:getWidth());
        }


        /**
         * 设置是否展示数量
         * @param _bShow:是否显示数量
         * */
        public setIsShowNumber(_bShow: boolean): void {
            this.img_num_bg.$setVisible(_bShow);
            this.lab_num.$setVisible(_bShow);
        }

        /**
         * 设置数量
         * @param _nNum:数量
         * @param _symbol:数量的描述文字
         * @param _bZeroShow：数量0时是否显示
         */
        private setNumber(data: components.IconData): void {
            let num = data.nNum;
            let symbol = data.sSymbol;
            let isZeroShow = data.bZeroShow;
            let cost = data.nCostNum;

            if (num == null) {
                return
            }

            /**设置数量文本*/
            let strNum:string = "";
            if (cost == 0) {
                if (symbol != null) {
                    strNum = App.StringUtils.format('<font color="$0">$1$2</font>', _cc.pwhite, symbol, num); 
                } else {
                    strNum = App.StringUtils.format('<font color="$0">$1</font>', _cc.pwhite, num); 
                }
            } else {
                let color = _cc.green;
                if (num < cost){
                    color = _cc.red;
                }
                strNum = App.StringUtils.format('<font color="$0">$1</font><font color="$2">/$3</font>', color, num, _cc.pwhite, cost);                
            }
            this.lab_num.textFlow = (new egret.HtmlTextParser).parser(strNum);


            /**文本最小宽度*/
            if (this.lab_num.width < 30) {
                this.lab_num.width = 30
            }
            /**文本背景跟随高度*/
            this.img_num_bg.width = this.lab_num.width + 4;
            /**动态设置位置*/
            this.img_num_bg.x = this.group_icon.width - this.img_num_bg.width - 6;
            this.lab_num.x = this.img_num_bg.x + 2;

            /**是否显示数量*/
            if (num > 0) {
                this.setIsShowNumber(true);
            } else {
                if (isZeroShow) {
                    this.setIsShowNumber(true);
                } else {
                    this.setIsShowNumber(false);
                }
            }
        }


        /**
         * 设置是否显示特效
         * @param _bShow:是否显示特效
        */
        public setIsShowBgQualityTx(_bShow: boolean): void {
            Error("setIsShowBgQualityTx还没实现");
        }

        /**
         * 是否设置更多的内容(名称)
         * @param _bShow:是否显示
         */
        public setIsShowMore(_bShow: boolean): void {
            this.group_name.$setVisible(_bShow);
        }
        /**
         * 设置底部文字
         * @param _sStr:底部文字
         * */
        private setMoreText(_sStr: string): void {
            if (_sStr == null) {
                this.group_name.$setVisible(false);
                return;
            }
            this.group_name.$setVisible(true);
            this.lab_name.text = _sStr;
        }

        /**
         * 设置底部文字颜色
         * @param _color: 16进制颜色值 例：0xFFFFFF
         * */
        private setMoreTextColor(_color: number): void {
            if (_color == null) {
                return;
            }
            this.lab_name.textColor = _color;
        }



    }
}