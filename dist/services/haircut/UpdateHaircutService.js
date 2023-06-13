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

// src/services/haircut/UpdateHaircutService.ts
var UpdateHaircutService_exports = {};
__export(UpdateHaircutService_exports, {
  UpdateHaircutService: () => UpdateHaircutService
});
module.exports = __toCommonJS(UpdateHaircutService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/haircut/UpdateHaircutService.ts
var UpdateHaircutService = class {
  async execute({ user_id, haircut_id, name, price, status = true }) {
    const user = await prisma_default.user.findFirst({
      where: {
        id: user_id
      },
      include: {
        subscriptions: true
      }
    });
    if (user?.subscriptions?.status !== "active") {
      throw new Error("Not authorized");
    }
    const haircut = await prisma_default.haircut.update({
      where: {
        id: haircut_id
      },
      data: {
        name,
        price,
        status: status === true ? true : false
      }
    });
    return haircut;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateHaircutService
});
