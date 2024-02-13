import React from 'react';

import {StyleSheet, View} from 'react-native';

import {Field, FieldSet} from '../../components/Field';

import {useClientId} from '../../state';

export const ClientIdScreen = ({navigation}: any) => {
  const [clientId, setClientId] = useClientId();

  return (
    <View style={styles.root}>
      <FieldSet>
        <Field
          value={clientId}
          onChange={value => setClientId(value)}
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
