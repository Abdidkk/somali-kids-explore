
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Apple, CreditCard } from "lucide-react";

interface PaymentFormProps {
  cardNumber: string;
  setCardNumber: (val: string) => void;
  cardExpiry: string;
  setCardExpiry: (val: string) => void;
  cardCvc: string;
  setCardCvc: (val: string) => void;
  handlePay: () => void;
  isLoading?: boolean;
}

const PaymentForm = ({
  cardNumber,
  setCardNumber,
  cardExpiry,
  setCardExpiry,
  cardCvc,
  setCardCvc,
  handlePay,
  isLoading = false,
}: PaymentFormProps) => (
  <div className="mt-10">
    <h2 className="text-lg font-semibold text-blue-700 mb-3">Betalingsoplysninger</h2>
    <div className="space-y-3">
      <Input
        type="text"
        placeholder="Kortnummer"
        value={cardNumber}
        onChange={e => setCardNumber(e.target.value)}
        className="bg-blue-50 focus:bg-white border-blue-200"
        maxLength={19}
        autoComplete="cc-number"
        inputMode="numeric"
      />
      <div className="flex gap-3">
        <Input
          type="text"
          placeholder="Udløbsdato (MM/ÅÅ)"
          value={cardExpiry}
          onChange={e => setCardExpiry(e.target.value)}
          className="bg-blue-50 focus:bg-white border-blue-200"
          maxLength={5}
          autoComplete="cc-exp"
          inputMode="numeric"
        />
        <Input
          type="text"
          placeholder="CVC"
          value={cardCvc}
          onChange={e => setCardCvc(e.target.value)}
          className="bg-blue-50 focus:bg-white border-blue-200"
          maxLength={4}
          autoComplete="cc-csc"
          inputMode="numeric"
        />
      </div>
    </div>
    <Button
      className="w-full mt-7 bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 py-3 text-base shadow transition-all"
      type="button"
      onClick={handlePay}
      disabled={isLoading}
    >
      <CreditCard className="mr-1" size={21} /> 
      {isLoading ? "Opretter..." : "Betal"}
    </Button>
    <div className="flex flex-col gap-3 mt-5">
      <Button
        className="w-full bg-[#4285F4] hover:bg-[#357ae8] text-white font-semibold flex items-center justify-center gap-2 py-3 text-base"
        type="button"
        disabled
      >
        Betal med Google Pay
      </Button>
      <Button
        className="w-full bg-black hover:bg-neutral-800 text-white font-semibold flex items-center justify-center gap-2 py-3 text-base"
        type="button"
        disabled
      >
        <Apple size={22} /> Betal med Apple Pay
      </Button>
      <Button
        className="w-full bg-[#0095DA] hover:bg-[#007bbd] text-white font-semibold flex items-center justify-center gap-2 py-3 text-base"
        type="button"
        disabled
      >
        Betal med MobilePay
      </Button>
    </div>
    <p className="text-xs text-gray-400 text-center mt-3">
      (Prototype: Betaling er ikke aktiveret)
    </p>
  </div>
);

export default PaymentForm;
