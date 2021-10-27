import React, { useEffect, useState } from 'react';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, StyleSheet, View } from 'react-native';
import Toast from 'react-native-root-toast';

import { AdditionalSettings } from '../../components/AdditionalSettings';
import { Button } from '../../components/Button';
import { Field, FieldSet } from '../../components/Field';
import { Header } from '../../components/Header';
import { Layout } from '../../components/Layout';
import { Select } from '../../components/Select';

import { CitadelWidget } from '../../CitadelWidget';
import { useConsole, useProductSettings, useSelectedSettings, useWidget } from '../../state';
import { ProductStackParamList } from './types';

const products = {
  employment: 'Employment history',
  income: 'Income and employment',
  deposit_switch: 'Direct deposit switch',
  pll: 'Paycheck Linked Loan',
  admin: 'Admin',
  fas: 'Funding account switch',
} as const;

export const ProductScreen = ({ navigation }: NativeStackScreenProps<ProductStackParamList, 'Index'>) => {
  const [isWidgetVisible, setWidgetVisible] = useWidget();
  const [productSettings] = useProductSettings();
  const [product, setProduct] = useState('employment');
  const [bridgeToken, setBridgeToken] = useState('');
  const { log } = useConsole();
  const { clientId, accessKey } = useSelectedSettings();

  useEffect(() => {
    console.log('getting bridge token');

    setBridgeToken('');
    fetch(`${process.env.CITADEL_API_HOST}/v1/bridge-tokens/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Client-Id': clientId,
        'X-Access-Secret': accessKey,
      },
      body: JSON.stringify({
        product_type: product,
        provider_id: productSettings.providerId || undefined,
        company_mapping_id: productSettings.mappingId || undefined,
        account:
          product === 'deposit_switch' || product === 'pll'
            ? {
                account_number: productSettings.accountNumber,
                account_type: productSettings.accountType,
                bank_name: productSettings.bankName,
                routing_number: productSettings.routingNumber,
              }
            : undefined,
      }),
    })
      .then((response: any) => {
        return response.json();
      })
      .then((json: any) => {
        console.log('got bridge token', json);
        setBridgeToken(json.bridge_token);
      })
      .catch((err) => console.log(err));
  }, [product, clientId, accessKey, productSettings]);

  return (
    <Layout white={isWidgetVisible}>
      <View style={styles.container}>
        {isWidgetVisible ? (
          <CitadelWidget
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
                <Select
                  items={products}
                  label="Product type"
                  value={product}
                  onChange={(product: string) => setProduct(product)}
                />
              </FieldSet>
              <AdditionalSettings>
                <FieldSet>
                  <Field route="Company Mapping ID" value={productSettings.mappingId} />
                  <Field route="Provider ID" value={productSettings.providerId} />
                  {(product === 'deposit_switch' || product === 'pll') && (
                    <>
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
              onPress={() => {
                if (!bridgeToken || !clientId || !accessKey) {
                  Alert.alert(
                    'Can’t open Citadel Bridge',
                    'Add a key or change the environment in the settings to run Citadel Bridge.',
                    [{ text: 'Open settings', onPress: () => navigation.navigate('Settings') }]
                  );

                  return;
                }

                setWidgetVisible(true);
              }}
            >
              Open Citadel Bridge
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
