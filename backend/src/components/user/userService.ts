import {models} from "../../database/database";
import {UserNotFoundError} from "../../utils/errors/UserNotFoundError";
import userRelationship from "../../utils/constants/userRelationship";
const {Profile, UserRelationShip} = models;

export async function getProfile(username) {
    const user = await Profile.findOne({where: {username}});
    if (!user) throw new UserNotFoundError();
    return user;
}

export async function sendFriendRequest(senderId, receiverId) {
    const fRequest = await UserRelationShip.create({senderId, receiverId, type: userRelationship.PENDING});
    return fRequest !== null;
}

export async function getFriendRequests(userId) {
    return UserRelationShip.findAll({where: {receiverId: userId, type: userRelationship.PENDING}});
}

export async function handleFriendRequest(receiverId, senderId, action) {
    if (action === 'confirm') {
        return await UserRelationShip.update({type: userRelationship.FRIEND}, {where: {receiverId, senderId}});
    }
    return UserRelationShip.destroy({where: {receiverId, senderId}});
}