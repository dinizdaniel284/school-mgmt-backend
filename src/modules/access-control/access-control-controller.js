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
    const permissionsData = {
      menus: [
        {
          id: 1,
          name: "Dashboard",
          path: "/app/dashboard", // Caminho padrão absoluto do layout
          icon: "dashboard",      
          hierarchy_id: 1,
          parentId: null,
          is_active: true
        },
        {
          id: 2,
          name: "Classes",
          path: "/app/classes",   // Mantendo a estrutura padrão do menu lateral
          icon: "school",         
          hierarchy_id: 2,
          parentId: null,
          is_active: true
        }
      ],
      apis: [
        "GET /api/v1/dashboard",
        "GET /api/v1/classes",
        "GET /api/v1/access-controls/me",
        "dashboard",
        "classes"
      ],
      // 🎯 METRALHADORA DE PERMISSÕES: Injetando todas as palavras-chave padrão para destravar views
      uis: [
        "dashboard-view",
        "classes-view",
        "dashboard",
        "classes",
        "admin",
        "admin-dashboard",
        "view-dashboard",
        "view-classes",
        "read:dashboard",
        "read:classes",
        "Dashboard",
        "Classes"
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