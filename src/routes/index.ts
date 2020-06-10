import user from './user/user';
import auth from './auth/auth';
import { ROUTE_PREFIX } from '../consts';

const routes = [
    {
        prefix: ROUTE_PREFIX.AUTH,
        route: auth,
    },
    {
        prefix: ROUTE_PREFIX.USER,
        route: user,
    },
];

export default routes;
