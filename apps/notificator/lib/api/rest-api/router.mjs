import { Router } from 'express';
import { notification } from './routes/index.mjs';

const router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.post('/notification/email', notification.sendEmail);
router.post('/notification/text_message', notification.sendTestMessage);

export default router;
