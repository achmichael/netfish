class Product {
    
    constructor(name, description, price, image = null ,weight, catchDate = null, isProcessed = false, processType = null, stock){
        this.name = name;
        this.description = description;
        this.price = price;
        this.weight = weight;
        this.image = image;
        this.catchDate = new Date(catchDate);
        this.isProcessed = isProcessed;
        this.processType = isProcessed ? processType : null; // processType hanya valid jika isProcessed adalah true
        this.stock = stock;
    }

    toObject () {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            weight: this.weight,
            image: this.image,
            catchDate: this.catchDate,
            isProcessed: this.isProcessed,
            processType: this.processType,
            stock: this.stock
        }
    }
}

export default Product;

