# word-cloud

## Instructions
First run `npm run setup`. Then run `npm run start`.

The start scripts tries to fork a process, which won't work in a windows environment. In that case, you'll want to run `npm run dev` from the root directory, and then run `npm run start` from `./src/client` in a separate terminal.

## IMPORTANT!
To use the Twitter API, you'll need some credentials. Create a .env file in the root of the project and define the following variables:

```
(.env)
TW_CONSUMER_KEY=XXXXXXXXXX
TW_CONSUMER_SECRET=XXXXXXXXXX
TW_ACCESS_TOKEN_KEY=XXXXXXXXXX
TW_ACCESS_TOKEN_SECRET=XXXXXXXXXX
```

## Code structure
I aimed for some sort of onion/clean architecture. Requests come into the `./src/backend` module, which delegates to the application logic in `./src/core`. External services (twitter) is implemented in `.src/infrastructure`, which is were db connections would go if we had any. Dependencies point outward from `./src/core`. All of the frontend code resides in `./src/client` (which in turn has its own nested `src` directory to keep `react-scripts` happy).

The client app has a basic `containers` / `components` structure, where all application state is kept in plain old react components. Styling is done with `styled-components`, which might be debatable, but I like it!
