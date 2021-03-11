import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

import { v1 as uuid } from "uuid";
import { Documents } from "./Documents";
import { User } from "./User";

@Entity("analysis")
class Analysis {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  analyzedAt: Date;

  @Column()
  documents_id: string;

  @OneToOne(() => Documents)
  @JoinColumn({ name: "documents_id" })
  documents: Documents;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Analysis };
