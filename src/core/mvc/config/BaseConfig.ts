/** 
 * Config基类
 */
class BaseConfig {
    private _groupName: string;
    private _resources: string[];
    /**
     * 构造函数
     * @param $controller 所属模块
     */
    public constructor(groupName:string,resources:string[]) {
        this._groupName = groupName;
        this._resources = resources;
        this.dbInit();
    }

    public dbInit(): void{       
        App.ResourceUtils.loadGroups(this._groupName, this._resources, null, null, this);
    }
}
