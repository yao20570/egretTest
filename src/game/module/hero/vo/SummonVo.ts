module hero {
	export class SummonVo {
		/**良将推演次数 */
		public fc:number
		/**神将推演次数 */
		public gc:number
		/**免费良将推演CD */
		public fcd:number
		/**神将推演是否免费 0否1是 */
		public gf:number
		/**神将推演开启进度 */
		public prg:number
		/**神将推演是否开启 0否1是 */
		public gop:number
		/**神将推演关闭时间 */
		public gcd:number
		
		public constructor() {
		}
	}
}