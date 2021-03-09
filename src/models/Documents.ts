import { Column, Entity, PrimaryColumn } from "typeorm";

import { v1 as uuid } from "uuid";

@Entity("documents")
class Documents {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  status: string;

  @Column()
  src: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Documents };
