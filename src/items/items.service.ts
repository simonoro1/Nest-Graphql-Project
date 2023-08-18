import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ){}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    const newItem =   this.itemRepository.create(createItemInput)
    return await this.itemRepository.save(newItem);  
  }
  
  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();  
  }

  async findOne(id: string) : Promise<Item| null> {
    const item  = await this.itemRepository.findOneBy({id})

    if(!item) throw new NotFoundException(`Item with id: ${id} not found`)
    return item
  }

  update(id: number, updateItemInput: UpdateItemInput) {
    return `This action updates a #${id} item`;
  }

  async remove(id: string): Promise<void> {
    await this.itemRepository.delete({id})
  }
}
