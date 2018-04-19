class HeroModel extends BaseModel {	
    /**所有武将数据 */
    public hs:Array<hero.HeroVo>;
    /**免费培养数据 */
	public fe:hero.FreeTrainVo;
    /**武将能上阵战斗的数量 */
    public bat:number;
    /**是否自动补兵 0否 1是 */
    public auto:number;
    /**推演数据 */
    public sm:hero.SummonVo;
    /**玩家自选的扫荡队列记录 */
    public oq:Array<hero.HeroVo>;
    
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor($controller: BaseController) {
        super($controller);
    }

	public initData(obj: any) {
		let heroInfo:any = obj.body;
        this.hs = heroInfo.hs;
        this.fe = heroInfo.fe;
        this.bat = heroInfo.bat;
        this.auto = heroInfo.auto;
        this.sm = heroInfo.sm;
        this.oq = heroInfo.oq;
	}    
}
