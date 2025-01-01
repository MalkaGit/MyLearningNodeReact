
import { Person } from "./models/Person"
import { PersonRepository} from "./repositories/personRepository"  
import { v4 as uuidv4 } from "uuid" //For generating unique id  => npm install uuid


async function main() {
console.log ('starting')

//create
const person1: Person = new Person(uuidv4(), 'Alicely') //{ id: uuidv4(), name: 'Alice'}
const person2: Person = new Person(uuidv4(), 'Bobby')

const repository = new PersonRepository();
await repository.create(person1);
await repository.create(person2);
}

main().catch(error => console.error("Error in the main function"));

