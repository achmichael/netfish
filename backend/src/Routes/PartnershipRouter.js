import express from 'express';
import PartnershipMiddleware from '../Middleware/PartnershipMiddleware.js';
import PartnershipController from '../Controller/PartnershipController.js';

const partnershipRouter = express.Router();

partnershipRouter.post('/monthly', PartnershipMiddleware.partnershipMiddleware, PartnershipController.createMonthlyPartnership);
partnershipRouter.post('/quarterly', PartnershipMiddleware.partnershipMiddleware, PartnershipController.createQuarterlyPartnership);
partnershipRouter.post('/semi-annual', PartnershipMiddleware.partnershipMiddleware, PartnershipController.createSemiAnnualPartnership);
partnershipRouter.post('/yearly', PartnershipMiddleware.partnershipMiddleware, PartnershipController.createAnnualPartnership);

export default partnershipRouter;