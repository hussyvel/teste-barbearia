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

// src/services/subscriptions/CreatePortalService.ts
var CreatePortalService_exports = {};
__export(CreatePortalService_exports, {
  CreatePortalService: () => CreatePortalService
});
module.exports = __toCommonJS(CreatePortalService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/subscriptions/CreatePortalService.ts
var import_stripe = __toESM(require("stripe"));
var CreatePortalService = class {
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
    let sessionId = findUser.stripe_customer_id;
    if (!sessionId) {
      console.log("Nao tem id");
      return { message: "User not found" };
    }
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL
    });
    return { sessionId: portalSession.url };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreatePortalService
});
