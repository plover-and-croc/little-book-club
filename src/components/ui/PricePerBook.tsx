import { BAHT } from "@/lib/site";

type PricePerBookProps = {
  amount: number;
  className?: string;
};

export function PricePerBook({ amount, className = "" }: PricePerBookProps) {
  return (
    <span className={className}>
      <span lang="th" className="font-normal">
        {BAHT}
      </span>
      {amount.toLocaleString("en-TH")}
      <span className="text-[#333333]/70"> per book</span>
    </span>
  );
}
