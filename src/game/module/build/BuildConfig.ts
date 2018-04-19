/**
 *  本地建筑初始化配置
 *  @author lxn
 *  @time   2018/4/03
*/

class BuildConfig extends BaseConfig {
    private buildData: any;

    /**建筑全局配置数据*/
    private _buildParam: any;

    public constructor(resources: string[]) {
        super("BuildConfig", resources);
    }


    /**
     * 获取建筑全局配置数据
     * @param $key
    */
    public getBuildParam($key: string) {
        if (this._buildParam) {
            return this._buildParam[$key]
        }
        this._buildParam = {};
        let data: JSON = RES.getRes("build_init_json");
        for (let i in data) {
            let tmp: any = data[i];
            switch (tmp.key) {
                case "collectionCost":
                case "defenceCost":
                    {
                        //1:60:500;2:65:500;3:70:600;4:75:600
                        let data = {}
                        let ary = App.StringUtils.splitMuilt(tmp.value, ";", ":");
                        for (let v of ary) {
                            data[Number(v[1])] = { pos: Number(v[1]), lv: Number(v[2]), cost: Number(v[3]) }
                        }
                        this._buildParam[tmp.key] = data;
                    }
                    break;
                case "collectionFree":
                case "defenceFree":
                    {
                        //1:60; 2:70; 3:75; 4:80
                        let data = {}
                        let ary = App.StringUtils.splitMuilt(tmp.value, ";", ":")
                        for (let v of ary) {
                            data[Number(v[1])] = { pos: Number(v[1]), lv: Number(v[2]) }
                        }
                        this._buildParam[tmp.key] = data;
                    }
                    break;
                default:
                    this._buildParam[tmp.key] = tmp.value;
                    break;
            }
        }
        return this._buildParam[$key]
    }


    public getBuildData(): any {
        if (this.buildData) return this.buildData;
        this.buildData = {};
        // 读取JSON配置
        let data: JSON = RES.getRes("build_building_json");
        if (!data) return this.buildData;
        for (let i in data) {
            let tmp: any = data[i];
            let key = tmp.id + "";
            this.buildData[key] = tmp;
        }
        return this.buildData;
    }



}