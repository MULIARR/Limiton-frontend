import React from 'react';
import { Accordion, AccordionItem, Button, Chip, Avatar, AvatarGroup, Spacer } from "@nextui-org/react";
import { SyncIcon } from "@primer/octicons-react";
import Order from './Order/Order';
import useOrders from './useOrders';
import useUserStore from '../../App/useUserStore';
import Footer from "../../shared/components/Footer.jsx"

const Orders = () => {
  const { user } = useUserStore();
  const { orders, fetchOrders } = useOrders(user.id);

  const handleOrderDeleted = () => {
    fetchOrders();
  };

  return (
    <>
      {orders && orders.length > 0 ? (
        <>
        <div className='min-h-screen max-w-md mx-auto w-full p-4'>
        <Spacer y={4} />
          <div className="ml-3 mr-3 flex justify-between items-end">
            <div className="flex items-end text-xl">
              <span className="mr-1 font-semibold">Active Orders</span>
            </div>
            <Button className="bg-card border-1 border-cardBorder" isIconOnly variant="light" onClick={fetchOrders}>
              <SyncIcon size={16} />
            </Button>   
          </div>

          <Spacer y={2} />

          <Accordion variant="bordered" className="border-1 bg-card rounded-3xl">
            {orders.map((order, index) => (
              <AccordionItem 
                key={String(index)} 
                aria-label={`Accordion ${String(index)}`} 
                startContent={
                  <AvatarGroup>
                    <Avatar src={order.send_token_metadata.image} />
                    <Avatar src={order.receive_token_metadata.image} />
                  </AvatarGroup>
                }
                subtitle={
                  <>
                    <Chip size="sm" color={order.type === 'Sell' ? 'danger' : 'primary'}>
                      <span>Limit</span>
                    </Chip>
                    <span>{order.profitInUSD}</span>
                  </>
                }
                title={
                  <span className="text-base font-semibold">{order.send_amount} {order.send_token_metadata.symbol} › {order.receive_amount} {order.receive_token_metadata.symbol}</span>
                }
              >
                <Order order={order} onOrderDeleted={handleOrderDeleted} />
              </AccordionItem>
            ))}
          </Accordion>
          </div>
        </>
      ) : (
        <p className="text-center pt-12 min-h-screen">You don't have any limit orders yet...</p>
      )}

      < Footer />
    </>
  );
}

export default Orders;
