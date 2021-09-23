import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum UserType {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER"
}



type TimelineMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Timeline {
  readonly id: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Timeline, TimelineMetaData>);
  static copyOf(source: Timeline, mutator: (draft: MutableModel<Timeline, TimelineMetaData>) => MutableModel<Timeline, TimelineMetaData> | void): Timeline;
}

export declare class User {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly birthday?: string;
  readonly userType?: UserType | keyof typeof UserType;
  readonly owner?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}