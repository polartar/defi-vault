### Usage

The main purpose of this package is to provide the Solidity interfaces of core components, which are found in the [`/contracts/interfaces`](./contracts/interfaces] directory. The Vault contract itself is also useful for testing.

To get the address of deployed contracts in both mainnet and various test networks, see [`v2-deployments`](../deployments).

Sample contract that performs Internal Balance deposits:

```solidity
pragma solidity ^0.7.0;


contract SimpleDepositor {
    IVault private constant vault = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";

    function depositFunds(
        IERC20[] memory tokens,
        uint256[] memory amounts,
    ) external {
      IVault.UserBalanceOp[] memory ops = new IVault.UserBalanceOp[](tokens.length);

      for (uint256 i = 0; i < tokens.length; ++i) {
        ops[i] = IVault.UserBalanceOp({
          kind: IVault.UserBalanceOpKind.DEPOSIT_INTERNAL,
          asset: IAsset(tokens[i]),
          amount: amounts[i],
          sender: address(this),
          recipient: address(this)
        });
      }

      vault.manageUserBalance(ops);
    }
}
```

Sample contract that performs Flash Loans:

```solidity
pragma solidity ^0.7.0;

contract FlashLoanRecipient is IFlashLoanRecipient {
    IVault private constant vault = "0xBA12222222228d8Ba445958a75a0704d566BF2C8";

    function makeFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        bytes memory userData
    ) external {
      vault.flashLoan(this, tokens, amounts, userData);
    }

    function receiveFlashLoan(
        IERC20[] memory tokens,
        uint256[] memory amounts,
        uint256[] memory feeAmounts,
        bytes memory userData
    ) external override {
        require(msg.sender == vault);
        ...
    }
}
```

## Licensing

[GNU General Public License Version 3 (GPL v3)](../../LICENSE).
