import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export type HeaderProps = {
  children: string;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  text: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: '700',
  },
});
