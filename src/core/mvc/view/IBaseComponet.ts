/**
 * View基类接口
 */
interface IBaseComponent {

    /**
     * 组件开启函数，用于子类继承
     */
    open():void;

    /**
     * 组件关闭函数，用于子类继承
     */
    close():void;

    
}