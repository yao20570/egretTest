/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 11:46:30 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 11:55:44
 */
module build {
    /**
     * 募兵府
    */
    export class RecruitingCampRes{
        /** 兵营容量  */
        public cpy:number;
        /** 扩充队列数量 */
        public qn:number;
        /** 募兵加时次数 */
        public rn:number;
        /** 募兵最大时间 （ 分钟） */
        public mm:number;
        /** 招募队列 */
        public recruits:build.RecruitRes;
        /** 募兵类型 1.步兵 2.骑兵 3.弓兵 */
        public tp:number;
        /** 建筑id */
        public id:number;
        /** 建筑等级 */
        public lv:number;
        /** 位置 */
        public loc:number;
    
    }

}