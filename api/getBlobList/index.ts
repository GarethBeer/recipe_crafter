import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getBlobList } from '../shared';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await getBlobList(context);
};

export default httpTrigger;
