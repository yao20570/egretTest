/**
 * 基础面板
 */
class BasePanelView extends BaseEuiView {
    public closeGroup: components.Button;
    public iconDisplay: eui.Image;
    public button: eui.Image;
    public contentGroup: eui.Group;
    private _icon: string;
    private _btn: string;
    public constructor(controller: BaseController, parent: eui.Group) {
        super(controller, parent);
        this.skinName = skins.PanelSkin;
    }

    public set icon(value: string) {
        this._icon = value;
        if (this.iconDisplay) {
            this.iconDisplay.source = this._icon;
        }
    }

    public get icon(): string {
        return this._icon;
    }

    public set btn(value: string) {
        this._btn = value;
        if (this.button) {
            this.button.source = this._btn;
        }
    }

    public get btn(): string {
        return this._btn;
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI(): void {
        super.initUI();
        this.closeGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.closeGroupClickHandler, this);
    }

    /**
     *对面板数据的初始化，用于子类继承
     *
     */
    public initData(): void {
        super.initData();
        // this.iconDisplay.source = this._icon;
        // this.button.source = this._btn;
    }

    private closeGroupClickHandler(e: egret.TouchEvent): void {
        console.log("close view", this);
        App.ViewManager.closeView(this);
    }
}