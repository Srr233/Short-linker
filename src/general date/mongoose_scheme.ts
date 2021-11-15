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

export default UserLink