import mongoose from 'mongoose';

const userScheme = new mongoose.Schema({
    login: String,
    links: [
        {
            original: String,
            short: String,
            statistic: {
                clicks: Number
            }
        }
    ]
});
const UserLink = mongoose.model('User_links', userScheme);


const link_schema = new mongoose.Schema({
    original: String,
    short: String
});

const Links = mongoose.model('Links', link_schema);

export {
    UserLink,
    Links
}