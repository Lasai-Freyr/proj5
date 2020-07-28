let storageEngine = localStorage;

function get(item) { //fonction récupération d'un objet en sauvegarde locale

    if (storageEngine.getItem(item)) {
        return JSON.parse(storageEngine.getItem(item));
    }
    return null
}

function store(name, value) {//fonction d'ajout d'un objet en sauvegarde locale
    storageEngine.setItem( name, JSON.stringify(value));
}

function remove(name) {
    storageEngine.removeItem(name);
}