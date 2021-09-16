# a11y badges

![a11y-badges](https://a11ybadges.com/badge?logo=check-square&text=a11y_badges&badgeColor=green)

[accessible](https://www.w3.org/WAI/fundamentals/accessibility-intro/) badges for profile and project READMEs (and everything else!)

with built-in support for:

* [simple icons](https://simpleicons.org)
* [feather icons](https://feathericons.com)
* custom logos / icons

## table of contents

* [why](#why)
  * [visual comparison](#visual-comparison)
  * [comparison table](#comparison-table)
* [usage](#usage)
* [inspiration](#inspiration)

## why

the standard badges available from [shields.io](https://shields.io/) are not accessible, and no options are available to make them accessible.  specifically, they suffer from the following a11y problems:

1. contrast for text often does not meet [WCAG 2.x criterion 1.4.3 (level AA)](https://www.w3.org/TR/WCAG21/#contrast-minimum)
1. contrast for logos often does not meet [WCAG 2.x criterion 1.4.5 (level AA)](https://www.w3.org/TR/WCAG21/#images-of-text)
1. text size too small
1. logos are often too small

### visual comparison

| a11y badges | shields |
| --- | --- |
| ![W3C](https://a11ybadges.com/badge?logo=w3c) | ![W3C](https://img.shields.io/badge/W3C-005A9C.svg?logo=w3c&logoColor=white) |
| ![git](https://a11ybadges.com/badge?logo=git) | ![git](https://img.shields.io/badge/Git-F05032.svg?logo=git&logoColor=black) |
| ![js](https://a11ybadges.com/badge?logo=javascript) | ![js](https://img.shields.io/badge/JavaScript-F7DF1E.svg?logo=javascript&logoColor=black) |



### comparison table

|| a11y badges | shields |
| --- | --- | --- |
| accessible text contrast | ✅ | ❌ |
| accessible logo/icon contrast | ✅ | ❌ |
| accessible text size | ✅ | ❌ |
| accessible logo/icon size | ✅ | ❌ |
| custom badge color | ✅ | ✅ |
| custom logo/icon | ✅ | ✅ |
| custom logo/icon color | ✅ | ❌ |
| custom text | ✅ | ✅ |
| custom text color | ✅ | ❌ |
| [simple icons](https://simpleicons.org/) | ✅ | ✅ |
| [feather icons](https://feathericons.com/) | ✅ | ❌ |

## usage

### as a service

generating a badge is as simple as:

`https://a11ybadges.com/badge?text=hello,world`

#### query string parameters

* `badgeColor`
  * a [css color name](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value), hex value, or rgb value - e.g. `red`, `#1CE0E3`, `rgb(70,130,180)`
  * example:
    * ![badge color example](https://a11ybadges.com/badge?text=hello,world&badgeColor=purple)
    * `https://a11ybadges.com/badge?text=hello,world&badgeColor=purple`
* `logo`
  * the logo or icon for the badge - can be a [simple icon](https://simpleicons.org), a [feather icon](https://feathericons.com), or a data URI
  * [simple icon](https://simpleicons.org) example:
    * ![simple icon example](https://a11ybadges.com/badge?logo=javascript)
    * `https://a11ybadges.com/badge?logo=javascript`
  * [feather icon](https://feathericons.com) example:
    * ![feather icon example](https://a11ybadges.com/badge?logo=smile&text=hello,world)
    * `https://a11ybadges.com/badge?logo=smile&text=hello,world`
  * custom logo example:
    * ![custom logo example](https://a11ybadges.com/badge?text=afterburner_js&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDkzOSAxMjgwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNDYzLjIgNC43Yy0zMS40IDMxLjUtNTMgMTM2LjYtNTguMyAyODMuOGwtMS4xIDMxLTMuMiAzYy0xLjcgMS42LTEzLjMgMTEuNi0yNS42IDIyLjItMTIuNCAxMC41LTI1LjYgMjItMjkuNCAyNS41bC02LjggNi4zLS45IDEwYy0uNSA1LjUtMi4xIDIxLjUtMy41IDM1LjVzLTUuMiA1My4xLTguNCA4Ni45Yy0zLjkgNDAuMS02LjQgNjEuOS03LjIgNjIuOS0uNy44LTQwLjQgMzYuMi04OC4zIDc4LjYtNDcuOCA0Mi40LTk5LjEgODcuOC0xMTQgMTAwLjktMTQuOCAxMy4yLTQwLjUgMzUuOS01NyA1MC42LTE2LjQgMTQuNi0zNS4zIDMxLjQtNDIgMzcuMi02LjYgNS44LTEzLjEgMTEuOC0xNC41IDEzLjNsLTIuNSAyLjgtLjMgMzcuMS0uMyAzNy4xIDUuOCA1LjljMy4yIDMuMiAxMS45IDExLjEgMTkuMyAxNy41IDcuNCA2LjUgMTYuOSAxNC45IDIxIDE4LjggNy42IDcuMyAxOS4xIDE1LjQgMjEuOCAxNS40IDEuNiAwIDE4OS42IDYyLjcgMTkyLjUgNjQuMiAxLjQuNyAxLjcgMi4yIDEuNyA4LjF2Ny4ybC0xMy4yIDEyLjhjLTcuMyA3LjEtMTkuOCAxOC41LTI3LjggMjUuMy04IDYuOC0xNi4xIDEzLjktMTguMSAxNS43LTIgMS43LTguMSA3LTEzLjUgMTEuNy01LjQgNC43LTEzLjggMTIuMy0xOC42IDE3bC04LjggOC41LS41IDIyYy0uMiAxMi4xLS43IDMwLjgtMSA0MS41LS43IDIyLjEtLjMgMjMuOCA1LjUgMjUuMiAzLjEuOCAzMy4yIDEwLjQgNjMuNSAyMC4zIDUuNSAxLjggMTEuNiAzLjYgMTMuNSA0IDEuOS40IDQuOSAxLjUgNi41IDIuMyAxLjcuOSAzLjUgMS42IDQgMS43IDIuNS4zIDcuNCAxLjggMTEuNyAzLjdsNC43IDIuMSA0LjMtMi43YzExLjQtNy4xIDE3LjItMTIgNDUuNy0zOC42IDkuMS04LjYgMjIuNy0yMC45IDMwLjItMjcuNSA3LjQtNi42IDE4LjktMTYuOCAyNS42LTIyLjdsMTItMTAuNi44LTI2LjljLjQtMTQuNyAxLTI4LjQgMS40LTMwLjVsLjYtMy42IDE0LjcgOC40YzguMiA0LjYgMTUuMiA4LjQgMTUuNyA4LjRzOC43LTMuOCAxOC4yLTguNSAxNy43LTguNSAxOC4xLTguNWMuNCAwIC44IDE1LjMuOCAzNC4xdjM0LjFsNS44IDYgNS44IDYgNS43LTYuMSA1LjctNnYtMzRjMC0yMi4zLjMtMzQuMSAxLTM0LjEuNiAwIDguNyAzLjggMTggOC41czE3LjUgOC41IDE4LjIgOC41Yy43IDAgNy44LTMuOCAxNS44LTguNCA4LTQuNiAxNC44LTguMSAxNS4yLTcuOC40LjQgMS4yIDE0LjIgMS44IDMwLjcuOSAyNi4yIDEuMyAzMC4yIDIuOCAzMS42LjkuOSAyMiAxOS40IDQ2LjggNDEgMjQuOCAyMS43IDQ5LjUgNDMuMiA1NC44IDQ3LjkgNS40IDQuNyAxMC41IDguOCAxMS40IDkuMiAxLjEuNSAyMS45LTUuOCA1Ni43LTE3LjFsNTUtMTcuOS0uMy0xNS40Yy0xLjUtNjQuNi0xLjgtNjkuNi00LTcxLjUtMS4yLTEtMjMuNS0yMS40LTQ5LjctNDUuM2wtNDcuNi00My41LjMtOCAuMy04IDM5LjUtMTMuNGMyMS43LTcuMyA2Ny4xLTIyLjYgMTAwLjktMzMuOGw2MS4zLTIwLjYgMjkuOS0yNi40IDI5LjktMjYuNVY4NTVsLTIuNy0yLjljLTEuNi0xLjYtMzIuNS0yOS4xLTY4LjgtNjEuMlM3ODkuNiA3MjIgNzc1IDcwOWMtMTQuNi0xMi45LTU1LjUtNDkuMS05MC44LTgwLjQtMzUuNS0zMS41LTY0LjUtNTcuOS02NC43LTU5LS4zLTEuMi0yLjgtMjYtNS41LTU1LjEtMi44LTI5LjItNi40LTY2LjUtOC04My0xLjctMTYuNS0zLjUtMzUtNC4xLTQxLS43LTcuMy0xLjctMTItMi45LTEzLjktMi4xLTMuNC0xMi45LTEzLjEtNDAuNS0zNi41LTExLjEtOS4zLTIwLjctMTguMi0yMS40LTE5LjctMS4zLTMtMi0xMy45LTQuMS02Ni4yLS42LTE1LjEtMS41LTMwLjgtMi0zNS0uNS00LjMtMS40LTEyLjktMi0xOS4yLTIuOS0zMC4yLTUuNS00OS45LTEwLjEtNzctNS4zLTMxLjUtOC00Mi44LTE1LjgtNjcuMS01LjgtMTcuNy0xMS0yOS0xOC4yLTM5LjVDNDc5LjggOS4xIDQ3MSAwIDQ2OSAwYy0uNiAwLTMuMiAyLjEtNS44IDQuN3oiLz48L3N2Zz4=)
    * <details><summary>code</summary><pre>https://a11ybadges.com/badge?text=afterburner_js&logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDkzOSAxMjgwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNDYzLjIgNC43Yy0zMS40IDMxLjUtNTMgMTM2LjYtNTguMyAyODMuOGwtMS4xIDMxLTMuMiAzYy0xLjcgMS42LTEzLjMgMTEuNi0yNS42IDIyLjItMTIuNCAxMC41LTI1LjYgMjItMjkuNCAyNS41bC02LjggNi4zLS45IDEwYy0uNSA1LjUtMi4xIDIxLjUtMy41IDM1LjVzLTUuMiA1My4xLTguNCA4Ni45Yy0zLjkgNDAuMS02LjQgNjEuOS03LjIgNjIuOS0uNy44LTQwLjQgMzYuMi04OC4zIDc4LjYtNDcuOCA0Mi40LTk5LjEgODcuOC0xMTQgMTAwLjktMTQuOCAxMy4yLTQwLjUgMzUuOS01NyA1MC42LTE2LjQgMTQuNi0zNS4zIDMxLjQtNDIgMzcuMi02LjYgNS44LTEzLjEgMTEuOC0xNC41IDEzLjNsLTIuNSAyLjgtLjMgMzcuMS0uMyAzNy4xIDUuOCA1LjljMy4yIDMuMiAxMS45IDExLjEgMTkuMyAxNy41IDcuNCA2LjUgMTYuOSAxNC45IDIxIDE4LjggNy42IDcuMyAxOS4xIDE1LjQgMjEuOCAxNS40IDEuNiAwIDE4OS42IDYyLjcgMTkyLjUgNjQuMiAxLjQuNyAxLjcgMi4yIDEuNyA4LjF2Ny4ybC0xMy4yIDEyLjhjLTcuMyA3LjEtMTkuOCAxOC41LTI3LjggMjUuMy04IDYuOC0xNi4xIDEzLjktMTguMSAxNS43LTIgMS43LTguMSA3LTEzLjUgMTEuNy01LjQgNC43LTEzLjggMTIuMy0xOC42IDE3bC04LjggOC41LS41IDIyYy0uMiAxMi4xLS43IDMwLjgtMSA0MS41LS43IDIyLjEtLjMgMjMuOCA1LjUgMjUuMiAzLjEuOCAzMy4yIDEwLjQgNjMuNSAyMC4zIDUuNSAxLjggMTEuNiAzLjYgMTMuNSA0IDEuOS40IDQuOSAxLjUgNi41IDIuMyAxLjcuOSAzLjUgMS42IDQgMS43IDIuNS4zIDcuNCAxLjggMTEuNyAzLjdsNC43IDIuMSA0LjMtMi43YzExLjQtNy4xIDE3LjItMTIgNDUuNy0zOC42IDkuMS04LjYgMjIuNy0yMC45IDMwLjItMjcuNSA3LjQtNi42IDE4LjktMTYuOCAyNS42LTIyLjdsMTItMTAuNi44LTI2LjljLjQtMTQuNyAxLTI4LjQgMS40LTMwLjVsLjYtMy42IDE0LjcgOC40YzguMiA0LjYgMTUuMiA4LjQgMTUuNyA4LjRzOC43LTMuOCAxOC4yLTguNSAxNy43LTguNSAxOC4xLTguNWMuNCAwIC44IDE1LjMuOCAzNC4xdjM0LjFsNS44IDYgNS44IDYgNS43LTYuMSA1LjctNnYtMzRjMC0yMi4zLjMtMzQuMSAxLTM0LjEuNiAwIDguNyAzLjggMTggOC41czE3LjUgOC41IDE4LjIgOC41Yy43IDAgNy44LTMuOCAxNS44LTguNCA4LTQuNiAxNC44LTguMSAxNS4yLTcuOC40LjQgMS4yIDE0LjIgMS44IDMwLjcuOSAyNi4yIDEuMyAzMC4yIDIuOCAzMS42LjkuOSAyMiAxOS40IDQ2LjggNDEgMjQuOCAyMS43IDQ5LjUgNDMuMiA1NC44IDQ3LjkgNS40IDQuNyAxMC41IDguOCAxMS40IDkuMiAxLjEuNSAyMS45LTUuOCA1Ni43LTE3LjFsNTUtMTcuOS0uMy0xNS40Yy0xLjUtNjQuNi0xLjgtNjkuNi00LTcxLjUtMS4yLTEtMjMuNS0yMS40LTQ5LjctNDUuM2wtNDcuNi00My41LjMtOCAuMy04IDM5LjUtMTMuNGMyMS43LTcuMyA2Ny4xLTIyLjYgMTAwLjktMzMuOGw2MS4zLTIwLjYgMjkuOS0yNi40IDI5LjktMjYuNVY4NTVsLTIuNy0yLjljLTEuNi0xLjYtMzIuNS0yOS4xLTY4LjgtNjEuMlM3ODkuNiA3MjIgNzc1IDcwOWMtMTQuNi0xMi45LTU1LjUtNDkuMS05MC44LTgwLjQtMzUuNS0zMS41LTY0LjUtNTcuOS02NC43LTU5LS4zLTEuMi0yLjgtMjYtNS41LTU1LjEtMi44LTI5LjItNi40LTY2LjUtOC04My0xLjctMTYuNS0zLjUtMzUtNC4xLTQxLS43LTcuMy0xLjctMTItMi45LTEzLjktMi4xLTMuNC0xMi45LTEzLjEtNDAuNS0zNi41LTExLjEtOS4zLTIwLjctMTguMi0yMS40LTE5LjctMS4zLTMtMi0xMy45LTQuMS02Ni4yLS42LTE1LjEtMS41LTMwLjgtMi0zNS0uNS00LjMtMS40LTEyLjktMi0xOS4yLTIuOS0zMC4yLTUuNS00OS45LTEwLjEtNzctNS4zLTMxLjUtOC00Mi44LTE1LjgtNjcuMS01LjgtMTcuNy0xMS0yOS0xOC4yLTM5LjVDNDc5LjggOS4xIDQ3MSAwIDQ2OSAwYy0uNiAwLTMuMiAyLjEtNS44IDQuN3oiLz48L3N2Zz4=</pre></details>
* `logoColor`
  * a [css color name](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value), hex value, or rgb value - e.g. `red`, `#1CE0E3`, `rgb(70,130,180)`
  * example:
    * ![logo color example](https://a11ybadges.com/badge?logo=github&logoColor=skyblue)
    * `https://a11ybadges.com/badge?logo=github&logoColor=skyblue`
* `text`
  * text for the badge - all of the other examples use this parameter
* `textColor`
  * a [css color name](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value), hex value, or rgb value - e.g. `red`, `#1CE0E3`, `rgb(70,130,180)`
  * example:
    * ![text color example](https://a11ybadges.com/badge?text=a11y_badges&textColor=CBEFF6)
    * `https://a11ybadges.com/badge?text=a11y_badges&textColor=CBEFF6`

#### in markdown

```md
![hello, world](https://a11ybadges.com/badge?text=hello,world)
```

#### in html

```html
<img alt="hello, world" src="https://a11ybadges.com/badge?text=hello,world"/>
```

### in node

coming soon!

## how it works

1. [WCAG 2.x contrast requirements](https://www.w3.org/TR/WCAG21#contrast-minimum) are enforced regardless of input. if you are not seeing the colors you specified, use [a contrast checker tool](https://webaim.org/resources/contrastchecker) to verify the colors have sufficient contrast
1. `badgeColor` is prioritized over `logoColor` and `textColor`. 
1. for the `logo` parameter, the precedence is:
    * data URI
    * simple icon
    * feather icon
1. if logo is a simple icon, `badgeColor` and/or `text` will be automatically set if they were not specified in the request

## inspiration

inspired by [Markdown Badges](https://github.com/Ileriayo/markdown-badges), and therefore of course [shields.io](https://shields.io/)
