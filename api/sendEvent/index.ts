import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { sendEvent } from '../shared';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log('Send Event Function Triggered by HTTP Request');
    await sendEvent(context, req);
  } catch (error) {
    context.log('ERROR found', error);
  }
};

export default httpTrigger;
