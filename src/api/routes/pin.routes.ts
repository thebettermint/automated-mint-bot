import express, { Router } from 'express';
import controller from '../controller/pin.controller';
import authorize from '../middleware/authorize';

const router: Router = express.Router();

router.get('/ping', authorize.bearer, controller.ping);

module.exports = router;
