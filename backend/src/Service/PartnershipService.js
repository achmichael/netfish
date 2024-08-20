import Partnership from "../Models/Partnership.js";
import PartnerRepository from "../Repository/PartnerRepository.js";

class PartnershipService {

    constructor (partnershipRepository) {
        this.partnershipRepository = partnershipRepository;
    }

    calculateMembership (startDate, durationInMonths) {
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + durationInMonths);
        return endDate;
    }

    // Membership 1 bulan
    async createMonthlyPartnership (data) {
        const { companyName, userId } = data;
        const startDate = new Date();
        const endDate = this.calculateMembership(startDate, 1);
        const newPartnership = new Partnership(companyName, userId, startDate, endDate);
        return await this.partnershipRepository.createPartnership(newPartnership);
    }

    // Membership 3 bulan
    async createQuarterPartnership (data) {
        const { companyName, userId } = data;
        const startDate = new Date();
        const endDate = this.calculateMembership(startDate, 3);
        
        const newPartnership = new Partnership(companyName, userId, startDate, endDate);
        return await this.partnershipRepository.createPartnership(newPartnership);
    }

    // Membership 6 bulan
    async createSemiAnnualPartnership (data) {
        const { companyName, userId } = data;
        const startDate = new Date();
        const endDate = this.calculateMembership(startDate, 6);

        const newPartnership = new Partnership(companyName, userId, startDate, endDate);
        return await this.partnershipRepository.createPartnership(newPartnership);
    }   

    // Membership 12 bulan (1 tahun)
    async createYearlyParnership (data) {
        const { companyName, userId } = data;
        const startDate = new Date();
        const endDate = this.calculateMembership(startDate, 12);

        const newPartnership = new Partnership(companyName, userId, startDate, endDate);
        return await this.partnershipRepository.createPartnership(newPartnership);
    }
}

export default new PartnershipService(new PartnerRepository());