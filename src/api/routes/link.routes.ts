import express, { Router } from 'express';
import controller from '../controller/link.controller';
import authorize from '../middleware/authorize';

const router: Router = express.Router();

router.get('/ping', authorize.bearer, controller.ping);
router.get('/get/:hash', authorize.bearer, controller.getOfferId);

module.exports = router;
