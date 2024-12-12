import React, { useRef } from "react";
import { CreditCardIcon } from "@primer/octicons-react";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import useSwapStore from "../store/useSwapStore";
import useTokenSelectionModalStore from "../store/useTokenSelectionModalStore";

export default function ReceiveInput() {
  const {
    receiveJetton,
    receiveAmount, setReceiveAmount,
    receiveAmountRate,
    setReceiveAmountRate,
    profit, setProfit,
    isAmountRatesLoaded, setIsAmountRatesLoaded,
    receiveSwapDataLoaded,
  } = useSwapStore();

  const { openTokenSelectionModal } = useTokenSelectionModalStore();

  const inputRef = useRef(null);

  const handleChange = (event) => {
    const receiveAmountInput = event.target.value.replace(/[^0-9.]/g, '');
    setReceiveAmount(receiveAmountInput);

    if (receiveAmount == "0") {
      console.log(1)
      setIsAmountRatesLoaded(true);
      setReceiveAmountRate(0);
      setProfit('');
    }
    else {
      setIsAmountRatesLoaded(false);
    }
  };

  return (
    <div className="px-5 pb-5">
      <div className="flex justify-between text-normalGray">
        <p>You Receive</p>
        <div className="flex items-center">
          <CreditCardIcon size={16} className="mr-1" />
          <p>{receiveJetton.balance}</p>
        </div>
      </div>
      <div className="flex justify-between items-center my-2">
        <div className="flex items-center">
          <Button
            variant="flat"
            radius="full"
            size="lg"
            className="flex items-center p-1 pr-4 bg-[#1c1c1c]"
            onClick={() => openTokenSelectionModal(false)}
          >
            <Avatar src={receiveJetton.image} />
            <p className="font-semibold text-lg">{receiveJetton.symbol}</p>
          </Button>
        </div>
        {receiveSwapDataLoaded || receiveAmount == 0 ? (
          <input
            type="text"
            placeholder="0"
            value={receiveAmount}
            ref={inputRef}
            onChange={handleChange}
            className="placeholder-white w-full text-2xl font-semibold text-right bg-transparent border-none focus:outline-none focus:ring-0"
          />
        ) : (
          <Spinner size="md" color="default" />
        )}
      </div>
      <div className="flex justify-between text-normalGray">
        <p>{receiveJetton.name}</p>
        <div>
          {isAmountRatesLoaded ? (
            <span>
              {receiveAmountRate}$
              {profit && profit.length > 0 && (
                profit.includes('-') ? (
                  <span className="ml-2 text-customRed font-semibold">({profit})</span>
                ) : profit.includes('+') ? (
                  <span className="ml-2 text-customGreen font-semibold">({profit})</span>
                ) : null
              )}
            </span>
          ) : (
            <Spinner size="sm" color="default" className="max-h-2" />
          )}
        </div>
      </div>
    </div>
  );
}
