var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/services/haircut/CheckSubscriptionService.ts
var CheckSubscriptionService_exports = {};
__export(CheckSubscriptionService_exports, {
  CheckSubscriptionService: () => CheckSubscriptionService
});
module.exports = __toCommonJS(CheckSubscriptionService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/haircut/CheckSubscriptionService.ts
var CheckSubscriptionService = class {
  async execute({ user_id }) {
    const status = await prisma_default.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        subscriptions: {
          select: {
            id: true,
            status: true
          }
        }
      }
    });
    return status;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CheckSubscriptionService
});
