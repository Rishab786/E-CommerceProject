import amqp from "amqplib";
import express from "express";
import userConfirmationEmail from "./mail.js";
import { QUEUE_NAME, GRAPH_URL, PORT } from "./config.js";
const app = express();

async function consumeMessages() {
  try {
    const connection = await amqp.connect(GRAPH_URL);
    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE_NAME, { durable: true });

    channel.consume(QUEUE_NAME, (message) => {
      if (message !== null) {
        const data = message.content.toString();
        const email = JSON.parse(data).id;
        userConfirmationEmail(email);
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error("Error consuming messages:", error);
  }
}

consumeMessages().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

async function runServer() {
  try {
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  } catch (error) {
    console.log(error);
  }
}
runServer();
