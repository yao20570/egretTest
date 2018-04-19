class HeroConfig extends BaseConfig{

	/**武将配表 */
	private heroData:any;
    private heroExpData:any;//武将经验配表
	public constructor(resources:string[]) {
		super("HeroConfig",resources);
	}

	public getHeroData():any {
		if(this.heroData){
			return this.heroData;
		}		
        this.heroData = {};
        // 读取JSON配置
        let data:JSON = RES.getRes("hero_base_json");
        if(!data){
           return this.heroData;
        }
        for(let i in data){
            let tmp:any = data[i];
            let key = tmp.id;            
            this.heroData[key] = tmp;            
        }
		return this.heroData;
	}
    /** 获取武将经验配置表 */	
	public getHeroExpData():any {
		if(this.heroExpData){
			return this.heroExpData;
		}		
        this.heroExpData = {};
        // 读取JSON配置
        let data:JSON = RES.getRes("hero_base_json");
        if(!data){
           return this.heroExpData;
        }
        for(let i in data){
            let tmp:any = data[i];
            let key = tmp.id;            
            this.heroExpData[key] = tmp;            
        }
		return this.heroExpData;
	}	
}