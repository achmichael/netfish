class Cart {
    constructor (userId, productName ,productId, quantity, price, image) {
        this.userId = userId;
        this.productName = productName;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.image = image;
    }

    toObject () {
        return {
            userId: this.userId,
            productName: this.productName,
            productId: this.productId,
            quantity: this.quantity,
            price: this.price,
            image: this.image
        }
    }
}

export default Cart;