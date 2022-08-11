export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "_balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "_map_auction_instance_hash_uuid",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "_map_uuid_auction_instance_hash",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "_map_uuid_auctioninfo",
    outputs: [
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_target_kip17_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_target_token_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_paymeansaddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_offerprice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_starting_time",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiry",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "_map_uuid_bidinfo",
    outputs: [
      {
        internalType: "address",
        name: "_bidder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bidtime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_bidcount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_referer",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_mode_dev0_prod1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
    ],
    name: "cancel_bid",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_seller",
        type: "address",
      },
      {
        internalType: "address",
        name: "_target_kip17_contract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_starting_price",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_paymeansaddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_starting_time",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiry",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_bidamount",
        type: "uint256",
      },
    ],
    name: "mint_start_auction_and_bid_scalars",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onKIP17Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_state",
        type: "uint256",
      },
    ],
    name: "set_mode_dev0_prod1",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uuid",
        type: "string",
      },
    ],
    name: "settle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_paymeansaddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "withdraw_fund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
