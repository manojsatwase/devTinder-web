// production
// export const BASE_URL = "/api";

// development
//export const BASE_URL = "http://localhost:3000";

export const BASE_URL = location.hostname === "localhost" ? "http://localhost:3000" : "/api";

export const capitalFirstLetter = (str) => str?.slice(0,1).toUpperCase() + str?.slice(1); 
