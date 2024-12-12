import React from "react";
import { useMutation } from 'react-query';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Avatar, Popover, PopoverTrigger, PopoverContent, Spacer } from "@nextui-org/react";
import { QuestionIcon } from "@primer/octicons-react";
import useUserStore from "../../../App/useUserStore";
import { createOrder } from '../../../api/services/ordersService';
import useSwapStore from "../store/useSwapStore";

export default function ConfirmSwapModal() {
  const { user } = useUserStore();
  const {
    isMainSwapButtonDisabled, getMainSwapButtonText,
    sendJetton, receiveJetton,
    sendAmount, receiveAmount,
    sendAmountRate, receiveAmountRate,
    slippage, minimumReceived, profit, profitInUSD,
    isOrderDataReady
  } = useSwapStore();
  
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const orderDataReady = isOrderDataReady();

  const orderData = {
    user_id: user.id,

    send_amount: Number(sendAmount),
    send_token_address: sendJetton?.address,
    send_token_symbol: sendJetton?.symbol,
    send_token_decimals: sendJetton?.decimals,
    send_token_image: sendJetton?.image,

    receive_amount: Number(receiveAmount),
    receive_token_address: receiveJetton?.address,
    receive_token_symbol: receiveJetton?.symbol,
    receive_token_decimals: receiveJetton?.decimals,
    receive_token_image: receiveJetton?.image,

    minimum_to_receive_amount: Number(minimumReceived),
    slippage: slippage,
    profit_in_usd: profitInUSD
  };

  const { mutate: create } = useMutation(() => createOrder(orderData));

  return (
    <div className="flex justify-center w-full">
      <Button
        radius="full"
        color="primary"
        size="lg"
        className={isMainSwapButtonDisabled() ? "w-full h-14 bg-opacity-35 text-opacity-35" : "w-full h-14"}
        disabled={isMainSwapButtonDisabled()}
        onPress={onOpen}
      >
        <span className="font-semibold">{getMainSwapButtonText()}</span>
      </Button>
        
      {orderDataReady && (
        <Modal
          isOpen={isOpen}
          size="sm"
          className="bg-modal text-white rounded-3xl mx-3"
          onOpenChange={onOpenChange}
          isDismissable={true}
          isKeyboardDismissDisabled={true}
          backdrop="blur"
          placement="center"
        >
          <ModalContent>
            <ModalHeader className="flex text-xl">Confirm limit order</ModalHeader>
            <ModalBody className="gap-1">
              <div className="flex justify-between text-normalGray">
                <p>You send</p>
                <p>{sendAmountRate}$</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center rounded-full p-1 pr-4 bg-modalElement text-white">
                  <span className="pr-3"><Avatar src={sendJetton.image} /></span>
                  <p className="font-semibold text-lg">{sendJetton.symbol}</p>
                </div>
                <div className="text-2xl font-semibold">
                  {sendAmount}
                </div>
              </div>

              <span className="block border-b-1 border-cardBorder my-3" />

              <div className="flex justify-between text-normalGray">
                <p>You receive</p>
                <p>{receiveAmountRate}$</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center rounded-full p-1 pr-4 bg-modalElement text-white">
                  <span className="pr-3"><Avatar src={receiveJetton.image} /></span>
                  <p className="font-semibold text-lg p-0">{receiveJetton.symbol}</p>
                </div>
                <div className="text-2xl font-semibold">
                  {receiveAmount}
                </div>
              </div>

              <span className="block border-b-1 border-cardBorder my-3" />
              <div className="flex justify-between">
                <Popover placement="top" showArrow={true} color="foreground" backdrop="transparent">
                  <PopoverTrigger>
                    <p className="text-normalGray">
                      Max. slippage <QuestionIcon size={16} />
                    </p>
                  </PopoverTrigger>
                  <PopoverContent className="p-3">
                    <p className="text-base">
                      If the amount received from the swap changes unfavorably by more than {slippage}%
                      during order execution, the order will be canceled.
                    </p>
                  </PopoverContent>
                </Popover>
                <p>{slippage}%</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-normalGray">Minimum received</p>
                <p>{minimumReceived} {receiveJetton.symbol}</p>
              </div>

              <Spacer y={1} />
              {profit && profit.includes('+') && (
                <div className="flex justify-between font-semibold text-lg">
                  <p className="text-lightGray">Profit</p>
                  <p className="text-customGreen"> 
                    <span className="underline">{profitInUSD}</span>$ ({profit})
                  </p>
                </div>
              )}

              <Button
                radius="xl"
                color="primary"
                size="lg"
                className="w-full h-12 mt-4"
                onPress={create}
              >
                <span className="font-semibold">Place limit order</span>
              </Button>
            </ModalBody>
            <Spacer y={3} />
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
