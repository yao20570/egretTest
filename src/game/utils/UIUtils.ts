
/**
 * 跟UI有关的通用函数
*/
class UIUtils {
    /**灰度滤镜配置*/
    private static GrayMatrixFilter = new egret.ColorMatrixFilter([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0]);

    /**
     * 构造函数
    */
    constructor() {

    }

    /**
     * 是否对$obj置灰
     * @param $obj 要置灰的对象
     * @param $isGray 是否置灰
    */
    public static setGray($obj: egret.DisplayObject, $isGray: boolean) {
        /**因为只有WebGL支持滤镜，需要完善*/
        UIUtils.setGrayFilter($obj, $isGray);
    }

    /**
     * 是否对$obj设置灰度滤镜(需完善，只有WebGL支持)
     * @param $obj 要设置灰度的对象
     * @param $isGray 是否设置灰度
    */
    private static setGrayFilter($obj: egret.DisplayObject, $isGray: boolean): void {
        if ($isGray) {
            $obj.filters = [UIUtils.GrayMatrixFilter];
        } else {
            $obj.filters = null;
        }
    }
}