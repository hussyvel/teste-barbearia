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

// src/controllers/haircut/CreateHaircutController.ts
var CreateHaircutController_exports = {};
__export(CreateHaircutController_exports, {
  CreateHaircutController: () => CreateHaircutController
});
module.exports = __toCommonJS(CreateHaircutController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/haircut/CreateHaircutService.ts
var CreateHaircutService = class {
  async execute({ user_id, name, price }) {
    if (!name || !price) {
      throw new Error("Error");
    }
    const myHaircut = await prisma_default.haircut.count({
      where: {
        user_id
      }
    });
    const user = await prisma_default.user.findFirst({
      where: {
        id: user_id
      },
      include: {
        subscriptions: true
      }
    });
    if (myHaircut >= 3 && user?.subscriptions?.status !== "active") {
      throw new Error("Not authorized");
    }
    const haircut = await prisma_default.haircut.create({
      data: {
        name,
        price,
        user_id
      }
    });
    return haircut;
  }
};

// src/controllers/haircut/CreateHaircutController.ts
var CreateHaircutController = class {
  async handle(req, res) {
    const { name, price } = req.body;
    const user_id = req.user_id;
    const createHaircutService = new CreateHaircutService();
    const haircut = await createHaircutService.execute({
      user_id,
      name,
      price
    });
    return res.json(haircut);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateHaircutController
});
