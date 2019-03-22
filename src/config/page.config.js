const PAGE = {
    INDEX: '/',
    MATERIAL_TYPE: '/marterial/marterial-type',
    MATERIAL: '/material/material',
    TEMPLATE: '/template'
}

const getHeaderKeyByUrl = (url) => {
    switch (url) {
        case PAGE.INDEX: {
            return "1";
        }
        case PAGE.MATERIAL_TYPE: {
            return "2";
        }
        case PAGE.MATERIAL:{
            return "3";
        }
        case PAGE.TEMPLATE:{
            return "4";
        }
        default: {
            return "1";
        }
    }
}

export { PAGE, getHeaderKeyByUrl }