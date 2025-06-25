const separator = ["_", "-"] as const;

type Separator = (typeof separator)[number];

interface UtilsConfig {
  prefix?: string;
  separator?: Separator;
  context?: Record<string, string>;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const join = (names: string[]) => {
  let result = "";
  for (const name of names) {
    result += " " + name;
  }
  return result.slice(1);
};

function getClassNames({
  arg,
  context,
  prefix,
  separator = "-",
}: {
  arg: unknown;
  context?: Record<string, string>;
  prefix?: string;
  separator?: Separator;
}): string[] {
  if (typeof arg === "string") {
    const resolved = context?.[arg] ?? arg;
    return [prefix ? `${prefix}${separator}${resolved}` : resolved];
  }

  if (Array.isArray(arg)) {
    const result: string[] = [];
    for (const item of arg) {
      result.push(
        ...getClassNames({
          arg: item,
          context,
          prefix,
          separator,
        })
      );
    }
    return result;
  }

  if (arg && typeof arg === "object") {
    const result: string[] = [];
    for (const key in arg) {
      if (
        hasOwnProperty.call(arg, key) &&
        (arg as Record<string, unknown>)[key]
      ) {
        const val = (arg as Record<string, unknown>)[key];
        // 只有值为 true 或 number boolean（1/0）才视为有效
        if (val === true || (typeof val === "number" && val !== 0)) {
          result.push(
            ...getClassNames({
              arg: key,
              context,
              prefix,
              separator,
            })
          );
        }
      }
    }
    return result;
  }

  return [];
}

class ClassNameUtils {
  private context: Record<string, string> | undefined;
  private prefix: string | undefined;
  private separator: Separator | undefined;

  constructor(config?: UtilsConfig) {
    this.context = config?.context;
    this.prefix = config?.prefix;
    this.separator = config?.separator;
  }

  public getClassNames(...args: unknown[]): string {
    if (args.length === 0) {
      return this.prefix || "";
    }

    const classNames: string[] = [];

    for (const arg of args) {
      classNames.push(
        ...getClassNames({
          arg,
          context: this.context,
          prefix: this.prefix,
          separator: this.separator,
        })
      );
    }

    return join(classNames);
  }
}

// 单例复用，避免频繁创建实例
const sharedInstance = new ClassNameUtils();

function utils(...args: unknown[]): string {
  return sharedInstance.getClassNames(args);
}

utils.config = function (config: UtilsConfig) {
  const instance = new ClassNameUtils(config);
  return (...args: unknown[]) => instance.getClassNames(...args);
};

export default utils;
