const errorHandler = (res, text, error) => {
    res.status(500).json({
        success: false,
        message: error.message ? text + error.message : text + error
    })
};

export default errorHandler;