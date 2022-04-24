import { Router } from 'express';
import { sessions } from './routes/index.mjs';

const router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/sessions_update', sessions.update);

export default router;
