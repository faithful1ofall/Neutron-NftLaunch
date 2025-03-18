"use client";

import "@interchain-ui/react/styles";
import { ChainProvider } from "@cosmos-kit/react";
import { chains, assets } from "chain-registry";
import { wallets } from "cosmos-kit";
import { GasPrice } from "@cosmjs/stargate";

export function CosmosKitProvider({ children }) {
  const chain = chains.find((c) => c.chain_name === "neutrontestnet");
  const asset = assets.find((a) => a.chain_name === "neutrontestnet");

  if (!chain || !asset) {
    console.error("Chain or asset data not found for 'neutrontestnet'");
    return null; // Prevent rendering if data is missing
  }

  return (
    <ChainProvider
      chains={[chain]} // Pass as array
      assetLists={[asset]} // Pass as array
      wallets={wallets}
      signerOptions={{
        signingCosmwasm: {
          gasPrice: GasPrice.fromString("0.01untrn"),
        },
      }}
    >
      {children}
    </ChainProvider>
  );
}
