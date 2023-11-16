import React from 'react';

import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Header} from './components/Header';
import {Layout} from './components/Layout';

import {Console} from './Console';
import {useConsole} from './state';

export const ConsoleScreen = () => {
  const {console} = useConsole();

  return (
    <Layout>
      <View style={styles.root}>
        <Header>Console</Header>
        <ScrollView>
          <Console events={console} />
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
