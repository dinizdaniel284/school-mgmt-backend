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
    // Rotas limpas padrão para SPAs em Vite/React Router
    const mockPermissions = {
      menus: [
        {
          id: 1,
          name: "Dashboard",
          path: "/dashboard", 
          slug: "dashboard",
          type: "MENU",
          method: "GET",
          icon: "dashboard",
          hierarchy_id: 1,
          children: []
        },
        {
          id: 2,
          name: "Users",
          path: "/users",
          slug: "users",
          type: "MENU",
          method: "GET",
          icon: "users",
          hierarchy_id: 2,
          children: []
        }
      ],
      apis: [
        "GET /api/v1/dashboard", 
        "GET /api/v1/users", 
        "GET /api/v1/access-controls/me"
      ],
      uis: [
        "dashboard-view", 
        "users-view"
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