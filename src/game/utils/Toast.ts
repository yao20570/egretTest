/**
 * 提示消息工具类
 */
class Toast {
    /**全局字体颜色表--可以扩展*/
    static TextColors = {
        /**白色*/
        white: 0xFFFFFF,
        /**乳白色 */
        milkWhite: 0xfbf1af,
        /**灰白色*/
        grayWhite: 0xceb6a2,
        /**金黄色 */
        yellow: 0xffff00,
        /**淡黄色*/
        lightYellow: 0xffd375,
        /**橘黄色 道具名称 玩家姓名 */
        orangeYellow: 0xff9900,
        /**红色*/
        red: 0xf11300,
        /**绿色 */
        green: 0x00e500,
        /**蓝色 */
        blue: 0x1a94d7,
        /**墨蓝色 */
        grayBlue: 0x2f5177,
        /**紫色 */
        purple: 0xe938f2,
        /**粉色 */
        pink: 0xFF3030,
        /**黑色*/
        black: 0x2e2d2d,
        /**金色*/
        golden: 0xFFD700
    }

    /**全局字体大小表--可以扩展*/
    static LabelFontSize = {
        /**小型字体大小*/
        littleSize: 12,
        /**中型字体大小*/
        middleSize: 18,
        /**正常字体大小*/
        normalSize: 24,
        /**大型字体大小*/
        bigSize: 36
    }



    /**
     * 从下到上弹出
     */
    static showTipsDownToUp(str: string = "", isWarning: boolean = false): void {
        var effectTips = new egret.TextField();
        let curHeight = App.StageUtils.getHeight();
        let curWidth = App.StageUtils.getWidth();

        effectTips.size = 24;
        effectTips.y = curHeight / 2;
        if (isWarning) {
            effectTips.textColor = Toast.TextColors.red;
        } else {
            effectTips.textColor = Toast.TextColors.green;
        }
        effectTips.alpha = 0;

        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = curWidth / 2 - effectTips.width / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;

        if (!LayerManager.UI_Tips.contains(effectTips)) {
            LayerManager.UI_Tips.addChild(effectTips);
        }

        var onComplete2: Function = function () {
            if (LayerManager.UI_Tips.contains(effectTips)) {
                LayerManager.UI_Tips.removeChild(effectTips);
                effectTips = null;
            }
        };
        var onComplete1: Function = function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 1200).call(onComplete2, this);
        };
        effectTips.visible = true;
        egret.Tween.get(effectTips).to({ y: effectTips.y - 120, alpha: 1 }, 800, egret.Ease.backOut).call(onComplete1, this);
    }

    /**
     * 从左至右 或者 从右至左
     */
    public static showTipsLeftOrRight(str: string = "", isWarning: boolean = false, isFromeLeft: boolean = true): void {
        var effectTips = new egret.TextField();
        let curHeight = App.StageUtils.getHeight();
        let curWidth = App.StageUtils.getWidth();

        effectTips.size = 24;
        effectTips.y = curHeight / 2;
        if (isWarning) {
            effectTips.textColor = Toast.TextColors.red;
        } else {
            effectTips.textColor = Toast.TextColors.green;
        }
        effectTips.alpha = 0;

        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        if (isFromeLeft) {
            effectTips.x = - effectTips.width;
        } else {
            effectTips.x = curWidth;
        }
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;

        if (!LayerManager.UI_Tips.contains(effectTips)) {
            LayerManager.UI_Tips.addChild(effectTips);
        }

        if (isFromeLeft) {
            egret.Tween.get(effectTips).to({ x: curWidth / 2 - effectTips.width / 2 - 50, alpha: 1 }, 300, egret.Ease.sineInOut);
        } else {
            egret.Tween.get(effectTips).to({ x: curWidth / 2 - effectTips.width / 2 + 50, alpha: 1 }, 300, egret.Ease.sineInOut);
        }

        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: effectTips.x + 100 }, 500);
            } else {
                egret.Tween.get(effectTips).to({ x: effectTips.x - 100 }, 500);
            }
        }, this, 300);

        egret.setTimeout(function () {
            if (isFromeLeft) {
                egret.Tween.get(effectTips).to({ x: curWidth }, 300, egret.Ease.sineIn);
            } else {
                egret.Tween.get(effectTips).to({ x: -effectTips.width }, 300, egret.Ease.sineIn);
            }
        }, this, 800);

        egret.setTimeout(function () {
            if (LayerManager.UI_Tips.contains(effectTips)) {
                LayerManager.UI_Tips.removeChild(effectTips);
                effectTips = null;
            }
        }, this, 1100);

    }

    /**
     * 从里到外
     */
    public static showTipsFromCenter(str: string = "", isWarning: boolean = false): void {
        var effectTips = new egret.TextField();
        let curHeight = App.StageUtils.getHeight();
        let curWidth = App.StageUtils.getWidth();
        effectTips.size = 24;
        effectTips.y = curHeight / 2;
        if (isWarning) {
            effectTips.textColor = Toast.TextColors.red;
        } else {
            effectTips.textColor = Toast.TextColors.green;
        }
        effectTips.alpha = 0;

        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = curWidth / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;

        if (!LayerManager.UI_Tips.contains(effectTips)) {
            LayerManager.UI_Tips.addChild(effectTips);
        }

        effectTips.anchorOffsetX = effectTips.width / 2;
        effectTips.anchorOffsetY = effectTips.height / 2;
        effectTips.scaleX = 0;
        effectTips.scaleY = 0;

        var onComplete2: Function = function () {
            if (LayerManager.UI_Tips.contains(effectTips)) {
                LayerManager.UI_Tips.removeChild(effectTips);
                effectTips = null;
            }
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        }, this, 1000);

    }

    /**
     * 从外到里
     */
    public static showTipsBigToSmall(str: string = "", isWarning: boolean = false): void {
        var effectTips = new egret.TextField();
        let curHeight = App.StageUtils.getHeight();
        let curWidth = App.StageUtils.getWidth();

        effectTips.size = 24;
        effectTips.y = curHeight / 2;
        if (isWarning) {
            effectTips.textColor = Toast.TextColors.red;
        } else {
            effectTips.textColor = Toast.TextColors.green;
        }
        effectTips.alpha = 0;

        effectTips.text = str;
        effectTips.strokeColor = 0x000000;
        effectTips.x = curWidth / 2;
        effectTips.stroke = 2;
        effectTips.bold = true;
        effectTips.textAlign = egret.HorizontalAlign.CENTER;

        if (!LayerManager.UI_Tips.contains(effectTips)) {
            LayerManager.UI_Tips.addChild(effectTips);
        }

        effectTips.anchorOffsetX = effectTips.width / 2;
        effectTips.anchorOffsetY = effectTips.height / 2;
        effectTips.scaleX = 4;
        effectTips.scaleY = 4;

        var onComplete2: Function = function () {
            if (LayerManager.UI_Tips.contains(effectTips)) {
                LayerManager.UI_Tips.removeChild(effectTips);
                effectTips = null;
            }
        };
        egret.Tween.get(effectTips).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200);
        egret.setTimeout(function () {
            egret.Tween.get(effectTips).to({ alpha: 0 }, 500).call(onComplete2, this);
        }, this, 1000);

    }
}