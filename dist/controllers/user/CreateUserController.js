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

// src/controllers/user/CreateUserController.ts
var CreateUserController_exports = {};
__export(CreateUserController_exports, {
  CreateUserController: () => CreateUserController
});
module.exports = __toCommonJS(CreateUserController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/user/CreateUserService.ts
var import_bcryptjs = require("bcryptjs");
var CreateUserService = class {
  async execute({ name, email, password }) {
    if (!email) {
      throw new Error("Email incorreto");
    }
    const userAlreadyExists = await prisma_default.user.findFirst({
      where: {
        email
      }
    });
    if (userAlreadyExists) {
      throw new Error("User/Email already exists");
    }
    const passwordHash = await (0, import_bcryptjs.hash)(password, 8);
    const user = await prisma_default.user.create({
      data: {
        name,
        email,
        password: passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    return { user };
  }
};

// src/controllers/user/CreateUserController.ts
var CreateUserController = class {
  async handle(req, res) {
    const { name, email, password } = req.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name,
      email,
      password
    });
    return res.json({ user, ok: "deu certo" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateUserController
});
