exports.handler = async (event) => {
    const body = {
        info: "Hello from Deez Nutz",
        date: new Date(Date.now())
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    };
    return response;
};