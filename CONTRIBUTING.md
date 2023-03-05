# Contributing to OpenEdu

## Roles
* Sprint 1 Product Owner: Hao, Xiyu
* Sprint 1 Scrum Master: Liao, Baiyi

## Team Norm
### Team Values
1. Team members work together by communicating on the public channel of Discord and the private group chat on Wechat, reviewing each other's work on Github, and checking each other's progress during daily standups. 

2. If members need help from others or have conflicts, they need to report their problems on daily standups to the product owner and scrum master who support the team to come up with a solution. We expect team members to respond to messages within at most 2-3 hours. 

3. Team's code of conduct is to use welcoming and inclusive language in communications and to show our respect, appreciation, and empathy for differences among members and members' viewpoints.

### Sprint Cadence
1. The length of each sprint is 2 weeks.
2. Sprint planning meetings last for 1-2 hours, including setting up a sprint backlog with user stories, planning poker cards, and managing a task board with tasks and spikes.

### Daily Standups
1. Members must meet in person for 15 minutes for standup meetings.
2. During daily standup meetings, every member needs to answer three questions:
    * What have you done since last time?
    * What are you doing now?
    * Is there anything blocking your progress?
3. Scrum master records every member's progress and problems (answers to the above three questions) and sends it to the daily standup channel on Discord.

## Git Workflows
Our team will follow the Feature Branch Version Control Workflow.
1. Each developer have access to two repositories: a centralized remote repository on Github accessible by everyone on the team, a local clone of the remote repository.
2. Before making any changes, pull from central repository and create a new local branch. The name of the branch should refer to the user story, task, or spike associated with the changes that will be made.
3. Update the task board and make changes locally within your branch. 
4. Commit changes to the local branch.
5. Push branch to remote repository.
6. Issue pull request and peer review.
7. Merge to main branch and update the task board.

## Rules of Contributing and Coding Standards

### I. In a Nutshell...
1. You should **NEVER** push your commits directly to the ``master`` branch unless otherwise instructed.
2. Always create a branch when you wish to modify the codebase, the request a ``Pull Request`` to merge your changes into the master branch after  ``peer review``.
3. At all times, please be nice to all the contributors and stakeholders of this project as this is not a paid project and is the only way to facilitate effective communication and show love with each other!

### II. Create a branch

Use the following command with ``git`` to create a new branch:

```bash
git checkout -b your_new_branch_name
```

As a common practice, you should provide a **meaning name** for your branch, such as ``ui_overhaul``, ``fix_x_glitch``, ``updates_per_meeting_x``. **NOT** any random name.

### III. Commit Messages

Please refer to [this](https://www.alibabacloud.com/blog/597372) article for commit message guidelines and **AVOID one-line-change commits like "typo"/ "size adjust"**. Failing to adhere this guideline will result in being rebased by one of our team members and will need to buy others coffee for the next meetup.

### IV. Merging into Master Branch

You may open a Pull Request via GitHub when you wish to merge your changes into the ``master`` branch. **At least one member from the Team** needs to participate in the peer review and greenlight your pull request.

Finally, when ready to merge, please use the ``squash and merge`` feature before you execute the merge command on GitHub. Failing to do so might be yelled by Patrick (let's hope that he doesn't...) and will force him to clean up the commit history by obliterating through it with some override rights. (which might get the professor involved for it, not good!)

**Happy Coding!**

## Setting up a Local Development Envrionment
* Clone the project on our local IDE
* Create a new branch and push changes to that branch
* Install the required dependencies by running `npm install`
* Start the development server by running `npm start`

## Building and Testing the Project
TBD
Update with that information once the project reaches that stage.



