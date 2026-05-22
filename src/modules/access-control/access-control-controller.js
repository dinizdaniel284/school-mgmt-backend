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
    // Sincronização cirúrgica com o arquivo de rotas do Frontend
    const mockPermissions = {
      menus: [
        {
          id: 1,
          name: "Dashboard",
          path: "/app", 
          slug: "", // Deixado vazio para o frontend não concatenar /app/dashboard incorretamente
          type: "MENU",
          method: "GET",
          icon: "dashboard",
          hierarchy_id: 1,
          children: []
        },
        {
          id: 2,
          name: "Classes", 
          path: "/app/classes", 
          slug: "classes",
          type: "MENU",
          method: "GET",
          icon: "users",
          hierarchy_id: 2,
          children: []
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
    };

    res.status(200).json({
      success: true,
      message: "Permissions fetched successfully.",
      data: mockPermissions,
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