# licenseguard

This is a a repository that will eventually have a tool which will check the dependency licenses.
At NLeSC there is need of more attention to the licensing issues. It is often difficult to find out the first order licenses of the dependencies and conflicts. 
Find the software not following the requirements from NLeSC.
A tool program manager (or person X) can use to check the issues. The toolautomatically check these issues and point to some guides.

## Features of the intended tool
- check licensing issues of given GitHub repositories
- list of urls
- external tools that can check the conflicts
- generate a report:
  - color: red(big issues?), green(no issues), orange(some issues), gray (cannot determine)
  - list of licences (and conflicting dependencies?)
  - point to (Turing Way/NLeSC guide) in case of issues
  - suggest user to contact to Mister X/SSS

## Out of scope
- 2nd order dependencies
- Automatically fixing license conflicts
