# [lofextra](https://lofextra.com)

## LOcal-First EXpense TRAcker

https://github.com/pycan-jouza/lofextra/assets/141557160/cbee233a-5f01-43ae-b325-b54cad624569

### Motivation

I've been looking for a solution to track my family's expenses. Being a privacy aware individual, I've naturally discarded all the commercial solutions. True, there are a few self-hosted options that I've tried like [Actual](https://actualbudget.org/) or [Firefly III](https://www.firefly-iii.org/), but I found both of them unnecessarily complex. Luckily, I've got a skillset that allows me to build a solution myself. The solution that will leverage human right for (sensitive!) data ownership.

### High level overview

This expense tracker differs from other apps of similar nature by storing all the data locally on your device in SQLite database. Yet, it's still powerful enough to enable realtime collaboration using a server to sync updates across devices. These updates are encrypted so the server has no idea what's flowing in and out. You as a user don't need to register, you don't need email nor password. You get 12 word mnemonic phrase (like in bitcoin) that acts as your account key. Use the mnemonic on other devices and see your data sync automatically.

Other important aspect is offline support. The app works offline seamlessly when you install it as a [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), the updates are synced when you come back online. Possible conflicts are resolved using LWW (last write wins) algorithm enhanced with [Hybrid Logical Clock](https://jaredforsyth.com/posts/hybrid-logical-clocks/).

### Features

The current version of the app is mostly proof of concept. It offers mnemonics, data encryption/decryption, synchronization, offline support. As for the expense tracking part, the most core features that I'm used to using are supported. Users can add transactions, edit and delete them, attach one of the predefined categories, see their total spending over the last 30 days.

### Plans

Upcoming plans & features.

#### Multiple currencies

You're on vacation and pay in a different currency? This is the basic use case that should be supported. The plan is to pull the exchange rate from some open API when adding/editing transaction with a non-default currency and display the expense amount in both currencies.

#### Recurring transactions

Saves you time so that you don't have to input transactions that happen on regular basis.

#### Progressive Web App [DONE]

Ability to make the web version feel like a native app

#### Mobile version

Even though the app can be used on the web, it's more likely a mobile app by nature. I've chosen web as the first platform because I'm more familiar with it.

#### Budgeting

I never really needed it, but if there's a demand..

#### NPM package

Extracting the underlying stuff that can be used for building other types of apps into NPM package. Stuff like mnemonic, sync logic, encryption/decryption.

### ORM

The web version is not using any ORM because there just aren't any good that work in the browser environment flawlessly. I've implemented a few functions that help interacting with the database, but there isn't a very good type-safety, especially for queries, yet.

Hopefully, ORM like [Prisma](https://www.prisma.io/) is going to support browser databases soon.

### Contributions

I'm doing this in my free time to solve my own need and also spread privacy-focused thinking when building apps. I'm very open to any ideas, feedback and help with improvements and new features.

### Alternative solutions for building local-first apps

I've strongly considered using [Evolu](https://www.evolu.dev/) as a tool for building local-first app. Despite the maintainer's effort to offer a straightforward solution comprehensible to all developers, the library's integration of [Effect](https://effect.website/), a tool not widely adopted among developers, doesn't help achieving this goal. Furthermore, I wasn't able to make it run at all, always ran into errors so it eventually became a debugging hell. You shouldn't have to struggle with a library like that.

### Disclaimer

The app is using [Plausible](https://plausible.io/) analytics to collect anonymous data about the page visits. I'd like to have a general idea how many people are using lofextra.
