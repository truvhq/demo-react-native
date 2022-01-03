import { atom, useRecoilState } from 'recoil';

const widgetState = atom<boolean>({
  key: 'widgetState',
  default: false,
});

export const useWidget = () => {
  return useRecoilState(widgetState);
};

export const products = {
  employment: 'Employment history',
  income: 'Income and employment',
  deposit_switch: 'Direct deposit switch',
  pll: 'Paycheck Linked Loan',
  directory: 'Employee directory',
  history: 'Payroll history',
} as const;

export type Product = keyof typeof products;

type ProductSettings = {
  mappingId: string;
  providerId: string;
  depositValue: string;
  depositType: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
  accountType: 'checking';
};

const productSettingsState = atom<ProductSettings>({
  key: 'employment',
  default: {
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
