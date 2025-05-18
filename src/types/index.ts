export enum BlockType {
  Motion = 'motion',
  Looks = 'looks',
  Control = 'control'
}

export interface Block {
  id: string;
  type: BlockType;
  action: string;
  params: any;
  label: string;
  children?: Block[];
}

export interface Sprite {
  id: string;
  name: string;
  x: number;
  y: number;
  direction: number;
  blocks: Block[];
  costume: string;
  isActive: boolean;
  sayText: string;
  thinkText: string;
  textTimeout: number | null;
}