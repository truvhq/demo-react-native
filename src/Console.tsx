import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

export type ConsoleProps = {
  events: any[];
};

export const Console = ({events}: ConsoleProps) => {
  return (
    <View style={styles.container}>
      {events.map((event, key: number) => {
        return (
          <Text key={key} style={styles.line}>
            {event}
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  line: {
    marginTop: 8,
  },
});
