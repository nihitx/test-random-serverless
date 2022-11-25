interface IResondReturn {
  statusCode: number,
  body: any,
  headers: { [key: string]: string; }
}
export const respond = (statusCode: number, body: any): IResondReturn => {
    return {statusCode : statusCode, body: JSON.stringify(body) , headers: {
        "Content-Type": "application/json"
      },};
}