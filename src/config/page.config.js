const PAGE = {
    INDEX: '/',
    MATERIAL_TYPE: '/marterial/marterial-type'
}

const getHeaderKeyByUrl = (url) => {
    switch (url) {
        case PAGE.INDEX: {
            return "1";
        }
        case PAGE.MATERIAL_TYPE: {
            return "2";
        }
        default: {
            return "1";
        }
    }
}

export { PAGE, getHeaderKeyByUrl }