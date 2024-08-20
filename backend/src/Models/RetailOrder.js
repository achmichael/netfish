class RetailOrder {

    constructor(userId, productId, quantity, totalPrice){
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.orderDate = new Date();
    }

    toObject () {
        return {
            userId: this.userId,
            productId: this.productId,
            quantity: this.quantity,
            totalPrice: this.totalPrice,
            orderDate: this.orderDate
        }
    }
}

export default RetailOrder;