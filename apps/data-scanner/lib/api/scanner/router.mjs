import { Router } from 'express';
import { sessions } from './routs/index.mjs';

export let router = Router();

router.get('/', (req, res) => res.send('Hello'));
router.get('/sessions_update', sessions.update);
