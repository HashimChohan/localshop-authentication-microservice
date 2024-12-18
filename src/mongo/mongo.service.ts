import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, ObjectId, SortDirection, WithId } from 'mongodb';
import { CollectionNames } from 'src/constants';
import * as murmurhash from 'murmurhash';

@Injectable()
export class MongoService {
  constructor(@Inject('mongoinstance') 
    private readonly db: Db ,
   ) {}

  async findById<T>(collectionName: CollectionNames, id: string): Promise<T> {
    const response = (await this.db
      .collection(collectionName)
      .find({
        _id: id,
        $or: [{ isDeleted: false }, { isDeleted: { $exists: false } }],
      } as any)
      .toArray()) as any[];
    return response[0] as T;
  }

  async findByQuery<T>(
    collectionName: CollectionNames,
    query: any,
  ): Promise<T[]> {
    const response = (await this.db
      .collection(collectionName)
      .find(query)
      .toArray()) as any[];
    return response as T[];
  }

  async insert<T>(collectionName: CollectionNames, data: T) {
    // Generate a referenceId using murmurhash and store it in an array
    const referenceId = murmurhash.v3(JSON.stringify(data)).toString(); // Generate hash as a string
    const idArray = [referenceId]; // Wrap it in an array

    // Add default fields to the data
    data["createdOn"] = Date.now();
    data["isDeleted"] = false;
    data["id"] = idArray; // Add id as an array of strings

    // Insert into the database
    const response = await this.db.collection(collectionName).insertOne(data);

    // Update _id with the generated MongoDB ObjectId
    data["_id"] = response.insertedId;

    return data;
}

  async bulkInsert<T>(collectionName: CollectionNames, data: T[]) {
    const bulk = this.db.collection(collectionName).initializeUnorderedBulkOp();
    for (let item of data) {
      item['_id'] = Date.now().toString();
      item['createdOn'] = Date.now();
      item['isDeleted'] = false;
      bulk.insert(item);
    }
    const response = await bulk.execute();
    return response.insertedCount;
  }

  async update<T>(
    collectionName: CollectionNames,
    data: T,
    id: ObjectId,
    upsert: boolean = true,
  ) {
    delete data['_id'];
    data['modifiedOn'] = new Date().getTime();
    await this.db
      .collection(collectionName)
      .updateOne({ _id: id } as any, { $set: data }, { upsert: upsert });
    data['_id'] = id;
    return data;
  }

  async upsertWithID<T>(
    collectionName: CollectionNames,
    data: T,
    id: string,
    upsert: boolean = true,
  ) {
    data['modifiedOn'] = new Date().getTime();
    await this.db
      .collection(collectionName)
      .updateOne({ _id: id } as any, { $set: data }, { upsert: upsert });
    var res = await this.findById(collectionName, id);
    data = Object.assign(data, res);
    data['_id'] = id;
    return data;
  }

  async delete(collectionName: CollectionNames, id: ObjectId) {
    return await this.update(collectionName, { isDeleted: true }, id);
  }

  async countDocuments(collectionName: CollectionNames): Promise<number> {
    try {
      const count = await this.db.collection(collectionName).countDocuments();
      return count;
    } catch (error) {
      console.error('Error while counting documents:', error);
      throw error;
    }
  }

  async countByQuery(
    collectionName: CollectionNames,
    query: any,
  ): Promise<number> {
    try {
      const count = await this.db
        .collection(collectionName)
        .countDocuments(query);
      return count;
    } catch (error) {
      console.error('Error while counting documents:', error);
      throw error;
    }
  }

  public createApiResponse(isSuccess?: boolean, data?: any, message?: string) {
    return {
      isSuccess: isSuccess,
      data: data,
      message: message || '', // Use an empty string if message is not provided
    };
  }
  async findWithQueryAndSort<T>(
    collectionName: CollectionNames,
    query: any,
    sortField: string,
    sortType: 'asc' | 'desc',
  ): Promise<WithId<T>[]> {
    const sortDirection: SortDirection = sortType === 'desc' ? -1 : 1;
    var sortObj: any = {};
    if (sortField) {
      sortObj[sortField] = sortDirection;
    }
    const collection: Collection<T> = this.db.collection<T>(collectionName);
    const response = await collection.find(query).sort(sortObj).toArray();

    return response;
  }
  
  async deleteDocument(collectionName: CollectionNames, id: string) {
    try {
      const response = await this.db.collection(collectionName).deleteOne({ _id: id as any }); // Use type assertion as any
      
      if (response.deletedCount === 1) {
        return true; // Document was successfully deleted
      } else {
        return false; // No document was deleted (perhaps the ID doesn't exist)
      }
    } catch (error) {
      console.error(`Error deleting document: ${error}`);
      return false; // Handle the error gracefully 
    }
  }
  
  
  
  
  
  





}
