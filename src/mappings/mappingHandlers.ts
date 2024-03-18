import { TransferEvent } from "../types";
import { CosmosEvent,} from "@subql/types-cosmos";

export async function handleEvent(event: CosmosEvent): Promise<void> {
  const eventRecord = TransferEvent.create({
    id: `${event.tx.hash}-${event.msg.idx}-${event.idx}`,
    blockHeight: BigInt(event.block.block.header.height),
    txHash: event.tx.hash,
    recipient: "",
    amount: "",
    sender: "",
    createdAt: event.block.block.header.time,
  });
  for (const attr of event.event.attributes) {
    switch (attr.key) {
      case "recipient":
        eventRecord.recipient = attr.value;
        break;
      case "amount":
        eventRecord.amount = attr.value;
        break;
      case "sender":
        eventRecord.sender = attr.value;
        break;
      default:
        break;
    }
  }
  await eventRecord.save();
}