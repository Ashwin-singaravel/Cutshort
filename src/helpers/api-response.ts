import messages from './messages';
import { Response } from 'express';

export const apiResponse = (
  response: Response,
  status: number,
  messageCode: number,
  data?: any
) => {
  return response.status(status).json({ ...messages[messageCode], ...isDefined(data) ? { data } : {} });
};

export const isDefined = (data: any) => {
  return data != null;
}