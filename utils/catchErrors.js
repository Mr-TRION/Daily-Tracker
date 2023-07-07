const catchErrors = error => {
    let errorMsg;

    if (error.response) {
        errorMsg = error.response.data;
        console.error(errorMsg);
    } else if (error.request) {
        errorMsg = error.request;

        console.error(errorMsg);
    } else {
        errorMsg = error.message;
    }
    return errorMsg;
};

export default catchErrors;