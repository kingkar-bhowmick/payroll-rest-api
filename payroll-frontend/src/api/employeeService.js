import axiosClient, { extractCollection, extractEntity } from './axiosClient';

const EMPLOYEE_KEY = 'employeeList';

export async function getAllEmployees() {
    const { data } = await axiosClient.get('/employees');
    return extractCollection(data, EMPLOYEE_KEY);
}

export async function getEmployee(id) {
    const { data } = await axiosClient.get(`/employees/${id}`);
    return extractEntity(data);
}

export async function createEmployee(employee) {
    const { data } = await axiosClient.post('/employees', employee);
    return extractEntity(data);
}

export async function updateEmployee(id, employee) {
    const { data } = await axiosClient.put(`/employees/${id}`, employee);
    return extractEntity(data);
}

export async function deleteEmployee(id) {
    await axiosClient.delete(`/employees/${id}`);
}
