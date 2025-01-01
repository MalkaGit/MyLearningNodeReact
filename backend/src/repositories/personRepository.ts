//repo: step5
import { Person } from "../models/Person";
import { IRepository } from "../interfaces/IRepository";
import { NotFoundError } from "../errors/NotFoundError";                //fired by update
import { promises as fs } from "fs";                                    //fs module use callback functions (cunberome). Node.js offers an alternative promise-baed api available as fs.promises
import { join } from "path";                                            //import the join method from built in path module


const DATA_FILE = join(__dirname, "./data/people.json");                //__dirname - node global var hlding the path of the directroty of the current eecutiing file

export class PersonRepository implements IRepository<Person> {
  
  async findAll(): Promise<Person[]> {
    const data = await this.readData();
    return data;
  }

  async findById(id: string): Promise<Person | null> {
    const data = await this.readData();
    return data.find(p => p.id === id) || null;
  }

  async create(person: Person): Promise<Person> {
    const data = await this.readData();
    console.log("create found" + data.length)
    data.push(person);
    await this.writeData(data);
    return person;
  }

  async update(id: string, person: Person): Promise<Person> {
    const data = await this.readData();
    const index = data.findIndex(p => p.id === id);
    if (index === -1) throw new NotFoundError(`Person with ID ${id} not found`);
    data[index] = person;
    await this.writeData(data);
    return person;
  }

  async delete(id: string): Promise<void> {
    const data = await this.readData();
    const updatedData = data.filter(p => p.id !== id);
    await this.writeData(updatedData);
  }

  private async readData(): Promise<Person[]> {
    try {
      const rawData = await fs.readFile(DATA_FILE, "utf-8");
      return JSON.parse(rawData) as Person[];
    } catch {
      return [];
    }
  }

  private async writeData(data: Person[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  }
}
