/**
 * 游戏场景
 */
class GameScene extends BaseScene {
    /**
     * 构造函数
     */
    public constructor() {
        super();

    }

    /**
     * 进入Scene调用
     */
    public onEnter(): void {
        super.onEnter();

        this.addLayerAt(LayerManager.Game_Main, 0);
        this.addLayer(LayerManager.UI_Main);
        this.addLayer(LayerManager.UI_Popup);
        this.addLayer(LayerManager.UI_Tips);


        App.ViewManager.open(ViewConst.Game);   
        App.ViewManager.open(ViewConst.GameUI); 

        // 播放背景音乐
        App.SoundManager.playBg("shijie_mp3");
    }

    /**
     * 退出Scene调用
     */
    public onExit(): void {
        super.onExit();
    }
}
