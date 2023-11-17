export const products = {
  employment: 'Employment history',
  income: 'Income and employment',
  deposit_switch: 'Direct deposit switch',
  pll: 'Paycheck Linked Loan',
  admin: 'Employee directory',
  insurance: 'Insurance',
  transactions: 'Transactions',
  assets: 'Assets',
} as const;

export type Product = keyof typeof products;

export type ProductSettings = {
  productType: Product;
  mappingId: string;
  providerId: string;
  depositValue: string;
  depositType: string;
  routingNumber: string;
  accountNumber: string;
  bankName: string;
  accountType: 'checking';
};

export class TruvApiClient {
  private readonly baseUrl: string;
  private readonly clientId: string;
  private readonly apiKey: string;

  constructor(baseUrl: string, clientId: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.clientId = clientId;
    this.apiKey = apiKey;
  }

  async request<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: string,
  ): Promise<T> {
    console.log('request', this.baseUrl, method, path, body);
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Client-Id': this.clientId,
        'X-Access-Secret': this.apiKey,
      },
      body,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  async createUser(userId: string) {
    const response = await this.request<{
      id: string;
      error?: {message: string};
    }>('POST', '/v1/users/', JSON.stringify({external_user_id: userId}));

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.id;
  }

  async getBridgeToken(userId: string, productSettings: ProductSettings) {
    const response = await this.request<{bridge_token: string}>(
      'POST',
      `/v1/users/${userId}/tokens/`,
      JSON.stringify({
        product_type: productSettings.productType,
        provider_id: productSettings.providerId || undefined,
        company_mapping_id: productSettings.mappingId || undefined,
        account:
          productSettings.productType === 'deposit_switch' ||
          productSettings.productType === 'pll'
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
    );

    console.log('response', response);

    return response.bridge_token;
  }
}
