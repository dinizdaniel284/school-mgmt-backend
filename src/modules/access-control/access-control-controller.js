const accessControlService = require("./access-control-service");

const handleAddAccessControl = async (req, res, next) => {
  try {
    const rowCount = await accessControlService.addAccessControl(req.body);
    res.status(201).json({ success: true, message: "Access control added successfully.", data: rowCount });
  } catch (error) { next(error); }
};

const handleUpdateAccessControl = async (req, res, next) => {
  try {
    const rowCount = await accessControlService.updateAccessControl({ ...req.body, id: req.params.id });
    res.status(200).json({ success: true, message: "Access control updated successfully.", data: rowCount });
  } catch (error) { next(error); }
};

const handleDeleteAccessControl = async (req, res, next) => {
  try {
    const rowCount = await accessControlService.deleteAccessControl(req.params.id);
    res.status(200).json({ success: true, message: "Access control deleted successfully.", data: rowCount });
  } catch (error) { next(error); }
};

const handleGetAllAccessControls = async (req, res, next) => {
  try {
    const rows = await accessControlService.getAllAccessControls();
    res.status(200).json({ success: true, message: "Access controls fetched successfully.", data: rows });
  } catch (error) { next(error); }
};

const handleGetMyAccessControl = async (req, res, next) => {
  try {
    // CORREÇÃO DETECTADA NO HOOK: O objeto de permissões precisa estar aninhado em 'permissions'!
    const mockPayload = {
      permissions: {
        menus: [
          {
            id: 1,
            name: "Dashboard",
            path: "dashboard", // String relativa exata obtida pelo matchRoutes do frontend
            icon: "LayoutDashboard",
            hierarchy_id: 1,
            parentId: null,
            is_active: true
          },
          {
            id: 2,
            name: "Classes",
            path: "classes", // String relativa exata obtida pelo matchRoutes do frontend
            icon: "School",
            hierarchy_id: 2,
            parentId: null,
            is_active: true
          }
        ],
        apis: [
          "GET /api/v1/dashboard",
          "GET /api/v1/classes",
          "GET /api/v1/access-controls/me"
        ],
        uis: [
          "dashboard-view",
          "classes-view"
        ]
      }
    };

    // Resposta envelopada no padrão estrito esperado pelo RTK Query / Redux do frontend gringo
    res.status(200).json({
      success: true,
      message: "Permissions fetched successfully.",
      data: mockPayload, // Quando o front ler 'data', vai encontrar '.permissions.menus' dentro!
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleAddAccessControl,
  handleUpdateAccessControl,
  handleDeleteAccessControl,
  handleGetAllAccessControls,
  handleGetMyAccessControl,
};