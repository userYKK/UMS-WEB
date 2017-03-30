/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-30 19:01
 * @description  断言类
 * @file
 *
 */
(function(){
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
     *  @param msg
     */
    assert.prototype.error = function(msg){
        this.show(false, msg);
    };

    /**
     *  初始化
     * @param fobj  全局参数控制的变量
     */
    var init = function(fobj){
        var temp = fobj.assert = new assert(); // assert实例存放在全局中
    };

    return init;
})()(base);

