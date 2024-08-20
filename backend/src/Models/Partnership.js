class Partnership {
    
    constructor(companyName, userId, startDate = new Date(), endDate){
        this.companyName = companyName;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    toObject () {
        return {
            companyName: this.companyName,
            userId: this.userId,
            startDate: this.startDate,
            endDate: this.endDate
        }
    }
}

export default Partnership;
