import React, { useEffect } from "react";
import { Button, Spacer } from "@nextui-org/react";
import { ArrowSwitchIcon, SyncIcon } from "@primer/octicons-react";
import Footer from "../../shared/components/Footer.jsx"

// Hooks
import useSwapStore from "./store/useSwapStore";
import useTokenSelectionModalStore from "./store/useTokenSelectionModalStore";
import { useFetchPool } from "./hooks/useFetchPool";
import { useEstimateSwap } from "./hooks/useEstimateSwap";
import { useSwapRates } from "./hooks/useSwapRates";

// Components
import SendInput from "./components/SendInput";
import ReceiveInput from "./components/ReceiveInput";
import SwapDetailsAccordion from "./components/SwapDetailsAccordion";

// Modals
import SettingsModal from "./modals/SettingsModal";
import TokenSelectionModal from "./modals/TokenSelectionModal";
import ConfirmSwapModal from "./modals/ConfirmSwapModal";

export default function SwapPage() {
  const {
    receiveJetton,
    sendJetton,
    sendAmount,
    receiveAmount,
    setReceiveAmount,
    setSendAmountRate,
    setReceiveAmountRate,
    setProfit,
    setProfitInUSD,
    setIsAmountRatesLoaded,
    setReceiveSwapDataLoaded,
    setIsPoolExist,
    slippage,
    setSlippage,
    handleSwap,
    handleUpdateSwapButtonClick,
    calculateMinimumReceived,
    isUpdateButtonIconRoating,
    isSwapButtonIconRoating
  } = useSwapStore();

  const { openTokenSelectionModal } = useTokenSelectionModalStore();

  const { data: poolExist } = useFetchPool(receiveJetton, sendJetton);
  const { data: estimatedSwap, refetch: estimateSwap } = useEstimateSwap(sendJetton, sendAmount, receiveJetton);
  const { data: swapRates } = useSwapRates(sendJetton, sendAmount, receiveJetton, receiveAmount);

  useEffect(() => {
    if (poolExist !== undefined) {
      setIsPoolExist(poolExist);
    }
  }, [poolExist, setIsPoolExist]);

  useEffect(() => {
    if (estimatedSwap !== undefined && estimatedSwap !== null) {
      setReceiveAmount(estimatedSwap);
      setReceiveSwapDataLoaded(true);
    }
  }, [estimatedSwap]);

  useEffect(() => {
    if (swapRates !== undefined) {
      setSendAmountRate(swapRates.send_amount_rate_in_usd);
      setReceiveAmountRate(swapRates.receive_amount_rate_in_usd);
      setProfitInUSD(swapRates.profit_in_usd);
      setProfit(swapRates.profit);
      setIsAmountRatesLoaded(true);
    }
  }, [swapRates]);

  useEffect(() => {
    if (receiveAmount !== 0) {
      calculateMinimumReceived();
    }
  }, [receiveAmount, slippage]);

  return (
    <>
      <div className="text-white mx-auto max-w-md p-4 min-h-screen">
        <Spacer y={4} />
        <div className="flex justify-between items-center mb-2 w-full">
          <div className="flex items-center w-full ml-3">
            <span className="text-xl font-semibold flex-shrink-0">Limit</span>
          </div>
          <div className="flex space-x-2 mr-3">
            <Button
              className="bg-card border-1 border-cardBorder"
              isIconOnly
              variant="light"
              onClick={() => handleUpdateSwapButtonClick(estimateSwap)}
            >
              <div style={{ transform: `rotate(${isUpdateButtonIconRoating ? 360 : 0}deg)`, transition: '0.5s' }}>
                <SyncIcon size={16} className='mb-[1px]' />
              </div>
            </Button>
            <SettingsModal slippage={slippage} setSlippage={setSlippage} />
          </div>
        </div>

        <div className="border-1 border-cardBorder rounded-3xl bg-card">
          <SendInput/>

          {/* Разделитель со swap кнопкой */}
          <div className="flex items-center">
            <div className="flex-grow border-t border-cardBorder" />
            <div className="transform rotate-90">
              <Button
                isIconOnly
                variant="light"
                radius="full"
                onClick={handleSwap}
                className="border-cardBorder pb-1 border-2"
              >
                <div style={{ transform: `rotate(${isSwapButtonIconRoating ? 180 : 0}deg)`, transition: '0.2s' }}>
                  <ArrowSwitchIcon size={16}/>
                </div>
              </Button>
            </div>
            <div className="flex-grow border-t border-cardBorder" />
          </div>

          <div className="min-h-[130px]">
            {receiveJetton ? (
              <>
                <ReceiveInput/>
                {sendAmount && receiveAmount && receiveAmount != 0 ? (
                  <>
                    <div className="border-t border-cardBorder" />
                    <SwapDetailsAccordion />
                  </>
                ) : null}
              </>
            ) : (
              <div className="px-5 pb-5 flex items-center justify-center w-full">
                <Button
                  variant="light"
                  className="mt-8"
                  onClick={() => openTokenSelectionModal(false)}
                >
                  <span className="text-lg font-semibold">Select a Token</span>
                </Button>
              </div>
            )}
          </div>
        </div>

        <Spacer y={3} />

        <ConfirmSwapModal/>
        <TokenSelectionModal/>
      </div>

      < Footer />
    </>
  );
}
