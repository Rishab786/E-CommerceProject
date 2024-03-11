import amqp from "amqplib";
import { QUEUE_NAME, EXCHANGE_NAME, BINDING_KEY } from "../src/config.js";

async function createChannel() {
  try {
    const connection = await amqp.connect();
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "direct", false);
    return channel;
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

async function publishMessage(channel, message) {
  try {
    await channel.assertQueue(QUEUE_NAME);
    await channel.publish(EXCHANGE_NAME, BINDING_KEY, Buffer.from(message));
  } catch (error) {
    console.error("Error while publishing message:", error);
  }
}
const channel = await createChannel();

export { publishMessage, channel };
