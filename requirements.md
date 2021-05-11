Regardless of whether we choose to use an existing tool/service or make something ourselves, the solution needs to have the following elements:

1. input is a list of URLs to our repositories on GitHub, e.g. from Research Software Directory
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
    1. DESCRIPTION

    when repositories contain subdirectories with any of these dependency files, we need to do more nested/recursing evaluation
1. for each of the project dependencies,
    1. figure out whose copy is being used (e.g. PyPI, GitHub, crates.io, npm, maven, Anaconda cloud, bower, etc. more [here](https://en.wikipedia.org/wiki/List_of_software_package_management_systems#Application-level_package_managers))
    1. identify the license as stated on the platform whose copy we're using
1. yields a one-to-many graph (a tree) with relations ("If I have a GPL-3.0 here, can I have Apache-2.0 one level higher?")
1. figure out if there is any license of a dependency that yields a conflict with the top level license (should be Apache-2.0) (based on which rules?)
1. choose which result best represents the situation:
    1. didn't find a dependency file
    1. found a dependency file,
        1. every name was resolvable
            1. no conflicts
            1. had conflicts (with list of conflicts found)
        1. not every name was resolvable
            1. needs human evaluation

Open questions:

1. how to deal with multi-licensed packages
2. which set of dependencies to use (runtime would be minimum case, but perhaps you need more than that)
3. Perhaps we can use part of an existing tool once we have established the tree. This would require mangling our results into something that e.g. LicenseFinder can process

