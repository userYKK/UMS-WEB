/**
 *
 * @author       ykk
 * @version      1.0
 * @date         2017-03-26 02:11
 * @description  日志模块
 * @file
 *
 */
var LogLevelEnum = {
    // the value is method name of goog.debug.Logger
    info: 'info',
    warning: 'warning'
};
Object.freeze(LogLevelEnum);


var assert = window.assert = function(statement, msg) {
    console.assert(statement, msg);
};

// shortcuts
assert.error = function(msg) {
    assert(false, msg);
};

var log = window.log = (function() {
    var loggerByCategory = {};
    var getLogger = function(category) {
        return loggerByCategory[category];
    };

    return function(msg, level, category) {
        // default parameters
        if (!level) {
            level = LogLevelEnum.info;
        }
        if (!category) {
            category = 'hsw.core.Logger';
        }
        getLogger(category)[level](msg);
    };
})();

// shortcuts
log.info = function(msg, category) {
    log(msg, LogLevelEnum.info, category);
};
log.warning = function(msg, category) {
    log(msg, LogLevelEnum.warning, category);
};

// allows to bind category into logger instance
log.logger = function(category) {
    return {
        info: function(msg) {
            return log.info(msg, category);
        },
        warning: function(msg) {
            return log.warning(msg, category);
        },
        error: function(msg) {
            return assert.error(msg);
        }
    };
};