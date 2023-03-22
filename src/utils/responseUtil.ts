import { Response } from 'express'

class ResponseUtil {
    static statusCode: number;
    static message: string
    static data: any
    static type: string

    static handleSuccess(statusCode: number, message: string, data: any) {
      this.statusCode = statusCode
      this.message = message
      this.data = data
      this.type = 'success'
    }

    static handleError(statusCode: number, message: string) {
      this.statusCode = statusCode
      this.message = message
      this.type = 'error'
    }
    
    static response(res: Response) {
      if (this.type === 'success') {
        return res.status(this.statusCode).json({
          status: this.statusCode,
          message: this.message,
          data: this.data,
        })
      }

      return res.status(this.statusCode).json({
        status: this.statusCode,
        message: this.message,
      })
    }
  }

  export default ResponseUtil