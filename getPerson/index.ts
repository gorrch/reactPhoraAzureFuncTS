import { MongoClient} from 'mongodb';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as dotenv from "dotenv";
dotenv.config({ path: 'D:\\reactPhoraTS\\functions\\.env' });

const getPerson: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
      const client = new MongoClient(process.env.cosmoDB_CS, {useNewUrlParser: true});
        await client.connect();
        let escortAdvertisements = await client
          .db('NOTHINGWORKS')
          .collection(req.body.documentType)
          .find()
          .toArray();
    
          context.res = {
              body:  { items: escortAdvertisements}
          };
      }
      catch (error){
        context.log(`Error code: ${error.code} message: ${error.message}`);
        context.res = {
            status: 500,
            body: "An error occued, please try again later"
        };
      }
    };

export default getPerson;