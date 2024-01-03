import { User } from "../../typeorm/entities/user";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "src/dto/register.dto";

@Injectable()
export class AuthServices {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  findUser(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(data: RegisterDto): Promise<User> {
    const newUser = this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async findOneid(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });

      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async findOneWithEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneWithId(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updatePassword(email: string, newPassword: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new Error("Utente non trovato.");
    }

    user.password = newPassword;

    return this.userRepository.save(user);
  }
  async update(data: any) {
    await this.userRepository.save(data);
  }
}
