"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_blob_1 = require("@azure/storage-blob");
const StorageConnString = process.env['AZURE_STORAGE_CONNECTION_STRING'];
const storageContainerName = process.env['STORAGE_CONTAINER_NAME'];
if (!StorageConnString) {
    throw Error('Azure Storage Connection string not found');
}
const blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(StorageConnString);
const containers = {
    api: blobServiceClient.getContainerClient(storageContainerName ? storageContainerName : ''),
    container: blobServiceClient,
};
exports.default = containers;
//# sourceMappingURL=config.js.map