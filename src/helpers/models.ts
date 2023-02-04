export const createdBy = (created_by: string) => {
    const options = [];

    options.push({
        $lookup: {
            from: 'users',
            localField: created_by,
            foreignField: '_id',
            as: 'created_by'
        }
    });

    options.push({
        $unwind: {
            path: '$created_by',
            preserveNullAndEmptyArrays: true
        }
    })

    options.push({
        $addFields: {
            created_by: '$created_by.username'
        }
    })

    return options;
}