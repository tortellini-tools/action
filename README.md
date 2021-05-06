# licenseguard

This is a repository that will eventually have a tool which will check the dependency licenses.
At NLeSC there is need of more attention to the licensing issues. It is often difficult to find out the first order licenses of the dependencies and conflicts. 
Find the software not following the requirements from NLeSC.
A tool program manager (or person X) can use to check the issues. The tool automatically check these issues and point to some guides.

## Features of the intended tool

- check licensing issues of given GitHub repositories
- list of GH repo urls
- existing tools (an be cli, web application or (paid) service) that can check the conflicts
- generate a report:
  - some feedback on compliance
    - by exit code
    - or some compliance score
    - optionally drilldown on found licenses in dependencies
- focus on repository written in Python, Java, C++, JavaScript/TypeScript, R, Julia

## Out of scope

- 2nd order dependencies
- Automatically fixing license conflicts

## Follow up

- point to (Turing Way/NLeSC guide) in case of issues
- suggest user to contact to that can help determine severity and/or resolve conflict
