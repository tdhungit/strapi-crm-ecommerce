import ApiService from '@/service/ApiService';

export interface WarehouseType {
  id: number;
  documentId: string;
  name: string;
  location: string;
}

export interface GlobalSettingType {
  title?: string;
  slogan?: string;
  description?: string;
  favicon?: any;
  logo?: string;
  footer?: string;
  warehouses?: WarehouseType[];
  socials?: {
    id: number;
    title: string;
    href: string;
    icon: string;
    target: string;
  }[];
}

export async function getGlobalSettings(): Promise<GlobalSettingType> {
  const [resSetting, resWarehouse] = await Promise.all([
    ApiService.request('GET', '/global-setting', {
      populate: '*',
    }),
    ApiService.request('GET', '/warehouses'),
  ]);

  return {
    ...resSetting.data,
    warehouses: resWarehouse.data,
  };
}
