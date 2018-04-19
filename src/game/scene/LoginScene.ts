// TypeScript file
class LoginScene extends BaseScene {

    /**
     * 登陆场景
     */
    public constructor() {
        super();
    }

    /**
     * 进入Scene调用
     */
    public onEnter(): void {
        super.onEnter();
        //添加该Scene使用的层级
        this.addLayerAt(LayerManager.UI_Main, 0);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Tips);

        //播放背景音乐
        App.SoundManager.playBg("shijie_mp3");
        //打开Login页面
        App.ViewManager.open(ViewConst.Login);
        App.ViewManager.open(ViewConst.Login_frame);
    }

    /**
     * 退出Scene调用
     */
    public onExit(): void {
        super.onExit();
    }
}