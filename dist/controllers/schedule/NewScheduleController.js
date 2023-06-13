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

// src/controllers/schedule/NewScheduleController.ts
var NewScheduleController_exports = {};
__export(NewScheduleController_exports, {
  NewScheduleController: () => NewScheduleController
});
module.exports = __toCommonJS(NewScheduleController_exports);

// src/prisma/index.ts
var import_client = require("@prisma/client");
var prismaClient = new import_client.PrismaClient();
var prisma_default = prismaClient;

// src/services/schedule/NewScheduleService.ts
var NewScheduleService = class {
  async execute({ user_id, haircut_id, customer }) {
    if (customer === "" || haircut_id === "") {
      throw new Error("Error schedule new service.");
    }
    const schedule = await prisma_default.service.create({
      data: {
        customer,
        haircut_id,
        user_id
      }
    });
    return schedule;
  }
};

// src/controllers/schedule/NewScheduleController.ts
var NewScheduleController = class {
  async handle(req, res) {
    const { customer, haircut_id } = req.body;
    const user_id = req.user_id;
    const newShedule = new NewScheduleService();
    const schedule = await newShedule.execute({
      user_id,
      haircut_id,
      customer
    });
    return res.json(schedule);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NewScheduleController
});
