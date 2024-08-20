import PartnershipService from "../Service/PartnershipService.js";

class PartnershipController {

  async createMonthlyPartnership(req, res, next) {
    try {
      const data = {
        companyName: req.body.companyName,
        userId: req.user.data.user_id,
      };
      const partnership =
        await PartnershipService.createMonthlyPartnership(data);
      res.status(201).json({ success: true, data: partnership });
    } catch (error) {
        console.log(error);
      next(error);
    }
  }

  async createQuarterlyPartnership(req, res, next) {
    try {
      const data = {
        companyName: req.body.companyName,
        userId: req.user.data.user_id,
      };
      const partnership =
        await PartnershipService.createQuarterlyPartnership(data);
      res.status(201).json({ success: true, partnership });
    } catch (error) {
      next(error);
    }
  }

  async createSemiAnnualPartnership(req, res, next) {
    try {
      const data = {
        companyName: req.body.companyName,
        userId: req.user.data.user_id,
      };
      const partnership =
        await PartnershipService.createSemiAnnualPartnership(data);
      res.status(201).json({ success: true, data: partnership });
    } catch (error) {
      next(error);
    }
  }

  async createAnnualPartnership(req, res, next) {
    try {
      const data = {
        companyName: req.body.companyName,
        userId: req.user.data.user_id,
      };
      const partnership = await PartnershipService.createAnnualPartnership(
        data
      );
      res.status(201).json({ success: true, data: partnership });
    } catch (error) {
      next(error);
    }
  }
}

export default new PartnershipController();
