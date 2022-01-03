import React, { VFC } from 'react';

import { Product, products } from '../state/product';
import { Select } from './Select';

export const mapValueToProduct = (value: Product) => {
  if (value === 'directory' || value === 'history') {
    return 'admin';
  }

  return value;
};

export type ProductsSelectProps = {
  value: Product;
  onChange: (value: Product) => void;
};

export const ProductsSelect: VFC<ProductsSelectProps> = ({ value, onChange }) => {
  return (
    <Select
      items={products}
      label="Product type"
      value={value}
      onChange={(value: string) => onChange(value as Product)}
    />
  );
};
