'use strict';

module.exports = {
    baseCreate: create,
    baseBulkCreate: createMany,
    baseList: list,
    baseUpdate: update,
    baseBulkUpdate: bulkUpdate,
    baseDelete: deleteEntry,
    baseDetail: detail,
    baseDetailById: detailById,
    baseGetCount: getCount,
    baseCounterUpdate: counterUpdate,
    baseAggregate: aggregate,
    baseDeleteById: deleteById
};

function create(modal, data, opts) {
    let entity = new modal(data);

    return entity.save(opts);
}

function createMany(modal, data, opts) {
    return modal.insertMany(data,opts);
}

function list(modal, params) {
    let entity = modal.find(params.searchParams || {});
    if(params.select){
        entity.select(params.select);
    }
    if(params.distinct){
        entity.distinct(params.distinct);
    }
    if (params.populate) {
        entity.populate(params.populate);
    }
    if (params.deepPopulate) {
        entity.deepPopulate(params.deepPopulate);
    }
    if (params.sort) {
        entity.sort(params.sort);
    }
    if (params.skip) {
        entity.skip(params.skip);
    }
    if (params.limit) {
        entity.limit(params.limit);
    }
    if (params.isLean) {
        entity.lean();
    }

    return entity.exec();
}

function detail(modal, params) {
    let entity = modal.findOne(params.searchParams || {});

    if(params.select){
        entity.select(params.select);
    }

    if (params.populate) {
        entity.populate(params.populate);
    }

    if (params.deepPopulate) {
        entity.deepPopulate(params.deepPopulate);
    }

    if (params.isLean) {
        entity.lean();
    }

    return entity.exec();
}

function detailById(modal, _id, params) {
    let entity = modal.findById(_id);

    if (params) {
        if (params.populate) {
            entity.populate(params.populate);
        }

        if(params.select){
            entity.select(parms.select);
        }

        if (params.deepPopulate) {
            entity.deepPopulate(params.deepPopulate);
        }
    }

    return entity.exec();
}

function update(modal, searchParams, data, options={}) {
    data['updatedAt'] = new Date();
    return modal.findOneAndUpdate(searchParams, data, options).exec();
}

function bulkUpdate(modal, searchParams, data, option={upsert:false}) {
    data['updatedAt'] = new Date();
    return modal.updateMany(searchParams, {$set: data}, option).exec();
}

function counterUpdate(modal, searchParams, data) {
    data['updatedAt'] = new Date();
    return modal.updateMany(searchParams, {$inc: data}).exec();
}

function getCount(modal, searchParams) {
    return modal.count(searchParams).exec();
}

function aggregate(modal, query, options={}) {
    return modal.aggregate(query, options).allowDiskUse(true).exec();
}

function deleteEntry(modal, searchParams) {
    return modal.deleteMany(searchParams);
}

function deleteById(modal, id) {
    return modal.findByIdAndDelete(id);
}
