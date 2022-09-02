import { Publisher, OrderCreatedEvent, Subjects } from "@liverattickets/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
