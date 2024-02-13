import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { MappingScreen } from './MappingScreen';
import { ProductScreen } from './ProductScreen';
import { ProviderScreen } from './ProviderScreen';
import { ProductStackParamList } from './types';

const ProductStack = createNativeStackNavigator<ProductStackParamList>();

export const Product = () => {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen component={ProductScreen} name="Index" options={{ headerShown: false }} />
      <ProductStack.Screen component={MappingScreen} name="Company Mapping ID" />
      <ProductStack.Screen component={ProviderScreen} name="Provider ID" />
    </ProductStack.Navigator>
  );
};
