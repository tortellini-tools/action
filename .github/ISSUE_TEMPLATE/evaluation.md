---
name: evaluation
about: Evaluation report of tool or service that can check licences of dependencies
  of a piece of software
title: '<Name of tool>'
labels: evaluation
assignees: ''

---

Describe which command line tool or service you are going to evaluate.

For each repository you are using to evaluate the tool or service, create a new comment in this issue and add a description of how to run the tool, and what output it generated there.

Edit the first post of this issue thread such that it 

1. describes pros and cons of the tool.
1. answers the following questions:
  1. Does the tool work based on a (list of) URL(s) or do you need a local copy?
  1. Does the tool depend on installation of the software in order to do the analysis?
  1. Show example of the kind of feedback the tool returns about compliance
  1. Provide a list of (dependency file, software registry) that the tool supports, e.g.:
    - requirements.txt - PyPI
    - Pipfile - PyPI
    - Pipfile.lock - PyPI
    - setup.cfg - PyPI
    - setup.py - PyPI
    - environment.yml - Anaconda Cloud
    - environment.yml - PyPI
    - conanfile.txt - conan.io
    - package.json - npmjs.com
    - package-lock.json - npmjs.com
    - yarn.lock - npmjs.com
    - something - CRAN
  1. Can the tool handle dependencies that have multiple licenses?
  1. Does the tool differentiate between runtime and other sets of dependencies? Can it be forced to check runtime only?
