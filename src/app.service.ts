import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  async getConversionRate() {
    const conversionApiUrl = process.env.EXCHANGE_RATE_API_URL || '';
    const conversionApiKey = process.env.EXCHANGE_RATE_API_KEY || '';
    const apiKeyHeader = process.env.API_KEY_HEADER || '';

    return fetch(conversionApiUrl, {
      headers: {
        [apiKeyHeader]: conversionApiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => data.exchange_rate as number)
      .catch(() => {
        throw new Error('Server error occurred getting conversion rate.');
      });
  }
}
