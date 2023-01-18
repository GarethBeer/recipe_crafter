import { v4 as uuid } from 'uuid';

export class User {
    id: string = uuid();
    type: string = 'user';
    first_name: string = '';
    last_name: string = '';
    displayName: string = '';
    email: string = '';
    description: string = '';
    path: string = '';
    pathString: string = '';
    recipes: any[] = [];
}

export class Recipe {
    id: string = uuid();
    type: string = 'recipe';
    path: string = '';
    pathString: string = '';
    category: string = '';
    name: string = '';
    description: string = '';
    methods: Method[] = [];
    ingredients: Ingredient[] = [];
    tags: string[] = []
}

export interface AD_USER {
    type: string;
    identityProvider: string;
    userDetails: string;
    userRoles: string[];
    claims: Claims[];
    userId: string;
    [index: string]: any;
}
  
  export interface Claims {
    typ: string;
    val: string;
  }

  export interface Unit {
    id: string;
    unit: string;
}

export class Unit {
id:string = uuid();
unit:string ='' 
}

export class Ingredient {
    id: string = uuid();
    ingredient: string = '';
    amount: number = 0;
    unit: string = '';
    drawerState?: boolean = false;
    edit?: boolean = false;
}


export class Event {
  constructor(data:any){
    this.data = data;
    this.subject = data.id
  }
  eventType: 'update' | 'delete' = 'update';
  eventTopic: string = 'projects.recipecrafter.app';
  id:string = uuid();
  eventTime: string = new Date().toString();
  data: any;
  subject: string;
}


export class Method {
  id: string = uuid();
  order: number = 1;
  method: string = '';
  edit: boolean = false;
}