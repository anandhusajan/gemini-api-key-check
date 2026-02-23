export type Model = {
  id: string;
  name: string;
  type: 'text' | 'image' | 'agent' | 'embedding';
  status: 'working' | 'blocked' | 'quota-exhausted';
  rpm: number;
  tpm: number;
  rpd: number;
  contextWindow: number;
  error?: string;
};
