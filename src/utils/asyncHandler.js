// declare async handler by two ways (1)use promise (2)use try catch

//higher order function : function in which it take funcion as parameter
//syntax : const asyncHandler = (fn) => () => {} - is same as - const asyncHandler = (fn) => { () => {} }

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))
        .catch((error) => next(error))
    }
}

export { asyncHandler } 

/*
//try-catch demo

    const asyncHandler = (requestHandler) => {
        async (req, res, next) => {
            try {
                await requestHandler(req, res, next)
            } catch (error) {
                res.status(error.code || 500).json({
                    success: false,
                    message: error.message
                })
            }
        }
    }
    export { asyncHandler };
*/