import React from 'react';

import RNPickerSelect from 'react-native-picker-select';

import { FieldView } from './Field';

export type SelectProps = {
  label: string;
  onChange: (value: string) => void;
  items: Record<string, string>;
  value: string;
};

export const Select = ({ items, value, label, onChange }: SelectProps) => {
  return (
    <RNPickerSelect
      itemKey="value"
      items={Object.keys(items).map((key: string) => ({ value: key, label: items[key] }))}
      value={value}
      onValueChange={onChange}
    >
      <FieldView label={label} value={items[value]} />
    </RNPickerSelect>
  );
};
