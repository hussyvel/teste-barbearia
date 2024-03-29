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

// src/controllers/haircut/DetailHaircutController.ts
var DetailHaircutController_exports = {};
__export(DetailHaircutController_exports, {
  DetailHaircutController: () => DetailHaircutController
});
module.exports = __toCommonJS(DetailHaircutController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/haircut/DetailHaircutService.ts
var DetailHaircutService = class {
  async execute({ haircut_id }) {
    const haircut = await prisma_default.haircut.findFirst({
      where: {
        id: haircut_id
      }
    });
    return haircut;
  }
};

// src/controllers/haircut/DetailHaircutController.ts
var DetailHaircutController = class {
  async handle(req, res) {
    const haircut_id = req.query.haircut_id;
    const detailHaircut = new DetailHaircutService();
    const haircut = await detailHaircut.execute({
      haircut_id
    });
    return res.json(haircut);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DetailHaircutController
});
