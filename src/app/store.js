
export function createStore(name) {
    const store = {
        name,
        list: []
    }

    const addLibrary = function (library) {
        store.list.push(library)
    }

    const getList = function () {
        return store.list
    }

    const removeLibrary = function (library) {
        const newList = store.list.filter(item => item.getId() !== library.getId());
        store.list = newList
    }

    return {name, addLibrary, getList, removeLibrary}
}
