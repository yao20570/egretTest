/**
 * 游戏层级类
 */
class LayerManager{
    /**
     * 游戏背景层
     * @type {BaseSpriteLayer}
     */
    public static Game_Bg:BaseSpriteLayer = new BaseSpriteLayer();
    /**
     * 主游戏层(建筑和世界)
     * @type {BaseSpriteLayer}
     */
    public static Game_Main:BaseSpriteLayer = new BaseSpriteLayer();

    /**
     * UI主界面(所有全屏的UI都放到这层上)
     * @type {BaseEuiLayer}
     */
    public static UI_Main:BaseEuiLayer = new BaseEuiLayer();
    /**
     * UI弹出框层(对话框什么的)
     * @type {BaseEuiLayer}
     */
    public static UI_Popup:BaseEuiLayer = new BaseEuiLayer();
    /**
     * UI警告消息层
     * @type {BaseEuiLayer}
     */
    public static UI_Message:BaseEuiLayer = new BaseEuiLayer();
    /**
     * UITips层
     * @type {BaseEuiLayer}
     */
    public static UI_Tips:BaseEuiLayer = new BaseEuiLayer();
}