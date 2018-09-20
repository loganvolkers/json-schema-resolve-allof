var _ = require('lodash');

module.exports = function resolveAllOf(inputSpec){
    var out; 
    
    if(inputSpec && typeof inputSpec === 'object'){
        if(inputSpec.allOf){
            var allOf = inputSpec.allOf;
            delete inputSpec.allOf;
            var nested = _.mergeWith({}, ...allOf, customizer);
            out = _.defaultsDeep(inputSpec, nested, customizer);
            if (out.allOf) {
                out = resolveAllOf(out)
            }
        }else{
            out = inputSpec;
        }
        Object.keys(out).forEach((key, context) => {
            out[key] = resolveAllOf(out[key]);
        });
    }else{
        out = inputSpec;
    }
    return inputSpec;
};

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return _.union(objValue, srcValue);
  }
}
