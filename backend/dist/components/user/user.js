"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("./userService");
const validate_1 = require("../../middlewares/validate");
const handleErrorAsync_1 = require("../../middlewares/handleErrorAsync");
const authenticate_1 = __importDefault(require("../../middlewares/authenticate"));
const endpoints_1 = __importDefault(require("../../utils/constants/endpoints"));
const httpResponseCodes_1 = __importDefault(require("../../utils/constants/httpResponseCodes"));
const router = express_1.Router();
router.get(endpoints_1.default.user.GET_PROFILE(':username'), validate_1.getProfileValidationRules, validate_1.validate, handleErrorAsync_1.handleErrorAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.username;
    const user = yield userService_1.getProfile(username);
    res.json(user);
})));
router.post(endpoints_1.default.user.SEND_FRIEND_REQUEST(':receiverId'), authenticate_1.default, validate_1.sendFriendRequestValidationRules, validate_1.validate, handleErrorAsync_1.handleErrorAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fRequestSent = yield userService_1.sendFriendRequest(req.userId, req.params.receiverId);
    res.status(httpResponseCodes_1.default.CREATED).json(fRequestSent);
})));
router.get(endpoints_1.default.user.GET_FRIEND_REQUESTS, authenticate_1.default, validate_1.getFriendRequestValidationRules, validate_1.validate, handleErrorAsync_1.handleErrorAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const friendRequests = yield userService_1.getFriendRequests(req.userId);
    res.json(friendRequests);
})));
router.put(endpoints_1.default.user.RESPOND_TO_FRIEND_REQUEST(':senderId'), authenticate_1.default, validate_1.acceptFriendRequestValidationRules, validate_1.validate, handleErrorAsync_1.handleErrorAsync((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accepted = yield userService_1.handleFriendRequest(req.userId, req.params.senderId, req.query.action);
    res.json(accepted);
})));
exports.default = router;
