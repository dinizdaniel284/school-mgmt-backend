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
    // 🎯 O Objeto estruturado exatamente como o front gringo mapeia internamente
    const permissionsData = {
      menus: [
        {
          id: 1,
          name: "Dashboard",
          path: "/app/dashboard",
          icon: "dashboard",      
          hierarchy_id: 1,
          parentId: null,
          is_active: true
        },
        {
          id: 2,
          name: "Classes",
          path: "/app/classes",
          icon: "school",         
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
        "classes-view",
        "dashboard",
        "classes"
      ]
    };

    // 👑 SE ENCAIXAR NO PADRÃO AXIOS (response.data.permissions) OU DIRETO NA RAIZ
    return res.status(200).json({
      permissions: permissionsData,
      menus: permissionsData.menus,
      apis: permissionsData.apis,
      uis: permissionsData.uis
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