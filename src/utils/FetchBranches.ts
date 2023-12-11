import APIHandlers from "./APIHandlers";

const getBranches = () => {
    return APIHandlers.get('/core/get_branches').then(data => data).catch(error => error)

}

export default getBranches