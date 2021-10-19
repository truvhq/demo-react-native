import React, { ReactNode } from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
};

export const Button = ({ children, onPress, disabled }: ButtonProps) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={{ ...styles.root, ...(disabled ? styles.disabled : {}) }}>
        <Text style={styles.title}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#0DAB4C',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    margin: 16,
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.3,
  },
});
