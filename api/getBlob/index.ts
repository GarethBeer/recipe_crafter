import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getBlob } from '../shared';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.res.json({
    text:'Hello'
  })
  /* context.req!.body = context.bindings['getBlob'];
  await getBlob(context); */
};

export default httpTrigger;
