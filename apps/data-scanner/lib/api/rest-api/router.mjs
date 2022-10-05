import { Router } from 'express';
import { access, sessions } from './routes/index.mjs';

const router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/sessions_sync', access.check, sessions.sync);

export default router;
