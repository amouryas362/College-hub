const logger = ( message ) => {
    if(process.env.NODE_ENV === 'dev'){
        console.log(`logger: ${message}`);
    }else{
        //TODO: add a logging system for prod env
    }
}

module.exports = logger;