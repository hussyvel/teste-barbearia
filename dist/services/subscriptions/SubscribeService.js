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

// src/services/subscriptions/SubscribeService.ts
var SubscribeService_exports = {};
__export(SubscribeService_exports, {
  SubscribeService: () => SubscribeService
});
module.exports = __toCommonJS(SubscribeService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/subscriptions/SubscribeService.ts
var import_stripe = __toESM(require("stripe"));
var SubscribeService = class {
  async execute({ user_id }) {
    const stripe = new import_stripe.default(
      process.env.STRIPE_API_KEY,
      {
        apiVersion: "2022-11-15",
        appInfo: {
          name: "barberpro",
          version: "1"
        }
      }
    );
    const findUser = await prisma_default.user.findFirst({
      where: {
        id: user_id
      }
    });
    let customerId = findUser.stripe_customer_id;
    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email
      });
      await prisma_default.user.update({
        where: {
          id: user_id
        },
        data: {
          stripe_customer_id: stripeCustomer.id
        }
      });
      customerId = stripeCustomer.id;
    }
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      billing_address_collection: "required",
      line_items: [
        { price: process.env.STRIPE_PRICE, quantity: 1 }
      ],
      mode: "subscription",
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    });
    return { sessionId: stripeCheckoutSession.id };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SubscribeService
});
