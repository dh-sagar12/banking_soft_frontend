import ApiHandler from "./APIHandlers";

const getBranches = () => {
    const APIHandlers  = new ApiHandler()
    return APIHandlers.get('/core/get_branches').then(data => data).catch(error => error)

}

export default getBranches