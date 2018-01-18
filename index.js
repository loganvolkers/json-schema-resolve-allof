"use strict";
exports.__esModule = true;
var _ = require("lodash");
module.exports = function resolveAllOf(inputSpec) {
    if (inputSpec && typeof inputSpec === 'object') {
        if (Object.keys(inputSpec).length > 0) {
            if (inputSpec.allOf) {
                var allOf = inputSpec.allOf;
                delete inputSpec.allOf;
                var nested = _.mergeWith.apply(_, [{}].concat(allOf, [customizer]));
                inputSpec = _.defaults(inputSpec, nested, customizer);
            }
            Object.keys(inputSpec).forEach(function (key) {
                inputSpec[key] = resolveAllOf(inputSpec[key]);
            });
        }
    }
    return inputSpec;
};
function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return _.union(objValue, srcValue);
    }
    return;
}
//# sourceMappingURL=index.js.map