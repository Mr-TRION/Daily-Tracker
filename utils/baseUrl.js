const baseUrl =
    process.env.NODE_ENV !== "production" ?
    "http://localhost:8000" :
    "https://eubrics-prakash-assignment.onrender.com";

module.exports = baseUrl;