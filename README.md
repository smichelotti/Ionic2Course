# Ionic 2 Course

This course is (slightly) out of date.

### **The latest version of the code (for RC3 release) can be downloaded at [this link here](http://cdn.stevemichelotti.com/code/elite-schedule-app-rc3.zip).**

This repository contains all the information you need to get your code up-to-date. 

The course was built using the final beta for Ionic 2. There were a few key changes when Ionic 2 released the first RC which are documented here. All of the code for the course runs fine if you are using that final beta. The required tweaks are documented below for RC and beyond. **Also, Pluralsight Plus subscribers can download a complete code sample of the course which has been updated for the latest Ionic 2 release.**

## Table of Contents

1. [Installation](#installation)
1. [Project Structure](#project-structure)
1. [Buttons](#buttons)
1. [Theme Colors](#theme-colors)
1. [Lifecycle Events](#lifecycle-events)
1. [Incorporating Third-Party Libraries - lodash](#incorporate-lodash)
1. [Custom CSS](#custom-css)
1. [Storage](#storage)
1. [SQLite](#sqlite)
1. [Mapping](#mapping)
1. [Miscellaneous](#miscellaneous)


### Installation

In the course, Ionic 2 was installed with:

```shell
npm install -g ionic@beta
```

As of the RC release, you can install Ionic 2 like this:

```shell
npm install -g ionic
```

If there is any doubt, see the [Installing Ionic](https://ionicframework.com/docs/v2/getting-started/installation/) section of the Ionic 2 docs.



### Project Structure

As of the RC release, the project structure is slightly different than what you'll see in the course. With `@NgModule` being introduced, the top level folder for your source code is now called `src` instead of `app`. All of the files related to the root app component (in conjunction with `NgModule`) are now stored in of sub-folder of `src` called `app`. The `assets` directory has also been moved into `src` as a sub-directory.

#### Important Note on NgModule:

Now that the RC release uses `NgModule`, each new page you create must be added the `declarations` and `entryComponents` properties in the `app.module.ts` file. For example:

```
@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamDetailPage,
    TeamHomePage,
    TeamsPage,
    TournamentsPage
  ],
  providers: []
})
export class AppModule {}
```

### Buttons

Previously (as you see in the course), we could just refer to a button like this:

```html
<button>Test</button>
```

Now we need to use `ion-button` attribute like this:

```html
<button ion-button>Test</button>
```

The `icon-only` attribute is also required for "icon only" buttons.

Also, Floating Action Buttons (FAB) are now a distinct element. See [FABs](https://ionicframework.com/docs/v2/components/#fabs) section of docs for details.

See [New Behavior of Button](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#new-behavior-of-button) section in Ionic 2 RC change log for more info.



### Theme Colors

Previously we could add theme colors like "primary" adding the attribute directly like this:

```html
<ion-tabs primary>
```

Now we use a `color` attribute. This makes dynamic scenarios easier.

```html
<ion-tabs color="primary">
```

There are numerous components this applies to (e.g., buttons, badges, tabs, etc.). 

See [Component Colors](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#component-colors) in Ionic 2 RC0 change log for more info.



### Lifecycle Events

A few Lifecycle Events were renamed. Mostly importantly, `ionViewLoaded` was renamed to `ionViewDidLoad`. 

See [Lifecycle Events Renamed](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#lifecycle-events-renamed) section of Ionic 2 RC0 change log for more info.



### Incorporate Lodash

The guidance for adding third-party libraries (like lodash) to your project has changed slightly. Here are the steps:

```shell
npm install lodash --save
```

```shell
npm install @types/lodash --save-dev
```

Import statement at top of files now now look like this:

```
import _ from 'lodash';
```



### Custom CSS

For any components where you want custom styling, you should add a `selector` attribute to scope your CSS:

```
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
```

Also, you do **not** need to add an `@import` to the `app.core.scss` file any more.

See step #15 in the [Steps to Upgrade](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#steps-to-upgrade-to-rc0) section of the Ionic 2 RC change log.



### Storage

In the RC release, storage was moved out of the core Ionic framework into a separate library called `@ionic/storage`. For the most part, the concepts are the same. The code samples in the course downloads have been updated for its usage.

Basic usage is shown in the [Storage](https://github.com/driftyco/ionic/blob/master/CHANGELOG.md#storage) section of the Ionic 2 RC change log.



### SQLite

The SqlStorage component was removed between the final Ionic 2 beta and the Ionic 2 RC release. Please see the [sql-storage directory](https://github.com/smichelotti/Ionic2Course/tree/master/sql-storage) for an example of how the implement the `user-settings.service.ts` (shown in the course) using the [Ionic Native SQLite plugin](https://ionicframework.com/docs/v2/native/sqlite/) directly.



### Mapping

Incorporating [Angular 2 Google Maps (AGM)]() into an Ionic 2 app has changed slightly since the Ionic beta. Please see [this blog post](http://stevemichelotti.com/integrate-angular-2-google-maps-into-ionic-2/) on how to incorporate AGM into the latest version of Ionic 2.

Additionally, here is a [Github repository](https://github.com/smichelotti/ionic2-google-maps-test) with the full working code just for Ionic 2 and AGM.



### Miscellaneous

#### Item Divider

Side note: there is a bug in the RC release where the `color` attribute applied to an `<ion-item-divider>` doens't work. This issue has been identified and is being address by the Ionic team in [issue #8376](https://github.com/driftyco/ionic/issues/8376).