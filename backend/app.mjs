import fetch from 'node-fetch';
import 'readline'

const url = "https://api-sandbox.circle.com/v1/wallets";
const bearer_token = "QVBJX0tFWTo5MTQyYjM1M2YxMjdhM2EwYmM0MDg4NDQyZTBjNDQ4Njo0MDJmZTNiODEwZGU0OGMyMDNjYjI4NDBhMDFiYTM3NQ=="

const payload = {
    "idempotencyKey": "d08db5a1-78fb-4c8e-b073-81fab6816216", // enter your own one! or ask user to enter
    "description": "new_wallet"
};

const headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": `Bearer ${bearer_token}`
};

fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: headers
})
    .then(response => response.json())
    .then(response_json => {
        console.log("creating user wallet...\n");
        console.log("Response", JSON.stringify(response_json, null, 4));
        console.log("\n");

        // storing wallet id
        const wallet_id = response_json['data']['walletId'];
        console.log("user_wallet_id:", wallet_id);
        console.log("\n");

        // fund wallet id - 1013253661 - for demo purpose - needs to be removed

        // getting list of all transactions
        const wallet_id_n = 1013253661;
        const url = `https://api-sandbox.circle.com/v1/transfers?walletId=${wallet_id_n}&returnIdentities=false`;

        const headers = {
            "accept": "application/json",
            "authorization": `Bearer ${bearer_token}`
        };

        fetch(url, { headers: headers })
            .then(transaction_list => transaction_list.json())
            .then(transaction_list_json => {
                let country;

                readline.question('Please enter your country (India/Brazil): ', answer => {
                    country = answer;
                    readline.close();
                });

                const exchange_rate_INR = 82.84; // USD to INR exchange rate
                const exchange_rate_BRL = 5.00; // USD to BRL exchange rate

                let total = 0;
                let total_sales = 0;
                for (let transaction of transaction_list_json['data']) {
                    let createDate = transaction['createDate'];
                    let amount = parseFloat(transaction['amount']['amount']);
                    let status = transaction['status'];
                    let currency = transaction['amount']['currency'];

                    if (status === 'complete') {
                        total_sales += amount;
                        if (country === 'India') {
                            total += amount * 0.3;
                        } else if (country === 'Brazil' && total_sales > 35000) {
                            total += amount * 0.15;
                        }
                    }
                }

                if (country === 'Brazil') {
                    let last_transaction = transaction_list_json['data'][transaction_list_json['data'].length - 1];
                    let createDate = last_transaction['createDate'];
                    let date_format = "%Y-%m-%dT%H:%M:%S.%fZ";
                    let date_difference = new Date() - new Date(createDate);
                    console.log(`Days since last transaction: ${Math.floor(date_difference / (1000 * 60 * 60 * 24))}`);
                }

                if (country === 'India') {
                    total *= exchange_rate_INR;
                    currency = 'INR';
                } else if (country === 'Brazil') {
                    total *= exchange_rate_BRL;
                    currency = 'BRL';
                } else {
                    console.log("Adding soon, stay tuned!");
                }

                if (country in ['India', 'Brazil']) {
                    console.log(`\nTotal payable tax: ${total.toFixed(2)} ${currency}`);
                }

                // make a dictionary output

                let output = {
                    'total_payable_tax': total,
                    'currency': currency,
                    'country': country,
                };

                function check_region(output, country) {
                    if (country === 'Brazil') {
                        output['date_difference'] = Math.floor(date_difference / (1000 * 60 * 60 * 24));
                        return output;
                    }
                }

                if (country === "Brazil") {
                    output = check_region(output, country);
                    let output_json = JSON.stringify(output, null, 4);
                    console.log(output_json);
                } else if (country === "India") {
                    let output_json = JSON.stringify(output, null, 4);
                    console.log(output_json);
                }
            });
    });
