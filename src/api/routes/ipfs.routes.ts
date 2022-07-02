import express, { Router } from 'express';
import controller from '../controller/ipfs.controller';
import authorize from '../middleware/authorize';

const router: Router = express.Router();

router.get('/ping', authorize.bearer, controller.ping);
router.post('/add', authorize.bearer, controller.add);

module.exports = router;
