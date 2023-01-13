import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getContainerList } from '../shared';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  await getContainerList(context);
};

export default httpTrigger;
