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

// src/services/haircut/CountHaircutsService.ts
var CountHaircutsService_exports = {};
__export(CountHaircutsService_exports, {
  CountHaircutsService: () => CountHaircutsService
});
module.exports = __toCommonJS(CountHaircutsService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/haircut/CountHaircutsService.ts
var CountHaircutsService = class {
  async execute({ user_id }) {
    const count = await prisma_default.haircut.count({
      where: {
        user_id
      }
    });
    return count;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CountHaircutsService
});
