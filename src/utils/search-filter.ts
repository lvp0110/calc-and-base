export const searchFilter = (list, searchQuery, param = "name") => {
    return list.filter((item) => item[param].toLowerCase().includes(searchQuery))
}