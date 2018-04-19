/*
 * @Author: Liuxn 
 * @Date: 2018-04-04 11:19:05 
 * @Last Modified by: Liuxn
 * @Last Modified time: 2018-04-04 11:41:14
 */
module build {
    /**
     * CampRes 兵营建筑
     */
    export  class CampRes{
            /** 兵营容量 */
            public cpy:number;
            /** 扩充队列数量 */
            public qn:number;
            /** 募兵加时次数 */
            public rn:number;
            /** 募兵最大时间 （ 分钟） */
            public mm:number;
            /** 招募队列*/
            public recruits:Array<build.RecruitRes>;
            /** 建筑id */
            public id:number;
            /** 建筑等级 */
            public lv:number;
            /** 位置 */
            public loc:number;
            }
}

module build{
    /**
     * RecruitRes 兵营招募
    */
    export class RecruitRes{
       /** 队列Id */
       public proId:String;
       /** 生产数量 */
       public num:number;
       /** 生产需要的时间(秒) */
       public sd:number;
       /** 招募倒计时 */
       public cd:number;
       /** 类型 1.正在招募 2.等待招募 3.完成招募 */
       public tp:number;
       /** 免费加速标志 1:可加速 0:不可加速 */
       public sp:number;
    }
}