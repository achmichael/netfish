import instance from "../Config/Prisma.js";

class PartnerRepository {

  async createPartnership(partner) {
    return await instance.getClient().partnership.create({
      data: partner.toObject(),
    });
  }

  async getPartnerById(id) {
    return await instance.getClient().partnership.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async updatePartner(id, partner) {
    return await instance.getClient().partnership.update({
      where: {
        id: parseInt(id),
      },
      data: partner.toObject(),
    });
  }

  async deletePartner(id) {
    return await instance.getClient().partnership.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
}

export default PartnerRepository;
