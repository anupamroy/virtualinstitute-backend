import { Person } from "./misc.DB.model";
import { Masters } from "./masters.DB.model";

export class NTA extends Person {
  masters: Masters = new Masters();
}
