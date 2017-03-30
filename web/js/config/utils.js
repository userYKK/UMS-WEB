/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-26 16:58
 * @description  额外的方法类
 * @file
 *
 */

/**
 *  获取实例的名称
 * @returns {string}
 */
Object.prototype.getClassName = function() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = Object.prototype.toString.call(this).match(/\[object (.*?)\]/)[1]
    //var results = (funcNameRegex).exec((this).constructor.toString());
    //console.info(this);
    //console.info(this.constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};