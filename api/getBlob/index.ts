import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getBlob } from '../shared';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
    context.log('get blob function called')
  context.req!.body = context.bindings['getBlob'];
  const result = await getBlob(context);
  context.log('result', result)
  context.res = {
    status: 200,
    body: result
  }
};

export default httpTrigger;
