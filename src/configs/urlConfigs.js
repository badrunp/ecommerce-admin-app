
const urlPath = location.hostname === "localhost" ? "http://localhost:4000" : "https://duosdev-rest-server.herokuapp.com"


export const baseUrl = urlPath;

export const baseUrlImage = (image) => {
    return `${urlPath}/${image}`
}