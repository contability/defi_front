export const abi = [
  {
    inputs: [],
    name: "AlreadySubscribed",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyUnsubscribed",
    type: "error",
  },
  {
    inputs: [],
    name: "FullyPacked",
    type: "error",
  },
  {
    inputs: [],
    name: "IncentiveOverflow",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidTimeFrame",
    type: "error",
  },
  {
    inputs: [],
    name: "NoToken",
    type: "error",
  },
  {
    inputs: [],
    name: "NonZero",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSubscribed",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyCreator",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "rewardToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
    ],
    name: "IncentiveCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "changeAmount",
        type: "int256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newStartTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newEndTime",
        type: "uint256",
      },
    ],
    name: "IncentiveUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Stake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "Subscribe",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Unstake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "Unsubscribe",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "incentiveId",
        type: "uint256",
      },
    ],
    name: "accrueRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "datas",
        type: "bytes[]",
      },
    ],
    name: "batch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "incentiveIds",
        type: "uint256[]",
      },
    ],
    name: "claimRewards",
    outputs: [
      {
        internalType: "uint256[]",
        name: "rewards",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "rewardToken",
        type: "address",
      },
      {
        internalType: "uint112",
        name: "rewardAmount",
        type: "uint112",
      },
      {
        internalType: "uint32",
        name: "startTime",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "endTime",
        type: "uint32",
      },
    ],
    name: "createIncentive",
    outputs: [
      {
        internalType: "uint256",
        name: "incentiveId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "incentiveCount",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "incentives",
    outputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "rewardToken",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "endTime",
        type: "uint32",
      },
      {
        internalType: "uint256",
        name: "rewardPerLiquidity",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "lastRewardTime",
        type: "uint32",
      },
      {
        internalType: "uint112",
        name: "rewardRemaining",
        type: "uint112",
      },
      {
        internalType: "uint112",
        name: "liquidityStaked",
        type: "uint112",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "rewardPerLiquidityLast",
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
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint112",
        name: "amount",
        type: "uint112",
      },
      {
        internalType: "uint256[]",
        name: "incentiveIds",
        type: "uint256[]",
      },
      {
        internalType: "bool",
        name: "transferExistingRewards",
        type: "bool",
      },
    ],
    name: "stakeAndSubscribeToIncentives",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint112",
        name: "amount",
        type: "uint112",
      },
      {
        internalType: "bool",
        name: "transferExistingRewards",
        type: "bool",
      },
    ],
    name: "stakeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "incentiveId",
        type: "uint256",
      },
    ],
    name: "subscribeToIncentive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint112",
        name: "amount",
        type: "uint112",
      },
      {
        internalType: "bool",
        name: "transferExistingRewards",
        type: "bool",
      },
    ],
    name: "unstakeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "incentiveIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "ignoreRewards",
        type: "bool",
      },
    ],
    name: "unsubscribeFromIncentive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "incentiveId",
        type: "uint256",
      },
      {
        internalType: "int112",
        name: "changeAmount",
        type: "int112",
      },
      {
        internalType: "uint32",
        name: "newStartTime",
        type: "uint32",
      },
      {
        internalType: "uint32",
        name: "newEndTime",
        type: "uint32",
      },
    ],
    name: "updateIncentive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userStakes",
    outputs: [
      {
        internalType: "uint112",
        name: "liquidity",
        type: "uint112",
      },
      {
        internalType: "uint144",
        name: "subscribedIncentiveIds",
        type: "uint144",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
