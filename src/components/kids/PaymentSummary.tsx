
interface PaymentSummaryProps {
  baseMonthly: number;
  kidMonthly: number;
  baseYearly: number;
  kidYearly: number;
  numKids: number;
  billingInterval?: "monthly" | "yearly";
}

const PaymentSummary = ({
  baseMonthly,
  kidMonthly,
  baseYearly,
  kidYearly,
  numKids,
  billingInterval = "monthly",
}: PaymentSummaryProps) => {
  const totalMonthly = baseMonthly + kidMonthly * numKids;
  const totalYearly = baseYearly + kidYearly * numKids;
  const currentTotal = billingInterval === "monthly" ? totalMonthly : totalYearly;

  return (
    <div className="mb-6 text-center bg-blue-50 border border-blue-200 rounded py-3 px-3 text-blue-800 font-semibold">
      <div>
        <span className="block">
          <span className="text-base">Din samlede pris:</span>
        </span>
        <span>
          <b>{currentTotal} kr{billingInterval === "monthly" ? "/md." : "/år"}</b>
        </span>
        {billingInterval === "yearly" && (
          <div className="text-sm text-green-600 mt-1">
            Sparer {(totalMonthly * 12) - totalYearly} kr/år
          </div>
        )}
      </div>
      <div className="mt-1 text-xs text-gray-500">
        (Inkluderer basispris + {numKids} børneprofil{numKids === 1 ? "" : "er"})
      </div>
    </div>
  );
};

export default PaymentSummary;
