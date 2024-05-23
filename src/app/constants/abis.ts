export const ACCESS_ABI = [
// read: balanceOf(address owner)
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
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

// write: grantAccess()
  {
    inputs: [],
    name: "grantAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  }
]