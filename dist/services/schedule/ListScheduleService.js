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

// src/services/schedule/ListScheduleService.ts
var ListScheduleService_exports = {};
__export(ListScheduleService_exports, {
  ListScheduleService: () => ListScheduleService
});
module.exports = __toCommonJS(ListScheduleService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/schedule/ListScheduleService.ts
var ListScheduleService = class {
  async execute({ user_id }) {
    const shedule = await prisma_default.service.findMany({
      where: {
        user_id
      },
      select: {
        id: true,
        customer: true,
        haircut: true
      }
    });
    return shedule;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ListScheduleService
});
