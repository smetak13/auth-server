import express from 'express';
import { API_ROUTE } from '../../consts';
import { signUp, login, getAccessToken, ping } from '../../controllers/auth/authController';
import { authorize } from '../../middlewares/authorization-mdlwr';

const router = express.Router();

router.post(API_ROUTE.AUTH.SIGNUP, (...rest) => signUp(...rest));

router.post(API_ROUTE.AUTH.LOGIN, (...rest) => login(...rest));

router.post(API_ROUTE.AUTH.TOKEN, (...rest) => getAccessToken(...rest));

router.post(API_ROUTE.AUTH.PING, authorize, (...rest) => ping(...rest));

export default router;
