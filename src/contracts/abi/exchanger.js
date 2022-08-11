const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "_cumul_exchange_amount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_cumul_exchange_count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "__vault",
				"type": "address"
			}
		],
		"name": "_set_vault",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_vault",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_fromtoken",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_totoken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_exchangerate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fromamount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_toamount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_adminaddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_adminfeerate",
				"type": "uint256"
			}
		],
		"name": "exchange",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw_fund",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export { abi };