import { UserLink, Links } from '../general date/mongoose_scheme';
import { Link_interface } from '../interfaces/Link_interface';

const createInMongo = async (login: string, originalLink: string, shortLink: string) => {
    const newUserLink = {
        original: originalLink,
        short: shortLink,
        statistic: {
            clicks: 0
        }
    };

    let user_link = await UserLink.findOne({login});
    let currentNewLink = await Links.findOne({originalLink});
    
    if (user_link) {
        user_link.links.push(newUserLink);
    } else {
        user_link = new UserLink({
            login,
            links: [newUserLink]
        });
    }

    if (!currentNewLink) {
        currentNewLink = new Links({
            original: originalLink,
            short: shortLink
        });
        await currentNewLink.save();
    }
    await user_link.save();
}

const deleteInMongo = async (login: string, link: string) => {
    const user_link = await UserLink.findOne({login});

    if (user_link) {
        user_link.links = user_link.links.filter((link_Mongo: Link_interface) => {
                                return (link_Mongo.original !== link) && (link_Mongo.short !== link);
                            });
        await user_link.save();
        return true;
    } else {
        return false;
    }
}

export {
    createInMongo,
    deleteInMongo
}