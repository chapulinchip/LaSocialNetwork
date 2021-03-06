import {Router} from "express";
import {getFriendRequests, getProfile, handleFriendRequest, sendFriendRequest} from "./userService";
import {
    acceptFriendRequestValidationRules,
    getFriendRequestValidationRules,
    getProfileValidationRules,
    sendFriendRequestValidationRules, validate
} from "../../middlewares/validate";
import {handleErrorAsync} from "../../middlewares/handleErrorAsync";
import authenticate from "../../middlewares/authenticate";
import endpoints from "../../utils/constants/endpoints";
import httpCodes from "../../utils/constants/httpResponseCodes";

const router = Router();

router.get(endpoints.user.GET_PROFILE(':username'), getProfileValidationRules, validate, handleErrorAsync(async (req, res) => {
    const username = req.params.username;
    const user = await getProfile(username);
    res.json(user);
}));

router.post(endpoints.user.SEND_FRIEND_REQUEST(':receiverId'), authenticate, sendFriendRequestValidationRules, validate, handleErrorAsync(async (req, res) => {
    const fRequestSent = await sendFriendRequest(req.userId, req.params.receiverId);
    res.status(httpCodes.CREATED).json(fRequestSent);
}));

router.get(endpoints.user.GET_FRIEND_REQUESTS, authenticate, getFriendRequestValidationRules, validate, handleErrorAsync(async (req, res) => {
    const friendRequests = await getFriendRequests(req.userId);
    res.json(friendRequests);
}));

router.put(endpoints.user.RESPOND_TO_FRIEND_REQUEST(':senderId'), authenticate, acceptFriendRequestValidationRules, validate, handleErrorAsync(async (req, res) => {
    const accepted = await handleFriendRequest(req.userId, req.params.senderId, req.query.action);
    res.json(accepted);
}));

export default router;