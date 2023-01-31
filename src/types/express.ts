import { Request as ExpressRequest, Response } from 'express';
import { Query } from 'express-serve-static-core';
import { IncomingMessage as httpIncomingMessage } from 'http';

interface IncomingMessage extends httpIncomingMessage {
  rawBody: Buffer;
}

interface Request extends ExpressRequest {
  authorization: RequestAuthorization;
  query: RequestQuery;
}

interface RequestAuthorization {
  userIdentifier: string;
}

interface RequestQuery extends Query {
  recordName: string;
  getDate: string;
}

export { Request, Response, IncomingMessage };
