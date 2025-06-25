## 🧱 classname-utils

一个轻量、高性能的类名工具库，支持前缀（prefix）、分隔符（separator）和上下文映射（context），适合用于组件化 UI 开发中统一类名生成逻辑。

## 📦 安装

### ✨ Apply

```bash
npm install classname-utils
```

或使用 yarn：

### ✨ Apply

```bash
yarn add classname-utils
```

## 🔧 使用方式

### ✅ 直接调用

你可以直接使用默认导出的方法来组合类名：

### ✨ Apply

```TypeScript
import cx from "classname-utils";

cx("btn", "primary"); // => "btn primary"
```

### ⚙️ 配置调用（推荐）

通过 .config() 方法创建带配置的实例，支持 prefix、separator 和 context：

### ✨ Apply

```TypeScript
const myCx = cx.config({
  prefix: "app",
  separator: "-",
  context: {
    primary: "base",
    success: "green",
  },
});

myCx("button", "primary"); // => "app-button app-base"
```

### 🧩 支持的输入类型

- 字符串

- 数组

- 对象（布尔值/数值控制是否启用某个类）

### ✨ Apply

```TypeScript
cx("a", { b: true, c: false }, ["d"]); // => "a b d"
📦 API 说明
cx(...args): string
```

主函数，接受任意数量的参数并返回合并后的类名字符串。

## 参数说明：

参数 类型 描述
args unknown[] 支持字符串、数组、对象等
cx.config(config: UtilsConfig)(...args): string
创建一个带有配置的类名构造器函数。

### UtilsConfig 接口定义：

### ✨ Apply

```TypeScript
interface UtilsConfig {
  prefix?: string;      // 前缀（如：'app'）
  separator?: Separator; // 分隔符（支持 '_' 或 '-'）
  context?: Record<string, string>; // 类名映射表
}
```

### 示例：

### ✨ Apply

```TypeScript
const themedCx = cx.config({
  prefix: "theme",
  separator: "_",
  context: {
    danger: "error",
    warning: "warn",
  },
});

themedCx("danger", "warning"); // => "theme_error theme_warn"
```

### 🧪 单元测试

本项目使用 Vitest 进行单元测试，确保核心功能稳定可靠。

### 运行测试：

### ✨ Apply

```bash
npm run test
```

### 查看覆盖率报告：

### ✨ Apply

```bash
npm run test:coverage
```

### 🛠️ 开发指南

克隆仓库

### ✨ Apply

```bash
git clone https://github.com/yourname/classname-utils.git
cd classname-utils
```

### 安装依赖

✨ Apply

```bash
npm install
```

### 启动开发服务器

✨ Apply

```bash
npm run dev
```

### 构建生产版本

### ✨ Apply

```bash
npm run build
```

### 🧪 性能基准

我们使用 tinybench 对比了 classnames 和 classname-utils 的性能表现，结果显示 classname-utils 在大多数场景下接近甚至优于原生实现。

### 运行基准测试：

### ✨ Apply

```bash
npm run bench
```

### ⚠️ 注意事项

- 只保留 truthy 值：对象中只有值为 true 或非零数字时才会保留对应的键。

- 忽略非法类型：Symbol, function, undefined, null 等不会参与类名拼接。

- 默认分隔符为 -：如果不指定 separator，默认使用 - 拼接前缀与类名。

- 空参数返回 prefix：当无参数传入时，仅返回配置中的 prefix。

## 📚 示例汇总

### 基础用法

### ✨ Apply

```TypeScript
cx("a", "b"); // => "a b"
```

### 使用对象控制状态

✨ Apply

```TypeScript
cx({ active: true, disabled: false }); // => "active"
```

### 使用数组嵌套

### ✨ Apply

```TypeScript
cx(["a", { b: true }]); // => "a b"
```

### 配置前缀和分隔符

✨ Apply

```TypeScript
const cxWithPrefix = cx.config({ prefix: "ui", separator: "-" });
cxWithPrefix("btn", "primary"); // => "ui-btn ui-primary"
```

### 上下文映射 + 前缀

### ✨ Apply

```TypeScript
const themedCx = cx.config({
  prefix: "app",
  context: { primary: "base" },
});
themedCx("primary"); // => "app-base"
```
