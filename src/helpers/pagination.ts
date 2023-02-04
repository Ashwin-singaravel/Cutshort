import { Model, Document } from 'mongoose';
import { Pagination, PaginationResult } from 'src/types/v1/pagination';

export const pagination: Pagination = async <
  K extends Document,
  T extends Model<K>
>(
  model: T,
  pipeline: any[],
  afPipeline: any[],
  page?: number,
  limit?: number
) => {
  try {
    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = Number(page) * Number(limit);

    let resultSet: Partial<PaginationResult<K>> = {};

    resultSet = (
      await model.aggregate(paginationPipeLine(pipeline, afPipeline, page, limit)).exec()
    )[0];

    let count = resultSet?.totalCount;
    if (!count) {
      (count = 0), (resultSet = { results: [], totalCount: 0 });
    }

    if (endIndex < count) {
      resultSet.next = {
        page: Number(page) + 1,
        limit: Number(limit)
      };
    }

    if (startIndex > 0) {
      resultSet.prev = {
        page: Number(page) - 1,
        limit: Number(limit)
      };
    }
    return resultSet as PaginationResult<K>;
  } catch (error) {
    throw error;
  }
};

const paginationPipeLine = (pipeline: any[], afPipeline: any[], page?: number, limit?: number) => {
  const skip = (Number(page) - 1) * Number(limit);

  if (limit) {
    afPipeline.unshift({ $limit: limit });
  }

  if (skip) {
    afPipeline.unshift({ $skip: skip });
  }

  pipeline.push({
    $facet: {
      results: afPipeline,
      totalCount: [
        {
          $count: 'totalCount'
        }
      ]
    }
  });

  pipeline.push({
    $unwind: {
      path: '$totalCount'
    }
  });

  pipeline.push({
    $replaceRoot: {
      newRoot: {
        $mergeObjects: ['$$ROOT', '$totalCount']
      }
    }
  });

  return pipeline;
};
