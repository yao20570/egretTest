class EctypeConfig extends BaseConfig {  
    private outpostsData: any; //章节数据配表
    private outpostsOneData: any;//章节每个数据配表
    private foePowerData: any;//副本敌方战力配置表
    private monsterData: any;//各个怪物配置
    private goodsData: any;//物品配置
    public constructor(resources:string[]) {
		super("EctypeConfig",resources);
	}
    /** 获取章节数据配表 */
    public getOutpostsOneData(): any {
        if (this.outpostsOneData) {
            return this.outpostsOneData;
        }
        this.outpostsOneData = {};
        // 读取JSON配置
        let data: JSON = RES.getRes("dragon_outposts_json");
        if (!data) {
            return this.outpostsOneData;
        }
        for (let i in data) {
            let tmp: any = data[i];
            let arrayData = [];
            let key = tmp.chapterid + "";
            if (this.outpostsOneData[key]) {
                this.outpostsOneData[key].push(tmp);
            } else {
                arrayData.push(tmp);
                this.outpostsOneData[key] = arrayData;
            }
        }
        return this.outpostsOneData;
    }
    /** 获取章节每个数据配表 */
    public getOutpostsData(): any {
        if (this.outpostsData) {
            return this.outpostsData;
        }
        this.outpostsData = {};
        // 读取JSON配置
        let data: JSON = RES.getRes("dragon_outposts_json");
        if (!data) {
            return this.outpostsData;
        }
        for (let i in data) {
            let tmp: any = data[i];
            let key = tmp.id + "";
            this.outpostsData[key] = tmp;
        }
        return this.outpostsData;
    }
    /** 获取副本敌方战力配置表 */
    public getfoePowerData(): any {
        if (this.foePowerData) {
            return this.foePowerData;
        }
        this.foePowerData = {};
        // 读取JSON配置
        let data: JSON = RES.getRes("npc_group_json");
        if (!data) {
            return this.outpostsData;
        }
        for (let i in data) {
            let tmp: any = data[i];
            let key = tmp.id + "";
            this.foePowerData[key] = tmp;
        }
        return this.foePowerData;
    }
    /** 获取各个怪物配置 */
    public getMonsterData(): any {
        if (this.monsterData) {
            return this.monsterData;
        }
        this.monsterData = {};
        // 读取JSON配置
        let data: JSON = RES.getRes("npc_monster_json");
        if (!data) {
            return this.monsterData;
        }
        for (let i in data) {
            let tmp: any = data[i];
            let key = tmp.id + "";
            this.monsterData[key] = tmp;
        }
        return this.monsterData;
    }
    /** 获取物品配置 */
    public getGoodsData(): any {
        if (this.goodsData) {
            return this.goodsData;
        }
        this.goodsData = {};
        // 读取JSON配置
        let data: JSON = RES.getRes("item_resource_json");
        if (!data) {
            return this.goodsData;
        }
        for (let i in data) {
            let tmp: any = data[i];
            let key = tmp.id + "";
            this.goodsData[key] = tmp;
        }
        return this.goodsData;
    }
}