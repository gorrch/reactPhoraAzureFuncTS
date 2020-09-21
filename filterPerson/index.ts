import { MongoClient} from 'mongodb';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as dotenv from "dotenv";
dotenv.config({ path: 'D:\\reactPhoraTS\\functions\\.env' });

const filterPerson: AzureFunction  =  async function (context: Context, req: HttpRequest): Promise<void> {
  try {
    const client = new MongoClient(process.env.cosmoDB_CS, {useNewUrlParser: true});
    await client.connect();
    let escortAdvertisements = await client
      .db('NOTHINGWORKS')
      .collection(req.body.documentType)
      .find(
        //przekazywanie całego z reacta
        {
          age:{
            $lte: req.body.age.lte,
            $gte : req.body.age.gte
          },
          weight:{
            $lte: req.body.weight.lte,
            $gte : req.body.weight.gte
          },
          height:{
            $lte: req.body.height.lte,
            $gte : req.body.height.gte
          },
          breast:{
            $lte: req.body.breast.lte,
            $gte : req.body.breast.gte
          },
          //dla wszystkich innych niz
          // desc: {'$regex': '^((?!' + req.body.desc + ').)*$', '$options': 'i'}
          desc: {'$regex': req.body.desc, '$options': 'i'},
          title: {'$regex': req.body.title, '$options': 'i'},
          city: req.body.city
        }
       )
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
}

export default filterPerson;