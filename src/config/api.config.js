const DOMAIN = 'http://localhost:8080'

const API = {
    login: DOMAIN + '/login',
    change_password: DOMAIN + '/user/change-password',
    get_material_type_list_pagination: DOMAIN + '/material-type/list',
    get_material_type_list: DOMAIN + '/material-type/list-without-pagination',
    update_material_type_name: DOMAIN + '/material-type/update',
    update_material_type_status: DOMAIN + '/material-type/able',
    add_material_type: DOMAIN + '/material-type/add',
    get_material_list_pagination: DOMAIN + '/material/list',
    get_material_list_pagination_like: DOMAIN + '/material/search-like',
    get_material_with_template_status: DOMAIN + '/material/list-with-template-status',
    get_material_with_template_status_like: DOMAIN + '/material/list-with-template-status-like',
    add_material: DOMAIN + '/material/add',
    update_material: DOMAIN + '/material/update',
    update_material_status: DOMAIN + '/material/able',
    list_template_pagination: DOMAIN + '/template/list-template-pagination',
    add_template: DOMAIN + '/template/add-template',
    update_template: DOMAIN + '/template/update-template',
    delete_template: DOMAIN + '/template/delete-template',
    list_template_config_pagination: DOMAIN + '/template/list-template-config-pagination',
    list_template_config_pagination_like: DOMAIN + '/template/list-template-config-pagination-like',
    add_template_config: DOMAIN + '/template/add-template-config',
    update_template_config: DOMAIN + '/template/update-template-config',
    delete_template_config: DOMAIN + '/template/delete-template-config',
    download_template_excel: DOMAIN + '/template/download',
    list_mission_pagination: DOMAIN + '/mission/list-pagination'
}

export {
    API
}