import stylish from '../formatter/stylish.js'
import plain from '../formatter/plain.js'


const renderFormat = (diffKeys,format)=>{
    if(format === 'stylish'){
        return stylish(diffKeys)
    }
    if(format === 'plain'){
        return plain(diffKeys)
    }
};

export default renderFormat;