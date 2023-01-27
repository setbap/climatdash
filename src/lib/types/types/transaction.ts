export interface TransactionsAVGInfo {
  "AVG tx count": number;
  "AVG success rate": number;
  "AVG Active users": number;
  "AVG fee": number;
  "AVG tx fee per day": number;
}

export interface TransactionsTotalInfo {
  "tx count": number;
  "Active users": number;
  fee: number;
}

export interface TransactionsTPS {
  Day: string;
  TPS: number;
  "AVG TPS": number;
}

export interface TransactionsBlockAge {
  Day: string;
  "block age": number;
  "Block tx": number;
  "MA7 block tx": number;
  "AVG block age": number;
  "AVG block tx": number;
}

export interface TransactionsTXInfo {
  Day: string;
  "tx count": number;
  "Active users": number;
  fee: number;
  "Avg tx fee": number;
  "Success Rate": number;
  "MA7 tx count": number;
  "MA7 fee": number;
  "Cum tx count": number;
  "Cum fee": number;
  "AVG tx count": number;
  "AVG success rate": number;
  "AVG Active users": number;
  "AVG fee": number;
  "AVG tx fee per day": number;
}

export interface TransactionsNewWallet {
  Day: string;
  "New wallet": number;
  "Cum new wallet": number;
  "AVG New wallet": number;
}

export interface TransactionsTodayInfo {
  Day: string;
  "24h Transactions": number;
  "Previous 24h Transactions": number;
  "change (%) Transactions": number;
  "24h Active Wallets": number;
  "Previous 24h Active Wallets": number;
  "change (%) Active Wallets": number;
  "24h TX Fee": number;
  "Previous 24h TX Fee": number;
  "change (%) TX Fee": number;
  "24h Success Rate": number;
  "Previous 24h Success Rate": number;
  "change (%) Success Rate": number;
}

export interface TransactionsFee {
  "Day": string;
  "fee": number;
  "Avg tx fee": number;
  "MA7 fee": number;
  "Cum fee": number;
  "AVG fee": number;
  "AVG tx fee per day": number;
}