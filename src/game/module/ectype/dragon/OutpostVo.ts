module dragon {
	export class OutpostVo {
		/** 关卡id */
		public id: number;
		/** 是否通关 0否 1是 */
		public p: number;
		/** 通关星级*/
		public s: number;
		/** 抽到的英雄 */
		public lh: number;
		/** 购买的英雄 */
		public bh: number;
		/** 国器碎片数量 */
		public f: number;
		/** 补给已用次数 */
		public rf: number;
		/** 补给购买次数 */
		public rb: number;
		/** 补给入口消失CD */
		public cd: number;
		/** 购买的装备图纸数量 */
		public wd: number;
		/** 资源田图纸碎片数量 */
		public rd: number

		public constructor() {
		}
	}
}