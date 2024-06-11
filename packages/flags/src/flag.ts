import type { Flag, FlagOptions } from "./types";

const flags = new Map<string, Omit<FlagOptions, "key">>();

export function flag({
  key,
  enabled,
  defaultValue,
  description,
}: FlagOptions): Flag {
  if (!flags.has(key)) {
    flags.set(key, { enabled, defaultValue, description });
  }

  const flag = flags.get(key);

  const newFlag = (): Promise<boolean> | boolean => {
    if (!flag) {
      console.error(`"DD360" Flag not found for key '${key}'`);
      return false;
    }

    try {
      const result = flag.enabled();

      if (result instanceof Promise) {
        return Promise.resolve(result);
      }

      return result;
    } catch (error) {
      console.error(`"DD360" Error evaluating flag '${key}':`, error);
      return defaultValue === undefined ? false : defaultValue;
    }
  };

  if (description) {
    newFlag.description = description;
  }

  if (defaultValue !== undefined) {
    newFlag.defaultValue = defaultValue;
  }

  newFlag.key = key;
  return newFlag;
}
