import React, {useCallback, useState} from 'react';

import {TruvEventPayload, TruvOrderEventType, TruvOrderBridge} from '@truv/react-native';
import {StyleSheet, TextInput, View} from 'react-native';

import {Button} from '../../components/Button';
import {FieldSet} from '../../components/Field';
import {Header} from '../../components/Header';
import {Layout} from '../../components/Layout';

import {useConsole} from '../../state';
import { useTruvConfig } from '../../state/settings';

export const OrderScreen = () => {
  const [orderToken, setOrderToken] = useState('');
  const [isWidgetVisible, setWidgetVisible] = useState(false);
  const {addLog} = useConsole();
  const truvConfig = useTruvConfig();

  const onWidgetEvent = useCallback(
    (event: TruvEventPayload) => {
      addLog(`Widget event: ${JSON.stringify(event, null, 2)}`);
    },
    [addLog],
  );

  const onOrderEvent = useCallback(
    (eventType: TruvOrderEventType) => {
      if (eventType === "CLOSE") {
        setWidgetVisible(false);
      }
      addLog(`Order event: ${eventType}`);
    },
    [addLog],
  );

  return (
    <Layout white={isWidgetVisible}>
      <View style={styles.container}>
        {isWidgetVisible && orderToken ? (
          <TruvOrderBridge
            bridgeToken={orderToken}
            style={styles.bridge}
            onWidgetEvent={onWidgetEvent}
            onOrderEvent={onOrderEvent}
            config={truvConfig}
          />
        ) : (
          <View style={styles.body}>
            <View>
              <Header>Order</Header>
              <FieldSet>
                <TextInput
                  style={styles.input}
                  value={orderToken}
                  onChangeText={setOrderToken}
                  placeholder="Bridge token"
                  placeholderTextColor="rgba(60, 60, 67, 0.3)"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </FieldSet>
            </View>
            <Button
              disabled={!orderToken.trim()}
              onPress={() => {
                addLog(`Opening Order with bridge_token ${orderToken}`);
                setWidgetVisible(true);
              }}>
              Open Order
            </Button>
          </View>
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bridge: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'rgba(60, 60, 67, 0.29)',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 11,
    fontSize: 17,
    lineHeight: 22,
    color: 'black',
  },
});
