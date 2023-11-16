import React from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

import { Field, FieldSet } from '../../components/Field';

import { useAccessKeys } from '../../state/settings';
import { ProductStackParamList } from './types';

export const AccessKeysScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<ProductStackParamList, 'ProductSettings'>) => {
  const [accessKeys, setAccessKeys] = useAccessKeys();

  return (
    <View style={styles.root}>
      <FieldSet>
        <Field
          value={accessKeys[route.params.env] || ''}
          onChange={(value) => setAccessKeys({ ...accessKeys, [route.params.env]: value })}
          onSubmitEditing={() => navigation.goBack()}
        />
      </FieldSet>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 16,
  },
});
