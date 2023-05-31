import React from 'react';

import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { Field, FieldSet } from '../../components/Field';

import { useProductSettings } from '../../state';

export const ProviderScreen = ({ navigation }: any) => {
  const [settings, setSettings] = useProductSettings();

  const onSuggestPress = () => {
    setSettings({ ...settings, providerId: 'adp' });
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <FieldSet>
        <Field
          value={settings.providerId}
          onChange={(value) => setSettings({ ...settings, providerId: value })}
          onSubmitEditing={() => navigation.goBack()}
        />
        <View style={styles.description}>
          <Text style={styles.text}>
            Use the provider ID to skip selecting a payroll provider. For example, use{' '}
            <TouchableWithoutFeedback onPress={onSuggestPress}>
              <Text style={styles.link}>adp</Text>
            </TouchableWithoutFeedback>
            .
          </Text>
        </View>
      </FieldSet>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 16,
  },
  description: {
    margin: 16,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    color: 'rgba(60, 60, 67, 0.6)',
  },
  link: {
    color: '#2C64E3',
  },
});
