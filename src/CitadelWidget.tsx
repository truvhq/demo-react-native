import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

export type BridgeMessage = {
  event: string;
  payload: Record<string, unknown>;
};

export type CitadelWidgetProps = {
  baseUrl: string;
  style: StyleProp<ViewStyle>;
  onEvent: (payload: Record<string, unknown>) => void;
  onLoad: () => void;
  onClose: () => void;
  onSuccess: () => void;
  onError?: () => void;
  bridgeToken: string;
};

export const CitadelWidget = ({
  baseUrl,
  style,
  onLoad,
  onClose,
  onEvent,
  onSuccess,
  onError,
  bridgeToken,
}: CitadelWidgetProps) => {
  const onBridgeMessage = (event: WebViewMessageEvent) => {
    let data: BridgeMessage | null = null;

    try {
      data = JSON.parse(event.nativeEvent.data);
    } catch (e) {}

    switch (data?.event) {
      case 'onLoad':
        onLoad();
        break;
      case 'onClose':
        onClose();
        break;
      case 'onSuccess':
        onSuccess();
        break;
      case 'onEvent':
        onEvent(data.payload);
        break;
    }
  };

  return (
    <WebView
      javaScriptEnabled={true}
      originWhitelist={['*']}
      source={{
        uri: `${baseUrl}/mobile.html?bridge_token=${bridgeToken}`,
      }}
      style={style}
      onError={onError}
      onMessage={onBridgeMessage}
    />
  );
};
