import { Column, Entity, PrimaryColumn } from "typeorm";

import { v1 as uuid } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  fullName: string;

  @Column()
  cpf: string;

  @Column()
  documents: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { User };
