import { Router } from 'express';
import middlewares from '../middlewares.mjs';
import { sessions, users, contacts, systemHealth, statuses } from './routes/index.mjs';

const router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/users', users.readList);
router.get('/contacts', contacts.readList);
router.get('/system_health', systemHealth.read);
router.get('/statuses', statuses.readList);
router.get('/sessions', sessions.readList);
router.post('/sessions', middlewares.upload.single('file'), sessions.add);
router.delete('/sessions/:sessionId', sessions.del);

export default router;
