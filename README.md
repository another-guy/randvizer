## Synopsis

[Randvizer](https://github.com/another-guy/randvizer)

Visualize Random Number Sequences To Detect Anomalies.

## Status

Current version is 0.0.2

## Motivation

If one is working on an pseudo-random number generator algorithm (PRNGA), he or she will eventually need to evaluate how well the algorithm works.

It's not easy to say whether a PRNGA performs well or not just by looking at several numbers from the sequence.
Of course, there are various mathematical ways to assess the performance.
However, it's often easier for human beings to perceive a visualized result to get some intuition about the subject of the study.

Here are two images which explain two visualized random sequences.
It's easy to see how the first picture contains some regularities which make it worse compared to the second picture.

| Weak Randomness | Strong Randomness |
|:-------------:|:-------------:|
| ![Weak Randomness](https://github.com/another-guy/randvizer/raw/master/doc/img/BadRandomSequence.png) | ![Strong Randomness](https://github.com/another-guy/randvizer/raw/master/doc/img/GoodRandomSequence.png) |

## Installation

1. Clone the repository

2. Run the following commands

```
npm install
ng serve
```

3. Open the project in browser

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Tests

### Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### End-to-End Tests [Not Available]

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## License

The code is distributed under the MIT license.

## Reporting an Issue

Reporting an issue, proposing a feature, or asking a question are all great ways to improve software quality.

Here are a few important things that package contributors will expect to see in a new born GitHub issue:
* the relevant version of the package;
* the steps to reproduce;
* the expected result;
* the observed result;
* some code samples illustrating current inconveniences and/or proposed improvements.

## Contributing

Contribution is the best way to improve any project!

1. Fork it!
2. Create your feature branch (```git checkout -b my-new-feature```).
3. Commit your changes (```git commit -am 'Added some feature'```)
4. Push to the branch (```git push origin my-new-feature```)
5. Create new Pull Request

...or follow steps described in a nice [fork guide](http://kbroman.org/github_tutorial/pages/fork.html) by Karl Broman

## Acknowledgements

This project is build via [Angular](https://angular.io/) and [D3.js](https://d3js.org/).

Number-to-color mapping algorithm is a port of code from [this SO answer](http://stackoverflow.com/a/2376159/482868) which in turn originates from [efg2.com](http://www.efg2.com/Lab/ScienceAndEngineering/Spectra.htm).
