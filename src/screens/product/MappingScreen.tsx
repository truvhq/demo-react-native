import React from 'react';

import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { Field, FieldSet } from '../../components/Field';

import { useProductSettings } from '../../state';

export const MappingScreen = ({ navigation }: any) => {
  const [settings, setSettings] = useProductSettings();

  const onSuggestPress = (suggest: string) => {
    setSettings({ ...settings, mappingId: suggest });
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      <FieldSet>
        <Field
          value={settings.mappingId}
          onChange={(value) => setSettings({ ...settings, mappingId: value })}
          onSubmitEditing={() => navigation.goBack()}
        />
      </FieldSet>
      <View style={styles.description}>
        <Text style={styles.text}>
          Use the company mapping ID to skip the employer search step. For example, use IDs below:
        </Text>
        <Text style={styles.text}>Facebook</Text>
        <TouchableWithoutFeedback onPress={() => onSuggestPress('539aad839b51435aa8e525fed95f1688')}>
          <Text style={styles.link}>539aad839b51435aa8e525fed95f1688</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.text}>Kroger</Text>
        <TouchableWithoutFeedback onPress={() => onSuggestPress('3f45aed287064cbc91d28eff0424a72a')}>
          <Text style={styles.link}>3f45aed287064cbc91d28eff0424a72a</Text>
        </TouchableWithoutFeedback>
        <Text style={styles.text}>Fannie Mae</Text>
        <TouchableWithoutFeedback onPress={() => onSuggestPress('4af9336b89294bc98879b1e38e6c72df')}>
          <Text style={styles.link}>4af9336b89294bc98879b1e38e6c72df</Text>
        </TouchableWithoutFeedback>
      </View>
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
    marginTop: 8,
  },
  link: {
    color: '#2C64E3',
  },
});
