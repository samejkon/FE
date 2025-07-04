import api from '@/lib/axios';
import type { Service } from "../../stores/model/Service.model";

interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export const getServices = async (params: { page?: number }): Promise<{
  data: Service[];
  meta: Meta;
}> => {
  const response = await api.get('api/admins/services', {
    params: {
      ...params,
      page: params.page
    }
  });

  return {
    data: response.data.data,
    meta: response.data.meta
  };
};

export const getServiceById = async (id: number): Promise<Service> => {
  const response = await api.get(`api/admins/services/${id}`);

  return response.data.data;
};

export const createService = async (service: Partial<Service>) => {
  const response = await api.post('api/admins/services', service);

  return response.data.data;
};

export const updateService = async (id: number, service: Partial<Service>) => {
  const response = await api.put(`api/admins/services/${id}`, service);

  return response.data;
};

export const deleteService = async (id: number): Promise<void> => {
  await api.delete(`/services/${id}`);
};
