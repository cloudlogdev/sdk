const fetch = require("node-fetch");
const awsIot = require("aws-iot-device-sdk");
const { v4: uuidv4 } = require("uuid");

const METHODS = [
  "log",
  "warn",
  "info",
  "error",
  "dir",
  "debug",
  "dirxml",
  "table",
  "count",
  "countReset",
  "exception",
  "time",
  "timeEnd",
  "group",
  "groupEnd"
];
let AWSIOTCLIENT;
let TOPIC;
let BUFFER = [];
let REFERENCE = {};
let USER, PROJECT;

function mapToBuffer() {
  METHODS.map(type => {
    REFERENCE[type] = console[type];
    console[type] = payload => {
      BUFFER.push({ type: type, payload: payload });
    };
  });
}
function mapToConsole() {
  METHODS.map(type => {
    console[type] = REFERENCE[type];
  });
}

function mapToProcessing() {
  METHODS.map(type => {
    console[type] = payload => {
      processing({ type: type, payload: payload });
    };
  });
}

function sessionId() {
  if (typeof sessionStorage === "undefined") return `session-${uuidv4()}`;
  if (!sessionStorage.getItem("cloudlogSessionId")) {
    sessionStorage.setItem("cloudlogSessionId", `session-${uuidv4()}`);
  }

  return sessionStorage.getItem("cloudlogSessionId");
}

function clientId() {
  if (typeof localStorage === "undefined") return `client-${uuidv4()}`;
  if (!localStorage.getItem("cloudlogClientId")) {
    localStorage.setItem("cloudlogClientId", `client-${uuidv4()}`);
  }

  return localStorage.getItem("cloudlogClientId");
}

function requestId() {
  return `request-${uuidv4()}`;
}

const CLIENT = clientId();
const SESSION = sessionId();
const REQUEST = requestId();

function initializeIntern() {
  fetch(
    `${process.env.CLOUDLOG_API_URL ||
      "https://api.cloudlog.dev/v0"}/sdk-auth?user=${USER}&project=${PROJECT}`
  )
    .then(res => {
      if (!res.ok) {
        mapToConsole();
        throw new Error("cloudlog credentials wrong");
      }
      if (res.ok) {
        res.json();
      }
    })
    .then(iotKeys => {
      TOPIC = iotKeys.topic;
      AWSIOTCLIENT = awsIot.device({
        region: iotKeys.region,
        protocol: "wss",
        accessKeyId: iotKeys.accessKey,
        secretKey: iotKeys.secretKey,
        sessionToken: iotKeys.sessionToken,
        port: 443,
        host: iotKeys.iotEndpoint,
        autoResubscribe: true,
        offlineQueueing: true
      });
      AWSIOTCLIENT.on("connect", () => {});
      AWSIOTCLIENT.on("message", (topic, message) => {});
      AWSIOTCLIENT.on("close", () => {
        AWSIOTCLIENT.end();
      });

      processing({
        type: "init",
        payload: {
          headers: iotKeys.headers,
          identity: iotKeys.identity,
          geoip: iotKeys.geoip
        }
      });

      snackBuffer();
    });
}

function snackBuffer() {
  if (BUFFER.length === 0) {
    mapToProcessing();
    return;
  }
  const bite = BUFFER.shift();
  processing(bite);
  snackBuffer();
}

function processing(message) {
  message.session = SESSION;
  message.request = REQUEST;
  message.client = CLIENT;
  if (message.type !== "init") {
    REFERENCE[message.type](message.payload);
  }

  AWSIOTCLIENT.publish(TOPIC, JSON.stringify(message)); // send messages
}

module.exports.initialize = function(c, p, params = {}) {
  USER = c;
  PROJECT = p;
  if (!c || !p) {
    throw new Error("cloudlog credentials missing");
    return;
  }
  mapToBuffer();
  initializeIntern();
};
