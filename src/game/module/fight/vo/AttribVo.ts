module fight {
	export class AttribVo {
		/**属性键 */
		public k: number;
		/**属性值 */
		public v: number;

		public constructor() {
		}
	}

	export enum AttribNames {
		/** 攻击 */
		ATK = 100,
		/** 防御 */
		DEF = 101,
		/** 兵力 */
		TRP = 102,
		/** 命中 */
		HIT = 103,
		/** 闪避 */
		DODGE = 104,
		/** 暴击 */
		CRIT = 105,
		/** 坚韧 */
		TENA = 106,
		/** 强攻 */
		STRATK = 107,
		/** 强防 */
		STRDEF = 108,
		/** 攻城 */
		SIEGE = 109,
		/** 守城 */
		DEFCITY = 110,

		/** 攻击百分比 */
		MUL_ATK = 500,
		/** 防御百分比 */
		MUL_DEF = 501,
		/** 兵力百分比 */
		MUL_TRP = 502,
		/** 强攻百分比 */
		MUL_STRATK = 503,
		/** 强防百分比 */
		MUL_STRDEF = 504,
		/** 攻城百分比 */
		MUL_SIEGE = 505,
		/** 守城百分比 */
		MUL_DEFCITY = 506,

		/** 减少敌方兵力百分比 */
		MUL_WEAKTROOP = 507,
		/** 降低敌方强攻 */
		STRATK_DEC = 508,
		/** 降低敌方强防 */
		STRDEF_DEC = 509
	}
}