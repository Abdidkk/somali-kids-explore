
interface PaymentSummaryProps {
  baseMonthly: number;
  kidMonthly: number;
  baseYearly: number;
  kidYearly: number;
  numKids: number;
}

const PaymentSummary = ({
  baseMonthly,
  kidMonthly,
  baseYearly,
  kidYearly,
  numKids,
}: PaymentSummaryProps) => {
  const extraKids = numKids > 1 ? numKids - 1 : 0;
  const totalMonthly = baseMonthly + kidMonthly * extraKids;
  const totalYearly = baseYearly + kidYearly * extraKids;

  return (
    <div className="mb-6 text-center bg-blue-50 border border-blue-200 rounded py-3 px-3 text-blue-800 font-semibold">
      <div>
        <span className="block">
          <span className="text-base">Din samlede pris:</span>
        </span>
        <span>
          <b>{totalMonthly} kr/md.</b>&nbsp;eller&nbsp;
          <b>{totalYearly} kr/år</b>
        </span>
      </div>
      <div className="mt-1 text-xs text-gray-500">
        (Inkluderer basispris + {numKids} børneprofil{numKids === 1 ? "" : "er"})
      </div>
    </div>
  );
};

export default PaymentSummary;
