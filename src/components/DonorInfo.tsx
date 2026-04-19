"use client";
import { useAccount, useReadContract } from "wagmi";
import { formatEther } from "viem";
import { contract } from "../contract";

export function DonorInfo() {
  const { address, isConnected } = useAccount();

  const { data: donorBalance } = useReadContract({
    ...contract,
    functionName: "getDonorBalance",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  if (!isConnected) return null;

  return (
    <div className="donor-info">
      <h3> 내 기여 현황</h3>
      <p>
        내가 보낸 총 금액:{" "}
        <strong>
          {donorBalance ? formatEther(donorBalance as bigint) : "0"} ETH
        </strong>
      </p>
    </div>
  );
}
