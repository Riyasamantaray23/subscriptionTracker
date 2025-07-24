/*Middleware is a function that has access to the following four parameters:
The four parameters are:
err – The error object (if any).
req – The request object.
res – The response object.
next – A function to pass control to the next middleware.
normal middleware -> has access to the request, response, and optionally the next function 
error-handling middleware->4 parameters ,Only runs when there’s an error passed with next(err)

if you throw an error directly or pass one using next(err), you need some centralized place to catch and responding with a proper message or status code thats what errorhandling middleware does.
we can handle the error in catch block but we have to write error status and all in every route so ww'll have to repeat same error handling logic everywhere.
middleware1 → middleware2 → handler → res.send() → ✅ Done
middleware1 → ❌ Error → next(err) → 🛑 Skips other middlewares → 🎯 Lands in error-handling middleware → sends error response
*/

const errorMiddleware =(err, req, res, next)=>{
    console.error("Error:", err);
    const statusCode =err.statusCode || 500;
    const message =err.message ||"Internal Server Error"

    //Handling specific Mongoose errors
    //Mongoose bad ObjectId
    if(err.name=== 'CastError'){
        const message ='Resource not found';
        error =new Error(message);
        error.statusCode =404; 
    }
    //Mongoose duplicate key
    if(err.code===11000){
        const message ='Duplicate field value entered';
        error =new Error(message);
        error.statusCode=400;
    }
    //Final response
    res.status(statusCode).json({
        success: false,
        message: message,
    });
    /* res.status sets the HTTP status code of he response
    res.json is a method in express used to send a response in JSON format */
};

module.exports = errorMiddleware;

