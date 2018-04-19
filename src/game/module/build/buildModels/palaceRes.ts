/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 10:59:41 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 11:41:28
 */
module build {
    /**
     * 王宫建筑
     */
    export class PalaceRes{
        /** 本城人口 */
        public pl:number;
        /** 离线本城人口 */
        public of:number;
        /** 文官ID */
        public cId:number;
        /** 文官buff倒计时 */
        public ft:number;
        /** 离线名城人口 */
        public mp:number;
        /** 离线都城人口 */
        public dp:number;
        /** 名城人口 */
        public gp:number;
        /** 都城人口*/
        public up:number;
        /** 建筑id */
        public id:number;
        /** 建筑等级 */
        public lv:number;
        /** 位置 */
        public loc:number;
    }
}