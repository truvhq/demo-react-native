import React, { ReactNode, useState } from 'react';

import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

type AdditionalSettingsProps = {
  children: ReactNode;
};

export const AdditionalSettings = ({ children }: AdditionalSettingsProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setOpened((state) => !state)}>
        <Text style={styles.text}>{opened ? 'Hide additional settings' : 'Show additional settings'}</Text>
      </TouchableWithoutFeedback>
      {opened && <View style={styles.children}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  children: {
    marginTop: 16,
  },
  text: {
    color: '#2C64E3',
    paddingHorizontal: 16,
    fontSize: 17,
    lineHeight: 22,
  },
});
