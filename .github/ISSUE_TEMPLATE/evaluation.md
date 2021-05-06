---
name: evaluation
about: Evaluation report of tool or service that can check licences of dependencies
  of a piece of software
title: '<Name of tool>'
labels: evaluation
assignees: ''

---

Describe which command line tool or service you are going to evaluate.

For each repository you are using to evaluate create a new comment in this issue.

Describe commands / output used to evaluate.

Describe pros and cons of the tool.

Questions that need answers:
1. Can tool/service be given multiple repository URLs to check?
1. Can tool/service be given a repostory URL to check, if not describe how to check repository?
1. What kind of feedback does tool return about compliance, if so please show example?

Questions that would be nice to answers:
1. Which software package registries was used during evaluation? For example pure python uses pypi or R uses cran + bioconductor or did it find sub directories with package.json
1. Which dependency resolver / build chain was use during evaluation? For example requirement.txt with pip or environment.yml with conda
1. Can tool handle dependency with multiple licenses?
1. Does it check between runtime and other sets of dependencies? Can it be forced to check runtime only?
