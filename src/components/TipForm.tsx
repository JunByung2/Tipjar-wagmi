"use client";
import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { contract } from "../contract";

export function TipForm() {
  const [amount, setAmount] = useState("");

  const { writeContract, data: txHash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleTip = () => {
    if (!amount || Number(amount) <= 0) return;
    writeContract({
      ...contract,
      functionName: "tip",
      value: parseEther(amount),
    });
  };

  return (
    <div className="tip-form">
      <h2>🫙 팁 보내기</h2>

      <div className="input-group">
        <input
          type="number"
          placeholder="0.001"
          step="0.001"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="eth-input"
        />
        <span className="unit">ETH</span>
      </div>

      {/* 빠른 선택 버튼 */}
      <div className="quick-amounts">
        {["0.001", "0.005", "0.01", "0.05"].map((v) => (
          <button key={v} onClick={() => setAmount(v)} className="btn-quick">
            {v} ETH
          </button>
        ))}
      </div>

      <button
        onClick={handleTip}
        disabled={isPending || isConfirming || !amount}
        className="btn-tip"
      >
        {isPending
          ? "지갑 확인 중..."
          : isConfirming
            ? "트랜잭션 처리 중..."
            : "팁 보내기 "}
      </button>

      {isSuccess && (
        <p className="success-msg"> 팁이 성공적으로 전송되었습니다</p>
      )}
      {error && (
        <p className="error-msg">{(error as Error).message.slice(0, 100)}</p>
      )}
      {txHash && (
        <a
          href={`https://sepolia.etherscan.io/tx/${String(txHash)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="tx-link"
        >
          Etherscan에서 보기 →
        </a>
      )}
    </div>
  );
}
