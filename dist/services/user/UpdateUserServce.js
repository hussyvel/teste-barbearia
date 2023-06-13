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

// src/services/user/UpdateUserServce.ts
var UpdateUserServce_exports = {};
__export(UpdateUserServce_exports, {
  UpdateUserService: () => UpdateUserService
});
module.exports = __toCommonJS(UpdateUserServce_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/UpdateUserServce.ts
var UpdateUserService = class {
  async execute({ user_id, name, endereco }) {
    try {
      const userAlreadyExists = await prisma_default.user.findFirst({
        where: {
          id: user_id
        }
      });
      if (!userAlreadyExists) {
        throw new Error("User not exists!");
      }
      const userUpdate = await prisma_default.user.update({
        where: {
          id: user_id
        },
        data: {
          name,
          endereco
        },
        select: {
          name: true,
          email: true,
          endereco: true
        }
      });
      return userUpdate;
    } catch (err) {
      console.log(err);
      throw new Error("Error an update the user!");
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateUserService
});
