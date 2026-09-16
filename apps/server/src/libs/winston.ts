import { createLogger, format } from "winston";
import LokiTransport from "winston-loki";

const options = {
  format: format.json(),
  transports: [
    new LokiTransport({
      // Change the host with your ip to test localy
      host: "http://nebula-loki:3100",
      labels: { job: "nebula-server" },
      json: true,
      format: format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error("Loki connection error:", err),
    }),
  ],
};
export const logger = createLogger(options);
