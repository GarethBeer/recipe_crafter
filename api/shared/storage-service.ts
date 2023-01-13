import { Context } from '@azure/functions';
import { EventHubProducerClient } from '@azure/event-hubs';
import { addPathsToObjectsTree, getNested, mergeEvents } from './utilities';
import containers from './config';

const eventHubConnectionString =
  process.env['AZURE_EVENT_HUB_CONNECTION_STRING'];
const eventHubName = process.env['EVENT_HUB_NAME'];

export async function getBlob({ req, res }: Context) {
  try {
    let response = await req!.body;

    response = response
      .split('<EVENT>')
      .filter((fil) => fil.length > 0)
      .map((val) => JSON.parse(val))
      .sort((a, b) => {
        return +new Date(a.eventTime) - +new Date(b.eventTime);
      });
    console.log(req.query);
    if (req.query.audit === 'true') {
      res!['status'](200).send(response);
      return;
    }

    let completeBlob = {};

    for await (let event of response) {
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

      let action =
        event.eventType.split('.')[event.eventType.split('.').length - 1];
      if (!event.data.path) {
        if (action === 'Deleted') {
          response = await completeBlob;
          return;
        } else {
          completeBlob = {
            ...completeBlob,
            ...event.data,
          };
        }
      }
      response = await mergeEvents(
        completeBlob,
        event.data.path,
        '.',
        event.data,
        action
      );
    }
    console.log(response);
    if (req.query.path) {
      response = await getNested(completeBlob, req.query.path, '.');
    }

    res!['status'](200).send(addPathsToObjectsTree(response));
  } catch (error) {
    res!['status'](404).send(error);
  }
}

export async function sendEvent(context: any, req: any) {
  const producer = new EventHubProducerClient(
    eventHubConnectionString ? eventHubConnectionString : '',
    eventHubName ? eventHubName : ''
  );

  let batch;
  try {
    context.log('Prepare a batch of three events.');
    batch = await producer.createBatch();
    batch.tryAdd(req.body);
  } catch (err) {
    context.log('error creating batch');
  }

  try {
    if (producer && batch) {
      context.log('Send the batch to the event hub.');
      await producer.sendBatch(batch);
      // Close the producer client.
      await producer.close();
      context.res = {
        body: {
          message: 'event sent',
          req: req.body,
        },
      };
    }
  } catch (err) {
    context.log('Send the batch to the event hub failed.');
    context.res = {
      status: 400,
      body: 'event failed',
    };
  }
}

export async function getBlobList({ req, res }: Context) {
  const containerClient = containers.container.getContainerClient(
    `${req!.query['container']}`
  );

  console.log('containerCLient', req.query.container);

  let blobData: string[] = new Array();

  try {
    for await (const blob of containerClient.listBlobsFlat()) {
      let entry = blob.name;
      blobData.push(entry);
    }
    res!['status'](200).json(blobData);
  } catch (error) {
    res!['status'](404).send(error);
  }
}

export async function getContainerList({ req, res }: Context) {
  let containerData: string[] = new Array();
  const containerClient = containers.container.listContainers();

  try {
    for await (const container of containerClient) {
      let entry = container.name;
      containerData.push(entry);
    }
    res!['status'](200).json(containerData);
  } catch (error) {
    res!['status'](500).send(error);
  }
}
