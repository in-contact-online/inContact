import { Router } from 'express';
import middlewares from '../middlewares.mjs';
import { sessions, users, contacts, systemHealth, statuses, access } from './controllers/index.mjs';

const router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/users', access.check, users.readList);
router.get('/contacts', access.check, contacts.readList);
router.get('/system_health', access.check, systemHealth.read);
router.get('/statuses', access.check, statuses.readList);
router.get('/sessions', access.check, sessions.readList);
router.post('/sessions', access.check, middlewares.upload.single('file'), sessions.add);
router.delete('/sessions/:sessionId', access.check, sessions.del);

export default router;
