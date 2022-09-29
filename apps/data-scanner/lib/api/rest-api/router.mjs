import {Router} from 'express';
import {sessions} from './routes/index.mjs';

const router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/sessions_sync', sessions.sync);

export default router;
