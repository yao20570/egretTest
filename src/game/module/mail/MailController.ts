/**
 * 邮件模块
 */
class MailController extends BaseController {

    private mailView:MailView;
    public constructor() {
        super();

        this.mailView = new MailView(this, LayerManager.UI_Popup);
        App.ViewManager.register(ViewConst.Mail, this.mailView);
    }
}