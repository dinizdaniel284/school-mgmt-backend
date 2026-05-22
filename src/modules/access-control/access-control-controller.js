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
    // Usando um placeholder de imagem com CORS totalmente aberto para matar o erro de carregamento do front
    const safeIconPlaceholder = "https://placeholder.co/24";

    const permissionsData = {
      menus: [
        {
          id: 1,
          name: "Dashboard",
          path: "dashboard",
          icon: safeIconPlaceholder, // Evita string vazia e mata o 'undefined'
          hierarchy_id: 1,
          parentId: null,
          is_active: true
        },
        {
          id: 2,
          name: "Classes",
          path: "classes",
          icon: safeIconPlaceholder, // Evita string vazia e mata o 'undefined'
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
    };

    res.status(200).json({
      success: true,
      message: "Permissions fetched successfully.",
      permissions: permissionsData,
      data: {
        permissions: permissionsData
      }
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