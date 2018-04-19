/*
 * @Author: Liuxn 
 * @Date: 2018-04-13 10:10:05 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-13 13:59:43
 */
class PalaceConfig extends BaseConfig{

    private civilData:any;

    public constructor(resources: string[]) {
        super("PalaceConfig", resources);
    }
    
    /**
     * 文官配置
     */
    public loadCivilData(){
        if(this.civilData)   return this.civilData;
        this.civilData = {};
        // 读取JSON配置
        let data:JSON = RES.getRes("build_palace_json"); 
        if(!data) {
            console.log("build_palace_json 读取失败");
        }
        for(let i in data){
            let tmp:any = data[i];
            let key = tmp.id + "";
            this.civilData[key] = tmp;
        }
        return this.civilData;
    } 

    public getCivilData(){
        return this.civilData;
    }

}