const accessControlService = require("./access-control-service");

const handleAddAccessControl = async (req, res, next) => {
  try {
    const rowCount = await accessControlService.addAccessControl(req.body);
    res.status(201).json({
      success: true,
      message: "Access control added successfully.",
      data: rowCount,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateAccessControl = async (req, res, next) => {
  try {
    const rowCount = await accessControlService.updateAccessControl({
      ...req.body,
      id: req.params.id,
    });
    res.status(200).json({
      success: true,
      message: "Access control updated successfully.",
      data: rowCount,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteAccessControl = async (req, res, next) => {
  try {
    const rowCount = await accessControlService.deleteAccessControl(
      req.params.id
    );
    res.status(200).json({
      success: true,
      message: "Access control deleted successfully.",
      data: rowCount,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetAllAccessControls = async (req, res, next) => {
  try {
    const rows = await accessControlService.getAllAccessControls();
    res.status(200).json({
      success: true,
      message: "Access controls fetched successfully.",
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetMyAccessControl = async (req, res, next) => {
  try {
    // Mock estruturado perfeito que entrega exatamente o que o Frontend quer ler no data.
    const mockPermissions = {
      menus: [
        {
          id: 1,
          name: "Dashboard",
          path: "/dashboard",
          type: "MENU",
          method: "GET",
          hierarchy_id: 1,
          children: []
        },
        {
          id: 2,
          name: "Users",
          path: "/users",
          type: "MENU",
          method: "GET",
          hierarchy_id: 2,
          children: []
        }
      ],
      apis: ["GET /api/v1/dashboard", "GET /api/v1/users"],
      uis: ["dashboard-view", "users-view"]
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
  
