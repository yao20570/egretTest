/**
 * 登陆视图层
 */
class LoginView extends BaseEuiView {
    private bg: egret.Bitmap;
    private logo: egret.Bitmap;

    public constructor($controller: BaseController, $parent: eui.Group) {
        super($controller, $parent);
    }

    /**
     *对面板进行显示初始化，用于子类继承
     *
     */
    public initUI(): void {
        super.initUI();
        this.bg = App.DisplayUtils.createBitmap("bg_login");
        AnchorUtil.setAnchorX(this.bg, 0.5);
        AnchorUtil.setAnchorY(this.bg, 1);
        this.bg.x = App.StageUtils.getWidth() * 0.5;
        this.bg.y = App.StageUtils.getHeight();
        this.addChild(this.bg);

        this.logo = new egret.Bitmap(RES.getRes("logo"));        
        this.logo.x = App.StageUtils.getWidth() - this.logo.width - 28;
        this.logo.y = 30;
        this.addChild(this.logo);
    }

    /**
     * 对面板数据的初始化，用于子类继承
     *
     */
    public initData(): void {
        super.initData();
    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param: any[]): void {
        super.open(param);
    }

    /**
     * 面板关闭执行函数，用于子类继承
     * @param param 参数
     */
    public close(...param: any[]): void {
        super.close(param);
    }

    /**
     * 请求登陆处理
     * @param userName
     * @param pwd
     */
    // private onLogin(): void {
    //     let loginFrame: LoginDlg = App.ViewManager.getView(ViewConst.Login_frame) as LoginDlg;
    //     var userName: string = loginFrame.accountInput.text;
    //     var pwd: string = loginFrame.passwordInput.text;
    //     // 进行基础检测
    //     if (userName == null || userName.length == 0) {
    //         return;
    //     }
    //     if (pwd == null || pwd.length == 0) {
    //         return;
    //     }
    //     this.applyFunc(LoginConst.ACC_LOGIN_REQ, userName, pwd);
    // }

    private showServer(): void {
        App.ViewManager.open(ViewConst.Login_serList);
    }
}