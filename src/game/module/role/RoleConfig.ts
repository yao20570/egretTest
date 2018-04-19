class RoleConfig extends BaseConfig{

	/**等级经验配表 */
	private levelData:any;
	/**随机名称配表*/
	private nameData:any;
	/**爵位配表*/
	private banneretData:any;
	/**全局参数表*/
	private tGlobleParam:any;

	public constructor(resources:string[]) {
		super("RoleConfig",resources);
	}

	
	/**
	 * 获取一些全局参数, 比如角色名长度
	 * @param _key
	 */
	public getGlobleParam(_key) {
		if (!this.tGlobleParam) {
			this.tGlobleParam = {}
			let data: JSON = RES.getRes("avatar_init_json");
			for (let i in data) {
				let row = data[i]
				let key = row.key
				this.tGlobleParam[key] = row
			}
		}
		return this.tGlobleParam[_key]
	}

	public getLevelData():any {
		if(this.levelData){
			return this.levelData;
		}		
        this.levelData = {};
        // 读取JSON配置
        let data:JSON = RES.getRes("avatar_lv_up_json");
        if(!data){
           return this.levelData;
        }
        for(let i in data){
            let tmp:any = data[i];
            let key = tmp.level+"";            
            this.levelData[key] = tmp;            
        }
		return this.levelData;
	}

	public getNameData():any {
		if(this.nameData){
			return this.nameData;
		}		
        this.nameData = {"first":[],"last":[]};
        // 读取JSON配置
        let data:JSON = RES.getRes("avatar_name_json");
        if(!data){
           return this.nameData;
        }
        for(let i in data){
            let tmp:any = data[i];
            let f = tmp.first;
			(<Array<string>>this.nameData["first"]).push(f);
            let l = tmp.last;
            (<Array<string>>this.nameData["last"]).push(l);      
        }
		return this.nameData;
	}

	public randomAvatarName():string{
		let nameData:any = this.getNameData();
		
		let fisrtArray:Array<string> = <Array<string>>nameData["first"];
		if(!fisrtArray || 0 == fisrtArray.length){
			Log.trace("读取玩家名称配表出错!");
			return "";
		}
		let firstIdx = Math.floor(Math.random()* fisrtArray.length);
		let lastArray:Array<string> = <Array<string>>nameData["last"];
		if(!lastArray || 0 == lastArray.length){
			Log.trace("读取玩家名称配表出错!");
			return "";
		}
		let lastIdx = Math.floor(Math.random()* lastArray.length);
		return fisrtArray[firstIdx]+lastArray[lastIdx];
	}

	public getBanneretData():any {
		if(this.banneretData){
			return this.banneretData;
		}		
        this.banneretData = {};
        // 读取JSON配置
        let data:JSON = RES.getRes("country_banneret_json");
        if(!data){
           return this.banneretData;
        }
        for(let i in data){
            let tmp:any = data[i];
            let key = tmp.level+"";            
            this.banneretData[key] = tmp;            
        }
		return this.banneretData;
	}	
}