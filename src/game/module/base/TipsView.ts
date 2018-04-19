// TypeScript file

class TipsView extends BaseEuiView {
    private container: egret.DisplayObjectContainer;

    public constructor(controller: BaseController, parent: eui.Group) {
        super(controller, parent);
        this.container = new egret.DisplayObjectContainer();
    }

    public initUI() {
        super.initUI();
        // 居中显示
        let maxW: number = App.StageUtils.getWidth();
        let maxH: number = App.StageUtils.getHeight();
        this.container.x = (maxW - this.container.width) * 0.5;
        this.container.y = (maxH - this.container.height) * 0.5;
    }


    private createTextfield(size: number, color: number = 0xffffff,
        vAgain: string = egret.VerticalAlign.MIDDLE,
        hAgain: string = egret.HorizontalAlign.CENTER,
        family: string = "Verdana"): egret.TextField {

        let textfield = new egret.TextField();
        textfield.size = size;
        textfield.textColor = color;
        textfield.textAlign = hAgain;
        textfield.verticalAlign = vAgain;
        textfield.fontFamily = family;
        textfield.cacheAsBitmap = true;
        return textfield;
    }

    public showTips(tip: string, color: number = 0xffffff): void {
        let maxW: number = App.StageUtils.getWidth();
        let maxH: number = App.StageUtils.getHeight();

        let textfield: egret.TextField = this.createTextfield(30);
        textfield.text = tip;
        textfield.textColor = color;
        textfield.width = textfield.textWidth;
        textfield.height = textfield.textHeight;

        //居中显示
        textfield.x = (maxW - textfield.width) * 0.5;
        textfield.y = (maxH - textfield.height) * 0.5;
        //  添加到Tips层

        this.container.addChild(textfield);
        //使用egret的自身缓动
        // egret.Tween.get(textfield).to({ y: maxH * 0.4, alpha: 0 }, 1000, egret.Ease.circIn).call(function (target: egret.TextField): void {
        //     // 在缓动结束是清除创建的文本
        //     this.container.removeChild(target);
        // }, this, [textfield]);
    }

    public open(tip: string, color: number = 0xffffff) {
        super.open();
        this.showTips(tip, color);        
    }

    public close() {
        super.close();
        App.ViewManager.closeView(this);
    }
}