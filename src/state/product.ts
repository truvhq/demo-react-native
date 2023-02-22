import { atom, useRecoilState } from 'recoil';

const widgetState = atom<boolean>({
  key: 'widgetState',
  default: false,
});

export const useWidget = () => {
  return useRecoilState(widgetState);
};

export const productSettingsState = atom<ProductSettings>({
  key: 'productSettings',
  default: {
    productType: 'income',
    mappingId: '',
    providerId: '',
    depositValue: '1',
    depositType: 'amount',
    routingNumber: '123456789',
    accountNumber: '160025987',
    bankName: 'TD Bank',
    accountType: 'checking',
  },
});

export const useProductSettings = () => {
  return useRecoilState(productSettingsState);
};
