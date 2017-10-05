# Unistyle

---

##### What's that for, anyway?
* create new SCSS codebase for new across teams projects

##### Advantages:
* having everyone use the same codebase, over the long haul, will reduce onboarding time for new projects and setting them up- UI developers would not have to wonder every time "Where did I use that function recently?". It brings consistency, what makes maintenance much easier. If one team uses some mixins/ functions hand crated by them, onboarding members from other teams may struggle to support it. If everyone who might switch onto or off of a particular piece of code is familiar with the same codebase, maintenance becomes much easier.
* eliminates bugs and inefficiencies- having well tested SCSS mixins/ functions will save time spent on debugging SCSS, so UI developers may spend their time on more beneficial things.
* removes a potential contention point for developers- they don't spend time arguing over which approach should they take towards SCSS code. Imagine a scenario where one developer had a naming convention that distinguished readonly and mutable variables, and he expected others to follow the same convention. Now imagine a situation where new developer join the team and is not aware of these changes, as a result doing as he pleases- maybe simply because of lack of knowledge about approach created by the first developer. This expectations gap leads to a production defect. By standardizing, you avoid such situations.

---

## Prerequisities
- SASS 3.4+ installed

## Quick start
First, install library as project dependency with NPM `npm install git+ssh://git@github.com:UnistyleScss/unistyle-scss.git`
Then, include files to your `main.scss` file:

```scss
@import 'settings';
@import '../node_modules/Unistyle/main';
```

... and you're almost ready to go ;)

## Configuration

By default, Unistyle comes with following settings:

```scss
// typography settings
$rem-baseline: 16px !default;
$rem-fallback: true !default;
$rem-px-only: false !default;

// RWD settings
$break-small-mobile: 480px !default;
$break-mobile: 767px !default;
$break-desktop: 1050px !default;

$breakpoints: (
  'phone': '(max-width: #{$break-small-mobile})',
  'tablet': '(min-width: #{$break-mobile + 1}) and (max-width: #{$break-desktop - 1})',
  'desktop': '(min-width: #{$break-desktop})'
);

// paths settings
$fontsSrc: '../fonts/' !default;
$imgSrc: '../img/' !default;

// normalize settings
$shouldIncludeNormalize: true !default;

```

If needed, all of these settings can be overwritten in the `_settings.scss` file you include in your `main.scss` file. Additional settings:

```scss
$fallbackFontFamily: Arial, sans-serif;
$defaultFontFamily: 'defaultFont';
$iconFamily: 'iconmoon';

$fonts: (
  'light': 'lightFont',
  'medium': 'mediumFont'
);
```

* `$fallbackFontFamily`: not mandatory, library will work just fine without it.
* `$defaultFontFamily`: your default font-family you use in your project
* `$iconFamily`: name of the font icon that is in use, defined via `@font-face`
* `$fonts`- map of font's variants. Keys can be strings (font names), or integers (font weights)

## Mixins' list

#### Fonts-related mixins

* `font-family($type)`

**Dependencies**: none

```scss
$fonts: (
  600: 'fontMedium',
  light: 'fontLight'
);

p {
  @include font-family(600);
}
span {
  @include font-family(light);
}

// output
p {
  font-family: 'fontMedium';
}
span {
  font-family: 'fontLight';
}
```

* `font($family, $size: inherit)`

**Dependencies**: `font-family` and `rem` mixin

```scss
p {
  @include font(light, 16px);
}
//output
p {
  font-family: 'fontLight';
  font-size: 16px;
  font-size: 1rem;
}
```

* `font-size($fs-map, $fs-breakpoints)`

**Dependencies**: `make-font-size`, `media-to` mixins, `$breakpoints` map<br>

Wrapper for `make-font-size` mixin, allowing to pass different values for breakpoints

```scss
$p-font-sizes: (
  null: (16px, light, 23px),
  mobile: (14px, light, 21px)
);

p {
  @include font-size($p-font-sizes);
}

// output
p {
  font-family: 'lightFont';
  font-size: 16px;
  font-size: 1rem;
  line-height: 23px;
}

@media screen and (max-width: 640px) {
  p {
    font-family: 'lightFont';
    font-size: 14px;
    font-size: 0.875rem;
    line-height: 21px;
  }
}
```

### Icons mixins

* `icon($icon, $position, $replace: false)`

**Dependencies**: none

```scss
$iconFamily: 'iconmoon';

i {
  @include icon(caret, before);

  &.replaceIcon {
    @include icon(caret, before, true);
  }
}

// output
i:before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: iconmoon;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: 1;
  speak: none;
  text-rendering: auto;
  text-transform: none;
  vertical-align: middle;
}

i.replaceIcon {
    font-size: 0;
}
i.replaceIcon:before {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-family: iconmoon;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    line-height: 1;
    speak: none;
    text-rendering: auto;
    text-transform: none;
    vertical-align: middle;
    font-size: 1.75rem;
}
```

### Rem mixins
* `rem($properties, $values...)`

**Dependencies**: `rem-baseline` mixin, `rem`, `rem-convert`, `rem-separator` function

```scss
div {
  @include rem(padding, 32px);
}

p {
  @include rem((
    padding: 16px,
    top: 16px
  ));
}


// output

div {
  padding: 32px;
  padding: 2rem;
}
p {
  padding: 16px;
  padding: 1rem;
  top: 16px;
  top: 1rem;
}
```

### RWD mixins
* `media-to($media)`

**Dependencies**: `$breakpoints`

```scss
div {
  @include media-to('tablet') {
    @include rem(padding, 32px);
  }
}

//output
div {
  @media screen and (min-width: 768px) and (max-width: 1199px) {
    padding: 32px;
    padding: 2rem;
  }
}
```

* `break-by-prop($prop, $map, $shouldConvertToRems: false)`

**Dependencies**: `$breakpoints`, `media-to` mixin, `rem` mixin (optional)

```scss
div {
  @include ('tablet') {
    @include rem(padding, 30px);
  }
}

//output
div {
  @media screen and (min-width: 768px) and (max-width: 1199px) {
    padding: 32px;
    padding: 2rem;
  }
}
```

### Utilities

* `vertical-align`

**Dependencies**: none<br>
**WARNING**: element parent (direct or indirect) need to have set `position: relative`

```scss
div {
  @include vertical-align;
}

// output

div {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

* `middle-align`

**Dependencies**: none<br>
**WARNING**: element parent (direct or indirect) need to have set `position: relative`

```scss
div {
  @include middle-align;
}

// output

div {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

* `vertical-align-children`

**Dependencies**: none<br>
**WARNING**: applies to elements whose children content should be vertically aligned to the middle

```scss
div {
  @include vertical-align-children;
}

// output

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

* `middle-align-children`

**Dependencies**: none<br>
**WARNING**: applies to elements whose children content should be vertically and horizontally aligned to the middle

```scss
div {
  @include middle-align-children;
}

// output

div {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

* `transition($value)`

**Dependencies**: none

```scss
div {
  @include transition(all .5s linear);
}

// output

div {
  -webkit-transition: all .5s linear;
  transition: all .5s linear;
}
```

* `transition-delay($value)`

**Dependencies**: none

```scss
div {
  @include transition-delay(.5s);
}

// output

div {
  -webkit-transition-delay: .5s;
  transition-delay: .5s;
}
```

* `clearfix`

**Dependencies**: none

```scss
div {
  @include clearfix;
}

// output

div {
  &:before,
  &:after {
    content: ' ';
    display: table;
  }

  &:after {
    clear: both;
  }
}
```

* `placeholder`

**Dependencies**: none

```scss
div {
  @include placeholder {
    font-size: $colorWhite;
  }
}

// output

div::-webkit-input-placeholder {
  font-size: #FFF;
}
div::-moz-placeholder {
  font-size: #FFF;
}
div:-ms-input-placeholder {
  font-size: #FFF;
}
```

* `scrollbars(scrollbars($size, $foreground-color, $background-color, $alwaysVisibleIfScrollable: false)`

**Dependencies**: none

```scss
div {
  @include scrollbars((5px, 10px), $colorWhite, $colorBlack);
}

body {
  @include scrollbars(5px, $colorWhite, $colorBlack, true);
}

// output

div::-webkit-scrollbar {
  width: 5px;
  height: 10px;
}
div::-webkit-scrollbar-thumb {
  background: #FFF;
}
div::-webkit-scrollbar-track {
  background: #000;
}

body::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  -webkit-appearance: none;
}
body::-webkit-scrollbar-thumb {
  background: #FFF;
}
body::-webkit-scrollbar-track {
  background: #000;
}

```

## Example use:

Below you will find example configuration and implementation of few mixins that are in included in the library.

#### `_settings.scss`

```scss
$rem-baseline: 12px !default;
$rem-fallback: true !default;
$rem-px-only: true !default;

$defaultFontFamily: 'myProjectFont';
$iconFamily: 'iconmoon';

$fonts: (
  200: '#{$defaultFontFamily}-light',
  400: '#{$defaultFontFamily}-regular',
  600: '#{$defaultFontFamily}-medium'
  900: '#{$defaultFontFamily}-bold'
);

$break-small-mobile: 640px;
$break-mobile: 767px;
$break-desktop: 1200px;

$breakpoints: (
  'phone': '(max-width: #{$break-small-mobile})',
  'phone-landscape': '(max-width: #{$break-small-mobile}) and (orientation: landscape)',
  'tablet': '(min-width: #{$break-mobile + 1}) and (max-width: #{$break-desktop - 1})',
  'desktop': '(min-width: #{$break-desktop})'
);

$shouldIncludeNormalize: true;
```
#### `_main.scss`
```scss
@import 'settings';
@import '../node_modules/Unistyle/main';

@import '_example.scss'
```

### `_example.scss`
```scss
body {
  @include media-to('tablet') {
    @include rem(padding, 30px);
  }

  @include font(light, 26px);
  @include rem((
    padding: 20px,
    top: 20px
  ));
}
```
