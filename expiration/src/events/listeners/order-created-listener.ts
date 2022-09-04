import { Listener, OrderCreatedEvent, OrderStatus, Subjects } from "@liverattickets/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: { id: string; version: number; status: OrderStatus; userId: string; expiresAt: string; ticket: { id: string; price: number; }; }, msg: Message) {
    await expirationQueue.add({
      orderId: data.id
    });

    msg.ack();
  }
}