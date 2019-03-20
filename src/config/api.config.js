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
    add_material: DOMAIN + '/material/add',
    update_material: DOMAIN + '/material/update',
    update_material_status: DOMAIN + '/material/able',
}

export {
    API
}