import express from 'express';
import { getUsers } from '../../controllers/user/userController';
import { authorize } from '../../middlewares/authorization-mdlwr';

const router = express.Router();

router.get('/', authorize, (...rest) => getUsers(...rest));

export default router;
