import ResponseError from "../Config/Error.js";
import PreOrder from "../Models/PreOrder.js";
import PreOrderRepository from "../Repository/PreOrderRepository.js";

class PreOrderService {

    constructor(preOrderRepository) {
        this.preOrderRepository = preOrderRepository;
    }

    async createPreOrder(data, userId) {
        this.checkUserId(userId);
        const {
            productId,
            quantity,
            totalPrice,
            deliveryDate
        } = data;

        const preOrder = new PreOrder(
            userId,
            productId,
            quantity,
            totalPrice,
            deliveryDate
        );
        return await this.preOrderRepository.createPreOrder(preOrder);
    }

    checkPreOrderId(preOrderId) {
        if (!preOrderId) {
            throw new ResponseError(400, "Pre Order ID is required");
        }
    }

    checkUserId(userId) {
        if (!userId) {
            throw new ResponseError(400, "User ID is required");
        }
    }

    checkProductId(productId) {
        if (!productId) {
            throw new ResponseError(400, "Product ID is required");
        }
    }

    async updatePreOrder(preOrderId, data, userId) {
        this.checkPreOrderId(preOrderId);
        await this.checkPreOrderExist(preOrderId);
        const {
            productId,
            quantity,
            totalPrice,
            deliveryDate
        } = data;

        const updatedPreOrder = new PreOrder(
            userId,
            productId,
            quantity,
            totalPrice,
            deliveryDate
        );

        return await this.preOrderRepository.updatePreOrder(preOrderId, updatedPreOrder);
    }

    async deletePreOrder(preOrderId) {
        this.checkPreOrderId(preOrderId);
        await this.checkPreOrderExist(preOrderId);
        return await this.preOrderRepository.deletePreOrder(preOrderId);
    }

    async getPreOrdersByUserId(userId) {
        this.checkUserId(userId);
        const preOrders = await this.preOrderRepository.getPreOrdersByUserId(userId);
        return preOrders;
    }

    async getPreOrderById(preOrderId) {
        this.checkPreOrderId(preOrderId);
        return await this.checkPreOrderExist(preOrderId);
    }

    async checkPreOrderExist(preOrderId) {
        this.checkPreOrderId(preOrderId);
        const preOrder = await this.preOrderRepository.getPreOrderById(preOrderId);
        if (!preOrder) {
            throw new ResponseError(404, "Pre Order not found");
        }
        return preOrder;
    }

    async getPreOrdersByProductId(productId) {
        this.checkProductId(productId);
        const preOrders = await this.preOrderRepository.getPreOrdersByProductId(productId);
        return preOrders;
    }
}

export default new PreOrderService(new PreOrderRepository());
