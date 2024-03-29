import {atom, useAtom} from 'jotai';
import {ProductSettings} from '../api/truv';

const widgetState = atom<boolean>(false);

export const useWidget = () => {
  return useAtom(widgetState);
};

export const productSettingsState = atom<ProductSettings>({
  productType: 'income',
  mappingId: '',
  providerId: '',
  depositValue: '1',
  depositType: 'amount',
  routingNumber: '123456789',
  accountNumber: '160025987',
  bankName: 'TD Bank',
  accountType: 'checking',
  bankAddress: '123 Main St',
});

export const useProductSettings = () => {
  return useAtom(productSettingsState);
};
