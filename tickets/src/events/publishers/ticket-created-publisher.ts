import { Publisher, TicketCreatedEvent, Subjects } from "@liverattickets/common";
// s
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

