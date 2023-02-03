import messages from './messages';
import { Response } from 'express';

export const apiResponse = (
  response: Response,
  status: number,
  messageCode: number,
  data?: any
) => {
  return response.status(status).json({ ...messages[(isNumber(data) ? data : messageCode)], ...isDefined(data) ? isNumber(data) ? {} : { data } : {}});
};

export const isDefined = (data: any) => {
  return data != null;
}

const isNumber = (data: any) => {
  return typeof data === 'number';
}