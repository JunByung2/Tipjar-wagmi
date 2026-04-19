import { TipJarStats } from "@/components/TipJarStats";
import { TipForm } from "@/components/TipForm";
import { WithdrawButton } from "@/components/WithdrawButton";
import { DonorInfo } from "@/components/DonorInfo";
import { ConnectWallet } from "@/components/ConnectWallet";

export default function Home() {
  return (
    <main>
      <header>
        <h1>TipJar</h1>
        <ConnectWallet />
      </header>
      <TipJarStats />
      <TipForm />
      <DonorInfo />
      <WithdrawButton />
    </main>
  );
}
