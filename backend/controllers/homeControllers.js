const db = require('../model/db');

const generateFeed = async (req, res) => {
    //fetch the feed from the database
    //get the username from the req object
    const accountId = req.accountId;
    
    /*
        user ne groups join kar rakhe honge hume un groups ke posts chahiye
        jo post honge wo time ke hisab se sort honge ie latest post upar aayegi

        1. fetch all the groups the user is a part of
        2. fetch all the posts from those groups
        3. sort the posts by time
        4. return the posts
        
        the sql code for is written in bard chat have a look at that
        TODO: fetch the posts from all the groups that have occoured for the past 24 hours and sort
              them by time(latest to oldest) and limit the results to 50 rows only;
    */
    

    try {
        //fetch all the groups the user is a part of
        let result = await db.query('SELECT group_name FROM membership WHERE account_id = $1', [accountId]);
        
        if(result.rows.length === 0){
            return res.status(200).json({message: "No groups joined yet, do user onboarding"});
        }

        

        return res.status(200).json({});
        
    } catch (error) {
        return res.status(404).json({message: "something went wrong"});
    }
};



module.exports = {
    generateFeed
}