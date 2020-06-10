import { createServer } from './library/appServer';
import { PORT } from './consts';

createServer(PORT).init();
