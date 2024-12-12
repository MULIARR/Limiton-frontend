import React from 'react';
import { QuestionIcon, TrashIcon } from "@primer/octicons-react";
import { Popover, PopoverTrigger, PopoverContent, Button, Spacer, Link } from "@nextui-org/react";
// import GeckoTerminalLogo from '../../../assets/GeckoTerminal';
import useOrder from './useOrder';

const Order = ({ order: { order_id, send_amount, send_token_metadata, receive_amount, receive_token_metadata, minimum_to_receive_amount, slippage }, onOrderDeleted }) => {
  const { deleteOrder, isSuccess } = useOrder();

  const handleDelete = () => {
    deleteOrder(order_id, {
      onSuccess: () => {
        if (onOrderDeleted) {
          onOrderDeleted(order_id);
        }
      }
    });
  };

  return (
    <div className="text-white px-4 pb-4 rounded-lg">
      <h2 className="text-md font-semibold mb-2">Order details</h2>
      <div className="flex justify-between">
        <p className="text-normalGray">Send</p>
        <p>{send_amount} {send_token_metadata?.symbol}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-normalGray">Receive</p>
        <p>{receive_amount} {receive_token_metadata?.symbol}</p>
      </div>
      <div className="flex justify-between">
        <Popover placement="top" showArrow={true} color="foreground" backdrop="transparent">
          <PopoverTrigger>
            <p className="text-normalGray">
              Max. slippage <QuestionIcon size={16} />
            </p>
          </PopoverTrigger>
          <PopoverContent>
              <p className="text-base">
                If the amount received from the swap
                changes unfavorably by more than {slippage}%
                during order execution, the order will
                be canceled.
              </p>
            </PopoverContent>
        </Popover>
        <p className="text-red-500">{slippage}%</p>
      </div>
      <div className="flex justify-between">
        <p className="text-normalGray">Minimum received</p>
        <p>{minimum_to_receive_amount} {receive_token_metadata?.symbol}</p>
      </div>
      <Spacer y={3} />

      <div className="flex justify-between">
        <Button className="bg-gradient-to-tr from-[#6b21a8] via-[#3457c9] to-[#272727] text-white shadow-lg"
          href="https://github.com/nextui-org/nextui"
          as={Link}
          showAnchorIcon
          variant="solid"
        >
          GeckoTerminal
        </Button>
        <Button isIconOnly color="danger" aria-label="Delete" onPress={handleDelete}>
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Order;
