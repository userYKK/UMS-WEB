/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-29 20:52
 * @description  新的日志模块
 * @file
 *
 */
(function(){
    /**
     *  日志类
     */
    var log = function () {
        // 日志的级别
        this.logLevelEnum = {
            'info':'info',
            'warning': 'warning'
        };
        this.assert = undefined; // 会使用到断言，需要将全局的断言对象传递进来
    };

    /**
     * 显示/存储日志等信息 --- 这个写法是暂时的
     * @param msg 信息
     * @param level  日志级别
     * @param category 类目-- 暂时没限定使用方式
     * @returns {Function}
     */
    log.prototype.show = function (msg, level, category) {
        var loggerByCategory = {};
        var getLogger = function(category) {
            return loggerByCategory[category];
        };

        // 需要控制 显示什么级别的日志，并且控制是否显示日志
        return function(msg, level, category) {
            // default parameters
            if (!level) {
                level = LogLevelEnum.info;
            }
            if (!category) {
                category = 'hsw.core.Logger';
            }
            if(base.app.logger){
                getLogger(category)[level](msg);
            }
        };
    };

    /**
     * 显示 info 级别的日志
     * @param msg
     * @param category
     */
    log.prototype.info = function (msg, category) {
        this.show(msg,this.logLevelEnum.info,category);
    };

    /**
     * 显示 warning 级别的日志
     * @param msg
     * @param category
     */
    log.prototype.warning = function (msg, category) {
        this.show(msg,this.logLevelEnum.warning,category);
    };


    /**
     * 显示所有级别的日志
     * @param msg
     * @param category
     * @returns {{info: Function, warning: Function, error: Function}}
     */
    log.prototype.logger = function (msg, category) {
        return {
            info: function(msg) {
                return this.info(msg, category);
            },
            warning: function(msg) {
                return this.warning(msg, category);
            },
            error: function(msg) {
                return this.assert.error(msg);
            }
        };
    };

    /**
     *  全局错误信息监听
     * @returns {boolean}
     */
    log.prototype.listener = function(){
        //错误参数有  errorMessage, scriptURI, lineNumber,columnNumber,errorObj
        console.log(arguments);
        // 控制信息不显示
        return true;
    };

    /**
     *  初始化
     * @param fobj  全局参数控制的变量
     */
    var init = function(fobj){
        var temp = fobj.log = new log(); // appPromise实例存放在全局中
        temp.assert = fobj.assert;

        //绑定全局错误事件
        window.onerror = temp.listener;
    };

    return init;
})()(base);
