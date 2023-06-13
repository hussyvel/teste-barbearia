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

// src/services/user/AuthUserService.ts
var AuthUserService_exports = {};
__export(AuthUserService_exports, {
  AuthUserService: () => AuthUserService
});
module.exports = __toCommonJS(AuthUserService_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/AuthUserService.ts
var import_bcryptjs = require("bcryptjs");
var import_jsonwebtoken = require("jsonwebtoken");
var AuthUserService = class {
  async execute({ email, password }) {
    const user = await prisma_default.user.findFirst({
      where: {
        email
      },
      include: {
        subscriptions: true
      }
    });
    if (!user) {
      throw new Error("Email/password incorret");
    }
    const passwordMatch = await (0, import_bcryptjs.compare)(password, user?.password);
    if (!passwordMatch) {
      throw new Error("Email/password incorret");
    }
    const token = (0, import_jsonwebtoken.sign)(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "30d"
      }
    );
    return {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      endereco: user?.endereco,
      token,
      subscriptions: user.subscriptions ? {
        id: user?.subscriptions?.id,
        status: user?.subscriptions?.status
      } : null
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthUserService
});
