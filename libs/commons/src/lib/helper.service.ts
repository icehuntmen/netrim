import {Injectable} from "@nestjs/common";
import * as fs from "fs";
import {join} from "path";

@Injectable()
export class HelperService {

  static readDocsFile(nameFile: string) {
    return fs.readFileSync(join(__dirname, 'assets', 'docs', nameFile)).toString();
  }

}
