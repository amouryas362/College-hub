const DUMMY_POSTS = [
    {
        id: 1,
        title: "This is a post",
        body: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae quam molestiae adipisci, dolore tempora impedit? Vel, culpa ea reprehenderit magnam nobis quam quisquam dolor voluptatibus alias, qui laudantium animi molestias!",
        likes: 13,
        dislikes: 0
    }
]

const generateFeed = async (req, res) => {
    //fetch the feed from the database
    //return the posts in the form of json object
    try {
        return res.status(200).json({message: "success", DUMMY_POSTS});
        
    } catch (error) {
        return res.status(404).json({message: "something went wrong"});
    }
};



module.exports = {
    generateFeed
}