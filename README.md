#Commutr

[Demo](https://frozen-harbor-37769.herokuapp.com/)

Commutr is an application to help employees track their commutes to work. It's primarily meant to be a tracker for
runs, cycling, and other athletic modes of transportation, but isn't excluded to those. Currently it is connected to the
Strava API.

### Updating UI
The former UI was pretty ugly. It was thrown together in a day to fulfill the bare minimum in order to get Commutr up
and running. The new UI will be much more approachable. It will include a Landing Page on top of the other views
originally in the app (login, register, and dashboard).

While I'm doing this I'm also refactoring the file structure. Originally my application was organized by file typae.
Controllers were in a *Controllers* directory, Factories in a *Factories* directory, etc. In the updated application the
files will be structured by feature. Everything having to do with authentication will be in the *authentication* directory.

On top the aforementioned changes, I'm refactoring my code to follow the [Angular 1 Style Guide](https://github.com/johnpapa/angular-styleguide/tree/master/a1)
practices. This includes:

1. Each feature will be placed in an Immediately Invoked Function Expression
2. Dependencies will be injected for each module using the `$.inject` method, as opposed to the array method.
3. Implementing the `controller as` syntax.
  - Although the Angular Style Guide recommends using `vm` as the preferred `controller as` name, the Angular
  team has stated that using the controller's name is preferrable (i.e. the `AuthenticationController` should be
  referred to as `authentication` or `auth` as opposed to `vm`).
4. Fixing issues within factories.
  - In v1.0 I'm doing some convoluded things with my factory services in order to return the desired result. This will be
  fixed for clarity and functionality sake in v2.0.


### Using the App
Using the app is fairly simple. Companies subscribe to the Commutr service, providingn information about how they'd like
their employees rewarded for commuting to work by bike, run, bus, etc. Employees can then create an account associated with
their respective company.

Once the employee has created an account they can log in to manually enter their commute, or they can use Strava.
Currently a user must login with Strava everyday they commute. In v2.0 I hope to have this process automated.

HR admins can then login and see the metrics for their employees. This data, I hope, can then be used to automate employee
incentive programs, while lowering a company's insurance expense (since they now have data to indicate an ever-healthier
employee-base).

### Future Development
- Automatically update a user's info from their tracker app of choice.
- Allow for Fitbit, Jawbone, and other fitness tracking services.
- Access an API for bus service, ride sharing, and carpooling.
- Include charts to display commute metrics
- Implement Webpack for FE.
- Upgrade to Angular 2/React.
- Begin testing my code.
- Restructure server-side routes so that they're clearer.
- Account for development environments in BE.
- Update server-side code to Koa.js.
- Implement JWTs over traditional Passport authentication.
- Write API documentation for serverside code.
- Reconsider/refactor database.
- Deploy back end as API.
