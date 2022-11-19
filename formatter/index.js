import stylish from '../formatter/stylish.js'
import plain from '../formatter/plain.js'
import json from '../formatter/json.js'

const renderFormat = (diffKeys,format)=>{
    if(format === 'stylish'){
        return stylish(diffKeys)
    }
    if(format === 'plain'){
        return plain(diffKeys)
    }
    if(format === 'json'){
        return json(diffKeys)
    }
};

export default renderFormat;