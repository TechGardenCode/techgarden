# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

#### 🌱 Sprout

Where ideas begin. Tiny thoughts that can grow into something more. A clean, minimalist notes tool that encourages free thinking, like sprouts breaking soil

- `@techgarden/sprout-ui`: a [NestJS](https://nestjs.com/) Service
- `@techgarden/sprout-service`: an [Angular](https://angular.dev/) UI

#### 🔔🍃 Chimes

Gentle nudges in the wind. Ambient and non-intrusive, just like wind chimes reminding you without stress. Designed for peace of mind.

#### ☀️🍂❄️🌸 Seasons

Flow with the rhythm of time. A calendar that embraces natural cycles—days, weeks, and months like changing seasons. Elegant and soothing to use.

#### 🪺📨 Nest

A cozy home for your messages. Birds bring things to the nest—just like your inbox. A calm and focused environment for conversations.

#### 🛖 Shed

Store or nurture your files. "Shed" for utility, storage, and safety. "Planter" for active organization, like tending to digital seeds.

#### 🪵🌿 Root

The structure everything grows on. A foundational design system that supports your entire garden of tools. Clean, modular, and elegant.

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
npm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
npm dev
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/docs/reference/configuration)
- [CLI Usage](https://turbo.build/docs/reference/command-line-reference)
