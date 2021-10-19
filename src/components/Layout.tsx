import React, { ReactNode } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

export type LayoutProps = {
  white?: boolean;
  children: ReactNode;
};

export const Layout = ({ white, children }: LayoutProps) => {
  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: white ? 'white' : '#F4F4F4' }}>
      {children}
    </SafeAreaView>
  );
};
