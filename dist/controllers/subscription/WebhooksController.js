var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/subscription/WebhooksController.ts
var WebhooksController_exports = {};
__export(WebhooksController_exports, {
  WebhooksController: () => WebhooksController
});
module.exports = __toCommonJS(WebhooksController_exports);

// src/ultis/stripe.ts
var import_stripe = __toESM(require("stripe"));
var stripe = new import_stripe.default(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: "2022-11-15",
    appInfo: {
      name: "barberpro",
      version: "1"
    }
  }
);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/ultis/manageSubscription.ts
async function saveSubscription(subscriptionId, customerId, createAction = false, deleteAction = false) {
  const findUser = await prisma_default.user.findFirst({
    where: {
      stripe_customer_id: customerId
    },
    include: {
      subscriptions: true
    }
  });
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    userId: findUser.id,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id
  };
  if (createAction) {
    console.log(subscriptionData);
    try {
      await prisma_default.subscription.create({
        data: subscriptionData
      });
    } catch (err) {
      console.log("ERRO CREATE");
      console.log(err);
    }
  } else {
    if (deleteAction) {
      await prisma_default.subscription.delete({
        where: {
          id: subscriptionId
        }
      });
      return;
    }
    try {
      await prisma_default.subscription.update({
        where: {
          id: subscriptionId
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id
        }
      });
    } catch (err) {
      console.log("ERRO UPDATE HOOK");
      console.log(err);
    }
  }
}

// src/controllers/subscription/WebhooksController.ts
var WebhooksController = class {
  async handle(request, response) {
    let event = request.body;
    const signature = request.headers["stripe-signature"];
    let endpointSecret = "whsec_d7ebe22e128eedac1949291c0916a275f89fd9f981640f03851a6425a1d5b0a9";
    if (endpointSecret) {
      try {
        event = stripe.webhooks.constructEvent(request.body, signature, endpointSecret);
      } catch (err) {
        return response.status(400).send(`Wehook error: ${err.message}`);
      }
    }
    switch (event.type) {
      case "customer.subscription.deleted":
        const payment = event.data.object;
        await saveSubscription(
          payment.id,
          payment.customer.toString(),
          false,
          true
        );
        break;
      case "customer.subscription.updated":
        const paymentIntent = event.data.object;
        await saveSubscription(
          paymentIntent.id,
          paymentIntent.customer.toString(),
          false
        );
        break;
      case "checkout.session.completed":
        const checkoutSession = event.data.object;
        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true
        );
        break;
      default:
        console.log(`Evento desconhecido ${event.type}`);
    }
    response.send();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WebhooksController
});
