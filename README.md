# Nomadic Sample Exercise

The goal of this exercise is to create a Vue component for a single page application, style it according to the provided mockup and implement functionality with an external API.

Please clone this reposititory and follow the directions below. Once you have completed the exercise, make sure all changes have been committed and run `git archive -o solution.tar.gz HEAD`. This will generate solution.tar.gz which can be returned to us.


## Getting the app running

Use the following commands to start the development server. See the [getting started notes](docs/GettingStarted.md) from the `vue-create` scaffolding for more information.

```sh
npm install
npm run dev
```

Once running, the site should look like:

![image](https://user-images.githubusercontent.com/5681843/155601603-59ad63ed-a16e-4f4a-b2ce-061e28a69cb2.png)


## Component design

This is the component that needs to be built which should be called `EnrolledProgram`. There is also a [figma file](docs/NomadicProgramSample.fig) which can be opened at [figma.com](https://figma.com) (free account necessary) to inspect dimensions etc.

![image](https://user-images.githubusercontent.com/5681843/155591621-7f30abe4-23b3-4833-876e-81c56983fe81.png)

The following elements of the component should be variable:
- URL of Program image (note that the overlaid text is part of the image)
- Program title ("Coaching at Scale" in example)
- Team name ("Alpha Bravo" in example)
- Team initials ("AB" in example)
- Colour of circle behind team initials
- Percentage values and progress bar widths

Note that the avatar image to the left of "Your Progress" is static and can be found at src/assets/avatar.png


## Application functionality

The application is initially set up to retrieve a list of Program data from an API (details below) and render a grid of Program tiles (using the existing `ProgramTile` component).

The desired additions to the functionality are:
- Clicking a Program tile should set the `enrolled` property of the Program to `true`. This change must be made through the API and should also be reflected locally.
- The top `<section>` element of `HomeView` contains a message that there are no enrolled Programs. If any Programs have `enrolled === true`, this message should be replaced with a list of enrolled Programs represented as a 2-column grid of the newly created `EnrolledProgram` components, with 20px grid spacing.
- The `EnrolledProgram` component should populate the variable elements [listed above](#component-design) with "Team Details" data fetched from the API (note that this is randomly generated example data and will change if reloaded).
- Clicking the 'Remove' button on the `EnrolledProgram` component will reset the associated Program's `enrolled` status to `false`, causing it to be removed from the list of Enrolled Programs.
- (Note: The 'Start Program' button has no functionality)


## API details

The API is documented in OpenAPI format [here](docs/api.yaml).

The base URL for the API is: https://sample-api.staging.nomadic.fm/api

Here is a description of the main actions with example data:


### Fetch a list of Programs

**GET /programs**

Returns:

```
[
  {
    "id": 7256,
    "title": "People as Competitive Advantage",
    "image": "https://media-live.nomadic.fm/program_cover/7256_People_as_Competitive_Advantage.jpeg",
    "enrolled": false
  },
  ...
 ]
```


### Fetch a single Program by ID

**GET /programs/7256**

Returns:

```
{
  "id": 7256,
  "title": "People as Competitive Advantage",
  "image": "https://media-live.nomadic.fm/program_cover/7256_People_as_Competitive_Advantage.jpeg",
  "enrolled": false
}
```


### Update enrolled status for a Program

**PATCH /programs/7256**

Request body:

```
{
  "enrolled": true
}
```

Returns 204 on success


### Fetch Team Details for a Program

**GET /programs/7256/team**

Returns:

```
{
  "name": "Charlie Zulu",
  "initials": "CZ",
  "color": "1dacd6",
  "your_progress": 16,
  "team_progress": 68
}
```

Returns 404 if Program is not in enrolled state.