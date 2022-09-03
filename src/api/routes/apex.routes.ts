import express, { Router } from 'express';
import controller from '../controller/apex.controller';
import authorize from '../middleware/authorize';

const router: Router = express.Router();

router.get('/ping', authorize.bearer, controller.ping);
router.get('/find/uuid/:uuid', authorize.bearer, controller.getOfferId);
router.get('/find/address/:address', authorize.bearer, controller.getOfferId);
router.post('/mint/ondemand', authorize.bearer, controller.ondemand);

module.exports = router;
