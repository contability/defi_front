export const abi = [
  {
    name: "totalSupply",
    outputs: [{ type: "uint256", name: "out" }],
    inputs: [],
    constant: true,
    payable: false,
    type: "function",
    gas: 1713,
  },
  {
    name: "name",
    constant: true,
    inputs: [],
    outputs: [{ name: "name", type: "string" }],
    type: "function",
  },
  {
    name: "transfer",
    type: "function",
    inputs: [
      { name: "_to", type: "address" },
      { type: "uint256", name: "_tokens" },
    ],
    constant: false,
    outputs: [],
    payable: false,
  },
  {
    name: "balanceOf",
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    name: "decimals",
    constant: true,
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
  {
    name: "approve",
    type: "function",
    payable: false,
    constant: true,
    inputs: [
      { type: "address", name: "spender" },
      { type: "uint256", name: "value" },
    ],
    outputs: [{ type: "bool", name: "success" }],
  },
  {
    name: "allowance",
    type: "function",
    payable: false,
    constant: true,
    inputs: [
      { type: "address", name: "owner" }, // onwer staker
      { type: "address", name: "spender" }, // stake contract
    ],
    outputs: [{ type: "uint256", name: "remaining" }],
  },
];
