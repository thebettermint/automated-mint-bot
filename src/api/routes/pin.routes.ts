import express, { Router } from 'express';
import controller from '../controller/pin.controller';

const router: Router = express.Router();

router.get('/ping', controller.ping);

module.exports = router;
