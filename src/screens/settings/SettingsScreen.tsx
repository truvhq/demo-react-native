import React from 'react';

import {View} from 'react-native';

import {Field, FieldSet} from '../../components/Field';
import {Header} from '../../components/Header';
import {Layout} from '../../components/Layout';
import {Select} from '../../components/Select';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import {useClientId, useEnv} from '../../state';
import {useAccessKeys, useBackend} from '../../state/settings';

const backendValues = ['prod', 'stage', 'dev'];

export const SettingsScreen = () => {
  const [env, setEnv] = useEnv();
  const [clientId] = useClientId();
  const [accessKeys] = useAccessKeys();
  const [backend, setBackend] = useBackend();

  return (
    <Layout>
      <View>
        <Header>Settings</Header>
        <SegmentedControlTab
          values={['Prod', 'Stage', 'Dev']}
          onTabPress={value => setBackend(backendValues[value])}
          selectedIndex={backendValues.indexOf(backend)}
        />
        <FieldSet>
          <Select
            items={{sandbox: 'Sandbox', dev: 'Development', prod: 'Production'}}
            label="Environment"
            value={env}
            onChange={itemValue => setEnv(itemValue)}
          />
        </FieldSet>
        <FieldSet>
          <Field route="Client ID" value={clientId} />
        </FieldSet>
        <FieldSet title="Access Keys">
          <Field
            label="Sandbox"
            route="AccessKeysScreen"
            routeParams={{title: 'Sandbox Key', env: 'sandbox'}}
            value={accessKeys.sandbox}
          />
          <Field
            label="Development"
            route="AccessKeysScreen"
            routeParams={{title: 'Development Key', env: 'dev'}}
            value={accessKeys.dev}
          />
          <Field
            label="Production"
            route="AccessKeysScreen"
            routeParams={{title: 'Production Key', env: 'prod'}}
            value={accessKeys.prod}
          />
        </FieldSet>
      </View>
    </Layout>
  );
};
