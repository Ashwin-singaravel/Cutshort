import { Document, Model } from 'mongoose';

export interface PageInfo {
    page: number;
    limit: number;
}

export interface PaginationResult<R extends Document> {
    next?: PageInfo;
    prev?: PageInfo;
    results: R[];
    totalCount: number;
}

export type Pagination = <K extends Document, T extends Model<K>>(
    model: T,
    pipeline: any[],
    afPipeline: any[],
    page?: number,
    limit?: number
) => Promise<PaginationResult<K>>;