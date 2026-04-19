"use client";
import { useReadContracts } from "wagmi";
import { formatEther } from "viem";
import { contract } from "../contract";

export function TipJarStats() {
  const { data, isLoading } = useReadContracts({
    contracts: [
      { ...contract, functionName: "getBalance" },
      { ...contract, functionName: "targetAmount" },
      { ...contract, functionName: "totalRaised" },
      { ...contract, functionName: "getCompletionRate" },
      { ...contract, functionName: "owner" },
    ],
    query: {
      refetchInterval: 3000, // 3초마다 자동 갱신
    },
  });

  if (isLoading) return <div className="loading">불러오는 중...</div>;

  const balance = data?.[0]?.result as bigint | undefined;
  const target = data?.[1]?.result as bigint | undefined;
  const totalRaised = data?.[2]?.result as bigint | undefined;
  const completionRate = data?.[3]?.result as bigint | undefined;
  const owner = data?.[4]?.result as string | undefined;

  const rate = completionRate !== undefined ? Number(completionRate) : 0;

  return (
    <div className="stats-card">
      <h2>TipJar 현황</h2>

      <div className="stat-row">
        <span>목표 금액</span>
        <strong>{target ? formatEther(target) : "—"} ETH</strong>
      </div>

      <div className="stat-row">
        <span>현재 잔액</span>
        <strong>{balance ? formatEther(balance) : "0"} ETH</strong>
      </div>

      <div className="stat-row">
        <span>총 모금액</span>
        <strong>{totalRaised ? formatEther(totalRaised) : "0"} ETH</strong>
      </div>

      {/* 진행률 바 */}
      <div className="progress-section">
        <div className="progress-label">
          <span>달성률</span>
          <span>{rate}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${rate}%` }} />
        </div>
      </div>

      <div className="stat-row owner">
        <span>오너 주소</span>
        <span className="small-address">
          {owner ? `${owner.slice(0, 8)}...${owner.slice(-6)}` : "—"}
        </span>
      </div>
    </div>
  );
}
