/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 14:03:26 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 14:07:03
 */
module build{
    /**
     * 仓库
    */
    export class StoreHouseRes{
        /** 目前木保护容量 */
        public woodPro:number;
        /** 目前粮食保护容量 */
        public foodPro:number;
        /** 目前铜保护容量 */
        public coinPro:number;
        /** 建筑id */
        public id:number;
        /** 建筑等级 */
        public lv:number;
        /** 位置 */
        public loc:number;
    }

}