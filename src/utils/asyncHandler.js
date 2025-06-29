// Promise based async handler for Express.js to handle errors in asynchronous route handlers
const asyncHandler = (requestHandler) => {
    (req, res, next)=>{
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((error)=>next(error)); // this will catch any error that occurs in the request handler  
    }
}



export {asyncHander};



// Try Catch method
// async handler is a higher order function that takes a function as an argument and returns a new function that handles errors in the original function
// fn is a function as an argument
// passed fn to another function that returns a new function
// const asyncHandler = (fn) => async (req, res, next) => {
//     try{
//         await fn(req, res, next); // await the function passed as argument  
//     } catch (error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || 'Internal Server Error',
//         })
//     }
// }