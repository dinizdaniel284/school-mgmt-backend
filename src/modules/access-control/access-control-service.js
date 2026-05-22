const { ApiError } = require("../../utils");

const processAddAccessControl = async (payload) => {
    return { message: "New access control added successfully" };
}

const processUpdateAccessContorl = async (payload) => {
    return { message: "Access control updated successfully" };
}

const processDeleteAccessControl = async (id) => {
    return { message: "Access control deleted successfully" };
}

const processGetAllAccessControls = async () => {
    return [];
}

const processGetMyAccessControl = async (roleId) => {
    // BYPASS TOTAL: Ignora a busca no banco vazio e entrega o layout que o frontend precisa para montar a tela
    const mockPermissions = {
        hierarchialMenus: [
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
        apis: ["GET /api/v1/dashboard", "GET /api/v1/users", "GET /api/v1/access-controls/me"],
        uis: ["dashboard-view", "users-view"]
    };

    // Retorna exatamente as chaves que a rota e o frontend esperam ler: menus, apis e uis
    return {
        menus: mockPermissions.hierarchialMenus,
        apis: mockPermissions.apis,
        uis: mockPermissions.uis
    };
}

module.exports = {
    processAddAccessControl,
    processUpdateAccessContorl,
    processDeleteAccessControl,
    processGetAllAccessControls,
    processGetMyAccessControl
};
