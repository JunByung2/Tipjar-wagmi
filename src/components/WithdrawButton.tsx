"use client";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { contract } from "../contract";

export function WithdrawButton() {
  const { address } = useAccount();

  const { data: owner } = useReadContract({
    ...contract,
    functionName: "owner",
  });

  const { data: completionRate } = useReadContract({
    ...contract,
    functionName: "getCompletionRate",
  });

  const { writeContract, data: txHash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // 오너가 아니면 렌더링하지 않음
  if (!address || address.toLowerCase() !== (owner as string)?.toLowerCase()) {
    return null;
  }

  const goalReached =
    completionRate !== undefined ? Number(completionRate) >= 100 : false;
  return (
    <div className="withdraw-section">
      <h2>오너 전용</h2>

      {!goalReached && <p className="warning"> 목표 금액 미달 — 출금 불가</p>}

      <button
        onClick={() =>
          writeContract({ ...contract, functionName: "withdrawTips" })
        }
        disabled={isPending || isConfirming || !goalReached}
        className="btn-withdraw"
      >
        {isPending
          ? "지갑 확인 중..."
          : isConfirming
            ? "처리 중..."
            : "팁 출금하기"}
      </button>

      {isSuccess && <p className="success-msg">출금 완료</p>}
      {error && (
        <p className="error-msg"> {(error as Error).message.slice(0, 100)}</p>
      )}
    </div>
  );
}
