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
    // Retornando a string idêntica extraída pelo matchedRoute[1].route.path do frontend
    const mockPermissions = {
      menus: [
        {
          id: 1,
          name: "Dashboard",
          path: "dashboard", // String pura relativa para bater com o layout gringo
          fullPath: "/app/dashboard",
          route: "dashboard",
          slug: "dashboard",
          permission: "dashboard",
          resource: "dashboard",
          type: "MENU",
          role: "ADMIN",
          icon: "LayoutDashboard",
          hierarchy_id: 1,
          order: 1,
          parentId: null,
          is_active: true,
          visible: true,
          children: []
        },
        {
          id: 2,
          name: "Classes",
          path: "classes", // String pura relativa para bater com o layout gringo
          fullPath: "/app/classes",
          route: "classes",
          slug: "classes",
          permission: "classes",
          resource: "classes",
          type: "MENU",
          role: "ADMIN",
          icon: "School",
          hierarchy_id: 2,
          order: 2,
          parentId: null,
          is_active: true,
          visible: true,
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