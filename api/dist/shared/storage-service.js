"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainerList = exports.getBlobList = exports.sendEvent = exports.getBlob = void 0;
const event_hubs_1 = require("@azure/event-hubs");
const utilities_1 = require("./utilities");
const config_1 = __importDefault(require("./config"));
const eventHubConnectionString = process.env['AZURE_EVENT_HUB_CONNECTION_STRING'];
const eventHubName = process.env['EVENT_HUB_NAME'];
function getBlob({ req, res }) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response = yield req.body;
            response = response
                .split('<EVENT>')
                .filter((fil) => fil.length > 0)
                .map((val) => JSON.parse(val))
                .sort((a, b) => {
                return +new Date(a.eventTime) - +new Date(b.eventTime);
            });
            console.log(req.query);
            if (req.query.audit === 'true') {
                res['status'](200).send(response);
                return;
            }
            let completeBlob = {};
            try {
                for (var _d = true, response_1 = __asyncValues(response), response_1_1; response_1_1 = yield response_1.next(), _a = response_1_1.done, !_a;) {
                    _c = response_1_1.value;
                    _d = false;
                    try {
                        let event = _c;
                        event.data.path = event.data.path
                            .split(':')
                            .slice(1)
                            .map((section) => {
                            section = section.split('.');
                            section[0] = `[${section[0]}]`;
                            return section.join('.');
                        })
                            .join('.')
                            .split('.')
                            .slice(1)
                            .join('.');
                        let action = event.eventType.split('.')[event.eventType.split('.').length - 1];
                        if (!event.data.path) {
                            if (action === 'Deleted') {
                                response = yield completeBlob;
                                return;
                            }
                            else {
                                completeBlob = Object.assign(Object.assign({}, completeBlob), event.data);
                            }
                        }
                        response = yield (0, utilities_1.mergeEvents)(completeBlob, event.data.path, '.', event.data, action);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = response_1.return)) yield _b.call(response_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.log(response);
            if (req.query.path) {
                response = yield (0, utilities_1.getNested)(completeBlob, req.query.path, '.');
            }
            res['status'](200).send((0, utilities_1.addPathsToObjectsTree)(response));
        }
        catch (error) {
            res['status'](404).send(error);
        }
    });
}
exports.getBlob = getBlob;
function sendEvent(context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = new event_hubs_1.EventHubProducerClient(eventHubConnectionString ? eventHubConnectionString : '', eventHubName ? eventHubName : '');
        let batch;
        try {
            context.log('Prepare a batch of three events.');
            batch = yield producer.createBatch();
            batch.tryAdd(req.body);
        }
        catch (err) {
            context.log('error creating batch');
        }
        try {
            if (producer && batch) {
                context.log('Send the batch to the event hub.');
                yield producer.sendBatch(batch);
                // Close the producer client.
                yield producer.close();
                context.res = {
                    body: {
                        message: 'event sent',
                        req: req.body,
                    },
                };
            }
        }
        catch (err) {
            context.log('Send the batch to the event hub failed.');
            context.res = {
                status: 400,
                body: 'event failed',
            };
        }
    });
}
exports.sendEvent = sendEvent;
function getBlobList({ req, res }) {
    var _a, e_2, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const containerClient = config_1.default.container.getContainerClient(`${req.query['container']}`);
        console.log('containerCLient', req.query.container);
        let blobData = new Array();
        try {
            try {
                for (var _d = true, _e = __asyncValues(containerClient.listBlobsFlat()), _f; _f = yield _e.next(), _a = _f.done, !_a;) {
                    _c = _f.value;
                    _d = false;
                    try {
                        const blob = _c;
                        let entry = blob.name;
                        blobData.push(entry);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = _e.return)) yield _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            res['status'](200).json(blobData);
        }
        catch (error) {
            res['status'](404).send(error);
        }
    });
}
exports.getBlobList = getBlobList;
function getContainerList({ req, res }) {
    var _a, e_3, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let containerData = new Array();
        const containerClient = config_1.default.container.listContainers();
        try {
            try {
                for (var _d = true, containerClient_1 = __asyncValues(containerClient), containerClient_1_1; containerClient_1_1 = yield containerClient_1.next(), _a = containerClient_1_1.done, !_a;) {
                    _c = containerClient_1_1.value;
                    _d = false;
                    try {
                        const container = _c;
                        let entry = container.name;
                        containerData.push(entry);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = containerClient_1.return)) yield _b.call(containerClient_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            res['status'](200).json(containerData);
        }
        catch (error) {
            res['status'](500).send(error);
        }
    });
}
exports.getContainerList = getContainerList;
//# sourceMappingURL=storage-service.js.map