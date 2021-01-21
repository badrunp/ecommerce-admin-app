const urlPath =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://duosdev-rest-server.herokuapp.com";

export const baseUrl = "https://duosdev-rest-server.herokuapp.com";

export const baseUrlImage = (image) => {
  return `${baseUrl}/${image}`;
};
