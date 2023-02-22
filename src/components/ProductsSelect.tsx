import React, { VFC } from 'react';

import { Product, products } from '../api/truv';
import { Select } from './Select';

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
