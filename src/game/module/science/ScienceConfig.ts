class ScienceConfig extends BaseConfig{

    private scienceBaseParam:any;
    private scienceLvParam:any;

    public constructor(resources: string[]){
        super("ScienceConfig",resources);
    }
    /**
      *  科技基础参数
      */
    public getScienceBaseParam(){
        if(this.scienceBaseParam)  return this.scienceBaseParam;
        this.scienceBaseParam = {};
        let data:JSON = RES.getRes("scicence_base_json");
        if(!data)
            console.log("scicence_base_json 读取失败");   
        for(let i in data){
            let tmp:any = data[i];
            let key = tmp.id;
            this.scienceBaseParam[key] = tmp;
        }
        return this.scienceBaseParam;
    }

    
     /**
      *  科技等级参数
      */
     public getScienceLvParam(){
         if(this.scienceLvParam) return this.scienceLvParam;
         this.scienceLvParam = {};
         let data:JSON = RES.getRes("science_lv_up_json");
         if(!data)
            console.log("science_lv_up_json 读取失败");

        for(let i in data){
            let tmp:any = data[i];
            let key = tmp.id;
            this.scienceLvParam[key] = tmp;
        }
        return this.scienceLvParam;
     }

}

