# Contributing to OpenEdu

## I. Roles
* Sprint 1 Product Owner: Hao, Xiyu
* Sprint 1 Scrum Master: Liao, Baiyi

## II. Team Values
1. Team members work together by communicating on our team groups at Discord and WeChat, reviewing each other's work on Github, and checking each other's progress via Standups.

2. If members need help from others or have conflicts, they need to report their problems on daily standups to the product owner and scrum master who support the team to come up with a solution. We expect team members to respond to messages within at most 2-3 hours. 

3. Team's code of conduct is to use welcoming and inclusive language in communications and to show our respect, appreciation, and empathy for differences among members and members' viewpoints.

## III. Sprint Cadence
1. The length of each sprint is 2 weeks.
2. Sprint planning meetings last for 1-2 hours, including setting up a sprint backlog with user stories, planning poker cards, and managing a task board with tasks and spikes.

## IV. Daily Standups
> Here's our regular standup schedule (times are in **military time**):
>
> - **Mondays and Wednesdays**: 12:15, right before class at **NYU Silver Building (i.e. in-person)**
>	
> - **Fridays**: 21:00 on Zoom.
> 
> *Should there be any changes to the above schedule such as time change or additional standups, scrum master is to be informed no less than 24 hours in-advance, otherwise the regular meeting schedule will be honored*.



1. Members must meet in person for 15 minutes for standup meetings.
2. During daily standup meetings, every member needs to answer **three** questions:
    * What have you done since last time?
    * What are you doing now?
    * Is there anything blocking your progress?
3. Scrum master records every member's progress and problems (answers to the above three questions) and post them on the daily standup channel on Discord.

## V. Git Workflows
Our team will follow the Feature Branch Version Control Workflow.
1. Each developer have access to two repositories: a centralized remote repository on Github accessible by everyone on the team, a local clone of the remote repository.
2. Before making any changes, pull from central repository and create a new local branch. The name of the branch should refer to the user story, task, or spike associated with the changes that will be made.
3. Update the task board and make changes locally within your branch. 
4. Commit changes to the local branch.
5. Push branch to remote repository.
6. Issue pull request and notify other team members for peer review.
7. **Cleanup commit timeline before merging**  -- mark all small changes (in discretion of the peer reviewers) as ``fixup`` commits in Git and merge them with the major commits.
8. Merge to main branch and update the Task Board.

## VI. Setting up a Local Development Envrionment

1. Make sure that GitHub recognizes your device by registering your device via a ``ed25519 SSH Key``. [Here's the tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) 
2. Clone the project on our local IDE via ``git clone ``
3. Install the required dependencies by running `npm install`
4. Start the development server by running `npm start`
5. If you feel the need to make modification to the current codebase, be sure to read the contribution guidelines below.

## VII. Rules of Contributing and Coding Standards

### A. In a Nutshell...
1. You should **NEVER** push your commits directly to the ``master`` branch unless otherwise instructed.
2. Always create a branch when you wish to modify the codebase, the request a ``Pull Request`` to merge your changes into the master branch after  ``peer review``.
3. At all times, please be nice to all the contributors and stakeholders of this project as this is not a paid project and is the only way to facilitate effective communication and show love with each other!

### B. Create a branch

Use the following command with ``git`` to create a new branch:

```bash
git checkout -b your_new_branch_name
```

As a common practice, you should provide a **meaning name** for your branch, such as ``ui_overhaul``, ``fix_x_glitch``, ``updates_per_meeting_x``. **NOT** any random name.

### C. Commit Messages

Please refer to [this](https://www.alibabacloud.com/blog/597372) article for commit message guidelines and **AVOID one-line-change commits like "typo"/ "size adjust"**. Failing to adhere this guideline will result in being rebased by one of our team members and will need to buy others coffee for the next meetup.

### D. Merging into Master Branch

You may open a Pull Request via GitHub when you wish to merge your changes into the ``master`` branch. **At least one member from the Team** needs to participate in the peer review and greenlight your pull request.

Finally, when ready to merge, please use the ``squash and merge`` feature before you execute the merge command on GitHub. Failing to do so might be yelled by Patrick (let's hope that he doesn't...) and will force him to clean up the commit history by obliterating through it with some override rights. (which might get the professor involved for it, not good!)


## VIII. Building and Testing the Project

Add proper test cases via ``mocha`` of node.js and be sure to modify ``.github/workflow`` test scripts accordingly (if needed). In most cases, your tests are to be executed via ``npm test``.



