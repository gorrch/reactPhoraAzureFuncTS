import { MongoClient} from 'mongodb';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as dotenv from "dotenv";
dotenv.config({ path: 'D:\\reactPhoraTS\\.env' });

const createPerson: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const client = new MongoClient(process.env.cosmoDB_CS);
    await client.connect();
    let collection = client
    .db('NOTHINGWORKS')
    .collection("Escort");

    await collection
      .insertOne(req.body, {w:1}, function(err, result) { 
        if(err){
          console.log(err); 
        } else{
          context.res = {
            body:  { items: req.body}
          };
        }
      });
  }
  catch (error){
    context.log(`Error code: ${error.code} message: ${error.message}`);
    context.res = {
        status: 500,
        body: "An error occued, please try again later"
    };
  }
}

export default createPerson;