# Contributing to OpenEdu



## I. In a Nutshell...



1. You should **NEVER** push your commits directly to the ``master`` branch unless otherwise instructed.
2. Always create a branch when you wish to modify the codebase, the request a ``Pull Request`` to merge your changes into the master branch after  ``peer review``.
3. At all times, please be nice to all the contributors and stakeholders of this project as this is not a paid project and is the only way to facilitate effective communication and show love with each other!



## II. Create a branch



Use the following command with ``git`` to create a new branch:

```bash
git checkout -b your_new_branch_name
```



As a common practice, you should provide a **meaning name** for your branch, such as ``ui_overhaul``, ``fix_x_glitch``, ``updates_per_meeting_x``. **NOT** any random name.



## II. Commit Messages


Please refer to [this](https://www.alibabacloud.com/blog/597372) article for commit message guidelines and **AVOID one-line-change commits like "typo"/ "size adjust"**. Failing to adhere this guideline will result in being rebased by one of our team members and will need to buy others coffee for the next meetup.



## III. Merging into Master Branch

You may open a Pull Request via GitHub when you wish to merge your changes into the ``master`` branch. **At least one member from the Team** needs to participate in the peer review and greenlight your pull request.



Finally, when ready to merge, please use the ``squash and merge`` feature before you execute the merge command on GitHub. Failing to do so might be yelled by Patrick (let's hope that he doesn't...) and will force him to clean up the commit history by obliterating through it with some override rights. (which might get the professor involved for it, not good!)



**Happy Coding!**
