class AppError extends Error {
  statusCode: number
  isOperational: boolean
  status: string

  constructor(errorMessage: string, statusCode: number) {
    super(errorMessage)

    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
