import express, { Router } from 'express';
import controller from '../controller/apex.controller';
import authorize from '../middleware/authorize';

const router: Router = express.Router();

router.get('/ping', authorize.bearer, controller.ping);
router.get('/find/uuid/:uuid', authorize.bearer, controller.getByUUID);
router.get('/find/address/:address', authorize.bearer, controller.getByAddress);
router.get('/consumed/:uuid', authorize.bearer, controller.consumed);
router.get('/claimed/:uuid', authorize.bearer, controller.claimed);
router.post('/mint/ondemand', authorize.bearer, controller.ondemand);

module.exports = router;
