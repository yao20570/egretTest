module dragon {
	export class ChapterVo {
		/** 章节id */
		public id: number; 
		/** 星级 */
		public s: number; 
		/** 当前进度 */
		public x: number; 
		/** 总进度 */
		public y: number; 
		/** 特殊关卡入口 */
		public so?: Array<dragon.OutpostVo>
		/** 还没开启的特殊关卡 */
		public co?: number[]
		public constructor() {
		}
	}
}