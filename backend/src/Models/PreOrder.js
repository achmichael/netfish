class PreOrder {
    constructor(userId, productId, quantity, totalPrice, deliveryDate){
        this.userId = userId;
        this.productId = productId;
        this.quantity = quantity;
        this.totalPrice = totalPrice;
        this.deliveryDate = deliveryDate;
    }

    toObject () {
        return {
            userId: this.userId,
            productId: this.productId,
            quantity: this.quantity,
            totalPrice: this.totalPrice,
            deliveryDate: new Date(this.deliveryDate) // menggunakan objek new Date agar prisma yang mengonversi date tersebut sesuai dengan kebutuhannya
        }
    }
}

export default PreOrder;
