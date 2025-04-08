import { isValidObjectId } from "mongoose"; 

function checkId(req, res, next) {
  // Check if the id in the request parameters is a valid ObjectId
  if (!isValidObjectId(req.params.id)) {
    res.status(404); 
    // Throw an error indicating the invalid ObjectId
    throw new Error(`Invalid Object Of: ${req.params.id}`);
  }
  next(); 
}

export default checkId; 
