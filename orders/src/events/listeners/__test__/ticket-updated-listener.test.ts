import mongoose from "mongoose";
import { TicketUpdatedEvent } from "@liverattickets/common";
import { TicketUpdatedListener } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);

  const ticket = await Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Rap Sess",
    price: 0,
  });
  await ticket.save();

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "New concert",
    price: 999,
    userId: 'aisoijs'
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }
  return { msg, data, ticket, listener };
}

it('finds, updates, and saves a ticket', async () => {
  const { msg, data, ticket, listener } = await setup();
  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);

});


it('acknowledge the message', async () => {
  const { msg, data, ticket, listener } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if event skipped a version number', async () => {
  const { msg, data, ticket, listener } = await setup();

  data.version = 10
  try {
    await listener.onMessage(data, msg);
  } catch (err) {
  }

  expect(msg.ack).not.toHaveBeenCalled();
});
