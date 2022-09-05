import { natsWrapper } from "../../../nats-wrapper";
import {OrderCreatedListener} from '../order-created-listener';
import { Message } from "node-nats-streaming";
import { Listener, OrderCreatedEvent, OrderStatus } from "@liverattickets/common";
import mongoose from "mongoose";
import { Order } from "../../../models/order";

const setup = async() => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: 'sbhuashb',
    userId: 'shuih',
    status: OrderStatus.Created,
    ticket: {
      id: 'jijunui',
      price: 90
    }
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg };
}

it('replicates he order info', async () => {
  const { listener, data, msg} = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id)

  expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { listener, data, msg} = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
})