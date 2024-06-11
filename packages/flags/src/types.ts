export interface FlagOptions {
  key: string;
  enabled: () => boolean | Promise<boolean>;
  defaultValue?: boolean;
  description?: string;
}

export type Flag = (() => boolean | Promise<boolean>) & {
  key: string;
  description?: string;
  defaultValue?: boolean;
};
