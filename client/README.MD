# client

<div align="center" style="margin: 30px;">
    <a href="https://refine.dev">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/refine_logo.png"  align="center" />
    </a>
</div>
<br/>

This [refine](https://github.com/refinedev/refine) project was generated with [superplate](https://github.com/pankod/superplate).

## Getting Started

**refine** is a React-based framework for building data-intensive applications in no time ✨

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to admin panels, B2B applications and dashboards.

## Available Scripts

### Running the development server.

```bash
    npm run dev
```

### Building for production.

```bash
    npm run build
```

### Running the production server.

```bash
    npm run start
```

## Learn More

To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **REST Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **Inferencer** [Docs](https://refine.dev/docs/packages/documentation/inferencer)
- **React Router** [Docs](https://refine.dev/docs/core/providers/router-provider/)
- **Google Auth Provider** [Docs](https://refine.dev/docs/core/providers/auth-provider/)

## License

MIT

Warning:
If you want to change the default themed layout;
You should pass layout related components to the <ThemedLayoutV2/> component's props.

    ╭ App.tsx ─────────────────────────────────────────────────────────────────────────────────────────────╮
    │                                                                                                      │
    │   import { ThemedLayoutV2 } from "components/themedLayout";                                          │

Successfully swizzled ThemedLayoutV2
Files created:

- \src\components\themedLayout\sider.tsx
- \src\components\themedLayout\header.tsx
- \src\components\themedLayout\title.tsx
- \src\components\themedLayout\index.tsx
- \src\components\themedLayout\hamburgerMenu.tsx

Warning:
If you want to change the default themed layout;
You should pass layout related components to the <ThemedLayoutV2/> component's props.

    ╭ App.tsx ─────────────────────────────────────────────────────────────────────────────────────────────╮
    │                                                                                                      │
    │   import { ThemedLayoutV2 } from "components/themedLayout";                                          │
    │   import { ThemedHeaderV2 } from "components/themedLayout/header";                                   │
    │   import { ThemedSiderV2 } from "components/themedLayout/sider";                                     │
    │   import { ThemedTitleV2 } from "components/themedLayout/title";                                     │
    │                                                                                                      │
    │   const App = () => {                                                                                │
    │       return (                                                                                       │
    │           <Refine                                                                                    │
    │               /* ... */                                                                              │
    │           >                                                                                          │
    │               <ThemedLayoutV2 Header={ThemedHeaderV2} Sider={ThemedSiderV2} Title={ThemedTitleV2}>   │
    │                   /* ... */                                                                          │
    │               </ThemedLayoutV2>                                                                      │
    │           </Refine>                                                                                  │
    │       );                                                                                             │
    │   }                                                                                                  │
    │                                                                                                      │
    ╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

PS C:\Users\yinya\Documents\Personal\Projects\003 MERN Refine Dashboard\client>
