import dotenv from "dotenv";
import fetch from 'node-fetch';

dotenv.config();

async function run() {
  const resp = await fetch(
    `https://api.sandbox.pawapay.cloud/payouts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer <YOUR_JWT_HERE>'
      },
      body: JSON.stringify({
        payoutId: '<INSERT_UUID_FOR_PAYOUT>',
        amount: '',
        currency: 'UGX',
        correspondent: 'MTN_MOMO_UGA',
        recipient: {
          type: 'MSISDN',
          address: {value: '260763456789'}
        },
        customerTimestamp: '2020-02-21T17:32:28Z',
        statementDescription: 'Note of 4 to 22 chars'
      })
    }
  );

  const data = await resp.json();
  console.log(data);
}

run();


