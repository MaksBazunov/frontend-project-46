import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

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