/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-29 20:52
 * @description  新的日志模块
 * @file
 *
 */

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
 *  初始化
 * @param fobj  全局参数控制的变量
 */
log.prototype.init = function(fobj){
    this.assert = fobj.assert;
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

log.prototype.info = function (msg, category) {
    this.show(msg,this.logLevelEnum.info,category);
};

log.prototype.warning = function (msg, category) {
    this.show(msg,this.logLevelEnum.warning,category);
};


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
 *  断言类
 */
var assert = function(){
};

/**
 *  显示断言信息
 * @param statement 是成功还是失败 true & false
 * @param msg
 */
assert.prototype.show = function(statement, msg){
    console.assert(statement, msg);
};

/**
 *  快捷方法 -- 显示错误信息
 * @param msg
 */
assert.prototype.error = function(msg){
    this.show(false, msg);
};


