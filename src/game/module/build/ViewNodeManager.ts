/*
 * @Author: Liuxn 
 * @Date: 2018-04-10 18:22:34 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-11 14:17:26
 */
/**
 *  获取并保存所有name中带有idx的子节点
*/
class ViewNodeManager{
    /** 节点列表 */ 
    private m_NodeList:any;

    public constructor(view:egret.DisplayObjectContainer){
        this.m_NodeList = {};
        this.getAllChildNode(view);
    }
    /**
     * @param  {} view 传入的view视图
     */
    private getAllChildNode(view){
        if(egret.is(view, "egret.DisplayObjectContainer") == false) {  
            console.log("[printf]----->>> view is ERROR");
            return;      
        }  
        var __nodeNum:number = view.numChildren;
        for(let i = 0; i<__nodeNum;i++){
            let __node = view.getChildAt(i);
            let __nodeName:string = __node["name"];

            if(__nodeName.substr(0,3) == "idx"){
                this.m_NodeList[__nodeName] = __node;
            }
            this.getAllChildNode(__node);
        }
    }
    /**
     * @param  {string} name 子节点的name
     */
    public getUINodeByName(name:string){
        return this.m_NodeList[name];
    }

}