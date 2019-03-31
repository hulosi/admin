/**
 * 系统配置,用于对当前运行环境一些设置
 * 如重置样式,垫片加载,全局变量设置
 */

// 页面重置样式
import 'asset@/reset.scss';
import '@candy/ui/asset/utils.scss';

window.$cd = window.$cd || {};

export default {
  after({ vue }) {
    window.$cd.$loading = vue.$loading;
    window.$cd.$msgbox = vue.$msgbox;
    window.$cd.$alert = vue.$alert;
    window.$cd.$confirm = vue.$confirm;
    window.$cd.$prompt = vue.$prompt;
    window.$cd.$notify = vue.$notify;
    window.$cd.$message = vue.$message;
  },
};
