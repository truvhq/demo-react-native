import React, { useEffect, useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import TruvBridge from '@truv/react-native';
import { Alert, StyleSheet, View } from 'react-native';

import { AdditionalSettings } from '../../components/AdditionalSettings';
import { Button } from '../../components/Button';
import { Field, FieldSet } from '../../components/Field';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { ProductsSelect, mapValueToProduct } from '../../components/ProductsSelect';

import { useConsole, useProductSettings, useSelectedSettings, useWidget } from '../../state';
import { Product } from '../../state/product';
import { ProductStackParamList } from './types';

const BASE_URL = process.env.TRUV_WIDGET_URL ?? '';

export const ProductScreen = ({ navigation }: NativeStackScreenProps<ProductStackParamList, 'Index'>) => {
  const [isWidgetVisible, setWidgetVisible] = useWidget();
  const [productSettings] = useProductSettings();
  const [product, setProduct] = useState<Product>('employment');
  const [bridgeToken, setBridgeToken] = useState('');
  const [bridgeTokenLoading, setBridgeTokenLoading] = useState(false);
  const { log } = useConsole();
  const { clientId, accessKey } = useSelectedSettings();

  useEffect(() => {
    if (!clientId || !accessKey) {
      setBridgeToken('');

      return;
    }

    log(`getting bridge token for client_id ${clientId}`);

    setBridgeTokenLoading(true);
    setBridgeToken('');
    fetch(`${process.env.TRUV_API_HOST}/v1/bridge-tokens/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Client-Id': clientId,
        'X-Access-Secret': accessKey,
      },
      body: JSON.stringify({
        product_type: mapValueToProduct(product),
        provider_id: productSettings.providerId || undefined,
        company_mapping_id: productSettings.mappingId || undefined,
        account:
          product === 'deposit_switch' || product === 'pll'
            ? {
                account_number: productSettings.accountNumber,
                account_type: productSettings.accountType,
                bank_name: productSettings.bankName,
                routing_number: productSettings.routingNumber,
                deposit_value: productSettings.depositValue,
                deposit_type: productSettings.depositType,
              }
            : undefined,
      }),
    })
      .then((response: any) => {
        return response.json();
      })
      .then((json: any) => {
        setBridgeToken(json.bridge_token);
        log(`Bridge Token response ${JSON.stringify(json)}`);
      })
      .catch((err) => log(`Error while receiving blidge token, ${err}`))
      .finally(() => setBridgeTokenLoading(false));
  }, [product, clientId, accessKey, productSettings]);

  return (
    <Layout white={isWidgetVisible}>
      <View style={styles.container}>
        {isWidgetVisible ? (
          <TruvBridge
            bridgeToken={bridgeToken}
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
              disabled={bridgeTokenLoading}
              onPress={() => {
                if (!bridgeToken) {
                  Alert.alert(
                    'Can???t open Truv Bridge',
                    'Add a key or change the environment in the settings to run Truv Bridge.',
                    [{ text: 'Open settings', onPress: () => navigation.navigate('Settings') }]
                  );

                  return;
                }

                log(`Opening Widget with baseUrl: ${BASE_URL} and bridge_token ${bridgeToken}`);

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
