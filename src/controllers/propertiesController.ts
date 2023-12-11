import { Request, Response } from 'express'

const getProperties = async (req: Request, res: Response) => {
  console.log(req.headers)
  res.status(200).json({})
}

export { getProperties }
