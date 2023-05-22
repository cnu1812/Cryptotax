from datetime import datetime
import requests
import json

url = "https://api-sandbox.circle.com/v1/wallets"

payload = {
    "idempotencyKey": "ba943ff1-ca16-49b2-ba55-1057e70ca5c7", # enter your own one! or ask user to enter
    "description": "new_user_wallet"
}
headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "authorization": f"Bearer {bearer_token}"
}

response = requests.post(url, json=payload, headers=headers)

response_json = json.loads(response.text)
print("creating user wallet...\n")
print("Response", json.dumps(response_json, indent=4))
print("\n")
# response_text = response.text

# storing wallet id
wallet_id = response_json['data']['walletId']
print("user_wallet_id:",wallet_id)
print("\n")

# fund wallet id - 1013253661 - for demo purpose - needs to be removed

# getting list of all transactions
wallet_id = 1013253661
url = f"https://api-sandbox.circle.com/v1/transfers?walletId={wallet_id}&returnIdentities=false"

headers = {
    "accept": "application/json",
    "authorization": f"Bearer {bearer_token}"
}

# transaction_list = requests.get(url, headers=headers)
# transaction_list_json = json.loads(transaction_list.text)
# print("wallet_id_transaction_list:", json.dumps(transaction_list_json, indent=4))


transaction_list = requests.get(url, headers=headers)
transaction_list_json = json.loads(transaction_list.text)

country = input("Please enter your country(India/Brazil): ")

exchange_rate_INR = 82.84  # USD to INR exchange rate
exchange_rate_BRL = 5.00  # USD to BRL exchange rate

total = 0
total_sales = 0
for transaction in transaction_list_json['data']:
    createDate = transaction['createDate']
    amount = float(transaction['amount']['amount'])
    status = transaction['status']
    currency = transaction['amount']['currency']

    if status == 'complete':
        total_sales += amount
        if country == 'India':
            total += amount * 0.3
        elif country == 'Brazil' and total_sales > 35000:
            total += amount * 0.15

if country == 'Brazil':
    last_transaction = transaction_list_json['data'][-1]
    createDate = last_transaction['createDate']
    date_format = "%Y-%m-%dT%H:%M:%S.%fZ"
    date_difference = datetime.now() - datetime.strptime(createDate, date_format)
    print(f"Days since last transaction: {date_difference.days}")

if country == 'India':
    total *= exchange_rate_INR
    currency = 'INR'
elif country == 'Brazil':
    total *= exchange_rate_BRL
    currency = 'BRL'
else:
    print("Adding soon, stay tuned!")

if country in ['India', 'Brazil']:
    print(f"\nTotal payable tax: {total:.2f} {currency}")

# make a dictonary output

output = {
    'total_payable_tax': total,
    'currency': currency,
    'country': country,
}


def check_region(output, country):
    if country == 'Brazil':
        output['date_difference'] = date_difference.days
    return output

if country == "Brazil":
    output = check_region(output, country)
    output_json = json.dumps(output, indent=4)
    print(output_json)

elif country =="India":
    output_json = json.dumps(output, indent=4)
    print(output_json)

