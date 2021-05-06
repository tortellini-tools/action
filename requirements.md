1. list of URLs to our repositories on GitHub, e.g. from Research Software Directory
1. visit each, look in the root of the repository for a list of runtime (?) dependencies, for example from dependency files such as 
    1. requirements.txt
    1. setup.cfg
    1. setup.py
    1. Pipfile
    1. Pipfile.lock
    1. pyproject.toml
    1. environment.yml
    1. yarn.lock
    1. package.json
    1. package-lock.json
    1. build.gradle
    1. ?pom.xml
    1. Cargo.toml
    1. ?NAMESPACE

    repositories with microservices (e.g. repository has root level docker-compose.yml and subdirs with Dockerfile) may require separate evaluation
1. for each of the project dependencies,
    1. figure out whose copy is being used (e.g. PyPI, GitHub, crates.io, npm, maven, Anaconda cloud, bower, etc. more [here](https://en.wikipedia.org/wiki/List_of_software_package_management_systems#Application-level_package_managers))
    1. identify the license as stated on the platform whose copy we're using
1. yields a one-to-many graph (a tree) with relations
1. figure out if there is any license of a dependency that yields a conflict with the top level license (should be Apache-2.0) (based on which rules?)
1. choose which result best represents the situation:
    1. didn't find a dependency file
    1. found a dependency file,
        1. every name was resolvable
            1. no conflicts
            1. had conflicts (with list of conflicts found)
        1. not every name was resolvable
            1. needs human



1. how to deal with multi-licensed packages
