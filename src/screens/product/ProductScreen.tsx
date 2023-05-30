import React, { useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TruvBridge from '@truv/react-native';
import { Alert, StyleSheet, View } from 'react-native';

import { AdditionalSettings } from '../../components/AdditionalSettings';
import { Button } from '../../components/Button';
import { Field, FieldSet } from '../../components/Field';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { ProductsSelect } from '../../components/ProductsSelect';

import { Product } from '../../api/truv';
import { useConsole, useProductSettings, useWidget } from '../../state';
import { useBridgeToken } from '../../state/bridge';
import { ProductStackParamList } from './types';

export const ProductScreen = ({ navigation }: NativeStackScreenProps<ProductStackParamList, 'Index'>) => {
  const [isWidgetVisible, setWidgetVisible] = useWidget();
  const [productSettings] = useProductSettings();
  const [product, setProduct] = useState<Product>('employment');
  const { log } = useConsole();
  const bridgeTokenLoadable = useBridgeToken();
  const bridgeToken = bridgeTokenLoadable.valueMaybe();

  return (
    <Layout white={isWidgetVisible}>
      <View style={styles.container}>
        {isWidgetVisible ? (
          <TruvBridge
            __cdnUrl="http://localhost:3700/mobile.html"
            bridgeToken={bridgeToken ?? ''}
            style={styles.container}
            onClose={() => {
              setWidgetVisible(false);
              log('widget closed');
            }}
            onError={() => {
              setWidgetVisible(false);
            }}
            onEvent={(event) => log(JSON.stringify(event, null, 2))}
            onLoad={() => {
              log('widget opened');
            }}
            onSuccess={() => {
              setWidgetVisible(false);
              log('widget succeeded');
            }}
          />
        ) : (
          <View style={styles.body}>
            <View>
              <Header>Product</Header>
              <FieldSet>
                <ProductsSelect value={product} onChange={(product: Product) => setProduct(product)} />
              </FieldSet>
              <AdditionalSettings>
                <FieldSet>
                  <Field route="Company Mapping ID" value={productSettings.mappingId} />
                  <Field route="Provider ID" value={productSettings.providerId} />
                  {(product === 'deposit_switch' || product === 'pll') && (
                    <>
                      <Field route="Deposit Value" value={productSettings.depositValue} />
                      <Field route="Routing Number" value={productSettings.routingNumber} />
                      <Field route="Account Number" value={productSettings.accountNumber} />
                      <Field route="Bank Name" value={productSettings.bankName} />
                      <Field route="Account type" value={productSettings.accountType} />
                    </>
                  )}
                </FieldSet>
              </AdditionalSettings>
            </View>
            <Button
              disabled={!bridgeToken}
              onPress={() => {
                if (!bridgeToken) {
                  Alert.alert(
                    'Can’t open Truv Bridge',
                    'Add a key or change the environment in the settings to run Truv Bridge.',
                    [{ text: 'Open settings', onPress: () => navigation.navigate('Settings') }]
                  );

                  return;
                }

                log(`Opening Widget with bridge_token ${bridgeToken}`);

                setWidgetVisible(true);
              }}
            >
              Open Truv Bridge
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
  body: {
    flex: 1,
    justifyContent: 'space-between',
  },
  picker: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(60, 60, 67, 0.29)',
  },
});
