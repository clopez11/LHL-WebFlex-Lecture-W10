# Responsive Design & AJAX

Thanks for attending tonight's class with your questions, participation and great energy.

### Content:
- [x] Responsive Design
- [x] Viewport Meta Tag
- [x] Viewport Height / Width (`vh` / `vw`)
- [x] Percentages
- [x] `em` / `rem`
- [x] `max-width` & `min-width`
- [x] Border Box
- [x] Box Model
- [x] Flex Box
- [x] Demo: Flexbox Layout 1 & 2.
- [x] Media Queries
- [x] Demo: Convert Sample Site to Responsive with Media Queries & FlexBox

### Stretch Content: Students can exit class, if behind Tweeter.
- [x] CSS Preprocessors
- [x] Intro to SASS/SCSS
- [x] Demo: Convert CSS to SASS

--- 

## Responsive Design
* Our website or app can respond to different screen sizes and orientations.
* We have hundreds of devices that vary in size and our site needs to look good in all of them.
* Resource: [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)

--- 

## Viewport Meta Tag
* We want our webpage to display as wide as your device & 100% zoom.
* It controls the width and scaling of viewport so it's sized correctly on all devices.
* We want our webpage to display as wide as your device & 100% zoom.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

--- 

## Viewport Height / Viewport Width (vh / vw)
* Relative to the window not parent.
* In the case of the viewport units, the size is relative to the user viewports.
* Each vh or vw unit is equal to one percent of the page length.

```css
/* 1 vw = 1% of the width of the page. */
body {
  background-color: #ecedf0;
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  /* Modify the viewport width below */
  width: 100vw;
}
```
--- 

## Pixels
* There are ways we can size elements on our page. Pixels are used often.
* Pixels fall into the absolute sizing category which means the object size you configure will remain static on the page.
* It doesn’t matter if the user toggles their screen width or views the web page from a small screen mobile device for instance.

> * NOTE:
  can install px to rem plugin by Marco N in your vs code.
  use OPTION + Z to convert your styles from px to rem.
  I work in pixels then when I'm done, I convert all the px to rems in my .scss.

--- 

## Percentages
* Always relative to the parent not the page.
* Height percentages doesn't work unless parent has an explicit height.
* Allows us to do grid layout.

```css
.tweets {
  width: 50%;
}

.tweets .tweet-card {
  width: 33%;
}
```
--- 

## em / rem
* An `em` is the `font-size` of parent element.
* This means `1em` defined on that element, or any of it's children is `13px`.
* Check Dev Tools > Computed, you will see `.profile-name` is `13px`.

```html
  <header class="header-main">
    <img src="images/logo-tweeet.png" class="logo"> 
    <div class="header-profile">
      <h2 class="profile-name">FirstName LastName</h2>
      <img src="images/avatar-astronaut.jpg" class="profile-image"> 
    </div>
  </header>
```

```css
.header-main {
  background-color: #fff;
  box-shadow: 0 2px 10px rgb(90 97 105 / 12%);
  font-size: 13px;
  height: 60px;
}

.header-main .header-profile .profile-name {
  color: rgba(0,0,0,.5);
  display: inline-block;
  font-size: 1em;
  margin-right: 3px;
  position: relative;
  top: -12px;
}
```

* `rem` is relative to the absolute top parent of entire `dom`, which is `html`.
* By default, the default `font-size` is `16px` on every page on the internet.
* `rem` is standard and generally used instead of px, em or %.
* `16px` is equal to `1rem` (ie. `8px` is equal to `0.5rem`, `32px` is equal to `2rem` ..etc).

--- 

## max-width & min-width
* The width does not shrink less than minimum size.
* The width does not grow greater than maximum size.
* Stop from continuing to grow or shrink.

```css
.tweets .tweet-card {
  background-color: #fff;
  border-radius: 5px;
  display: inline-block;
  margin: 5px 0;
  padding: 25px;
  min-width: 200px;
  max-width: 300px;
}
```

---

## Box Sizing (Border Box) | Box Model | Display
* Resource: [MDN Box Sizing](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing)
* Ref: Demo Display Property Folder

> Box Model
* We use box model for layouts, since each html element is a box.
* It has 4 main components (content, padding, border, margin).
* This is how we control how each elements is position and how it looks in relationship to other html elements.

> Display
* Every HTML element has a default display property.
* CSS can override this default property or any default css property.
* Before flex box, we had to use these properties to create our layouts.

```css
display: inline;
display: inline-block;
display: block;
```

---

## FlexBox
* Another display property other than block, inline and inline-block.
* Combine flex box with other display properties to create flexible and modern layouts.
* Direction Agnostic compared to block(vertical) and inline(horizontal).
* Parents tell children what to do.
* Two axis, main & cross. Can change orientation depending on vertical and hortizontal.
* Ref: Demo Flex Layout 2 folder.

---

## Media Queries
* The best way to make pages responsive. Made up of two parts.
* Type: screen, print, speech, all.
* Media feature: min-width, max-width, orientation, device-height, light-level.
* These multiple breakpoints, triggers changes to your styles.

```css
/* Mobile */
@media screen and (min-width: 350px) {
  /* Styles to apply at this breakpoint. */
  body {
    background-color: red;
  }
}

/* Tablet */
@media screen and (min-width: 750px) {
  body {
    background-color: blue;
  }
}

/* Desktop */
@media screen and (min-width: 980px) {
  body {
    background-color: orange;
  }
}
```

---

## CSS Preprocessors
* Systantically Awesome Style Sheet. Known as a preprocessor.
* Language that we write in and then needs to be processed or translated before we can run it.
* Browser does not understand SASS. It only understands in CSS.
* Resource: [SASS](https://sass-lang.com/)

## Intro to SASS/SCSS
* `npm install sass`
* Once installed, you can now convert `.scss` files to `css` through command line.
* Please check `package.json` to see example scripts added.
* `SASS` is popular for nesting, variables, partials & mixins.

### Nesting
```scss
/* Section: Header */
.header-main {
  background-color: #fff;
  box-shadow: 0 2px 10px rgb(90 97 105 / 12%);
  font-size: 13px;
  height: 60px;

  .logo {
    float: left;
    height: auto;
    margin-top: -45px;
    padding: 10px;
    width: 150px;
  }

  .header-profile {
    display: inline;
    float: right;
    padding: 10px;
  }

  .header-profile .profile-name {
    color: rgba(0,0,0,.5);
    display: inline-block;
    font-size: 1em;
    margin-right: 3px;
    position: relative;
    top: -12px;
  }

  .header-profile .profile-image {
    border-radius: 50%;
    height: auto;
    width: 40px;
  }
}
```

### Variables
```scss
// Variables will be added at the top of .scss file.
$background-color: #ecedf0;
$border-width: 1px;
$border-type: solid;
$border-color: #e1e5eb;
$border: $border-width $border-type $border-color;

body {
  background-color: $background-color;
  font-family: "Roboto", sans-serif;
  padding: 0.625rem;
  width: 100vw;
}

.tweets .tweet-card .tweet-card-footer {
  border-radius: 0 0 10px 10px;
  border-top: $border;
  padding: 20px 0;
}
```

### Partials
```scss
@import '../_variables';
@import '../mixins';
```

### Mixins
```scss
// _mixins.scss
@mixin add-underline($decoration, $color, $style) {
  text-decoration: $decoration;
  text-decoration-color: $color;
  text-decoration-style: $style;
}

// index.scss
.header-profile .profile-name {
  @include add-underline(underline,#818ea3, double);
  color: rgba(0,0,0,.5);
  display: inline-block;
  font-size: 1em;
  margin-right: 3px;
  position: relative;
  top: -12px;
}

.new-tweet .page-title {
  @include add-underline(underline, blue, single);
  clear: left;
  color: #3d5170;
  font-size: 26px;
  font-weight: 500;
  line-height: 1;
  padding: 12px 0;
}
```

---

* [Class Recording](https://us02web.zoom.us/rec/share/Az12ixWczQLeDZAuErPfEtZB7xtPGEP9FK-9m0oC3Qg0soUQHBzojgz-5JNs3IdK.HiC2zTfZzkWkaW0B)
* Access Passcode: p2$L44Wr
* Notes:
