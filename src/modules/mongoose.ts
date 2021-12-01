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
    const currentNewLink = new Links({
        original: originalLink,
        short: shortLink
    });
    
    if (user_link) {
        user_link.links.push(newUserLink);
    } else {
        user_link = new UserLink({
            login,
            links: [newUserLink]
        });
    }
    await currentNewLink.save();
    await user_link.save();
}

const deleteInMongo = async (login: string, link: string) => {
    const user_link = await UserLink.findOne({login});
    const currentLink = await Links.findOne({short: link});
    if (user_link) {
        user_link.links = user_link.links.filter((link_Mongo: Link_interface) => {
                                return (link_Mongo.original !== link) && (link_Mongo.short !== link);
                            });
        await currentLink.remove();
        await user_link.save();
        return true;
    } else {
        return false;
    }
}

const getLink = async (login: string, short_link: string) => {
    const current_user = await UserLink.findOne({login});

    if (current_user) {
        const current_link = current_user.links.find((link: Link_interface) => link.short === short_link);
        return current_link;
    }
    return false;
}

export {
    createInMongo,
    deleteInMongo,
    getLink
}