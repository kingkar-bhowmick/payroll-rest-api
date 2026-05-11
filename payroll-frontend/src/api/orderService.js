import axiosClient, { extractCollection, extractEntity } from './axiosClient';

const ORDER_KEY = 'orderList';

export async function getAllOrders() {
    const { data } = await axiosClient.get('/orders');
    return extractCollection(data, ORDER_KEY);
}

export async function getOrder(id) {
    const { data } = await axiosClient.get(`/orders/${id}`);
    return extractEntity(data);
}

export async function createOrder(order) {
    const { data } = await axiosClient.post('/orders', order);
    return extractEntity(data);
}

export async function cancelOrder(id) {
    const { data } = await axiosClient.delete(`/orders/${id}/cancel`);
    return extractEntity(data);
}

export async function completeOrder(id) {
    const { data } = await axiosClient.put(`/orders/${id}/complete`);
    return extractEntity(data);
}
