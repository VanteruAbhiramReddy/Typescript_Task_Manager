import { Request,Response,NextFunction } from "express"
import { AsyncHandler } from "../types/express.types.js"

const asyncHandler = (fn:AsyncHandler) => {
  return (req: Request, res: Response, next:NextFunction):void => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
}

export default asyncHandler;