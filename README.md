<div align=center>

</br>
</br>

<img width="60%"  src="./doc/OpenEdu.png" />

</br>
 <h4>The All-in-one Computer Science Learning Platform</h4> 

</div>

> Demo [https://server.lbynet.com:3000](https://server.lbynet.com:3000/)

## I. Get Started

### What you need to run this app

- Node
- NPM
- Git

### How to run this app
1. Clone this repository: 
   - Run `git clone https://github.com/agiledev-students-spring-2023/final-project-openedu.git`  .
2. Get into the root directory of this project:
   - Run `cd ./final-project-openedu` ;
   - Run `npm install` to install part of the necessary dependencies in order to run the app.

3. Navigate to and boot up the **backend**: 
   - Run `cd ./back-end` to go to the backend directory;
   - Run `npm install` to install all the necessary dependencies in order to run the server;
   - Make sure that you have the ENV parameters configured as follows:
  - Run `node src/main.mjs` to setup the server on port `3001`(by default);
  - (Optional) Run `npm run test` or `npm run coverage_and_test` to test the backend. 


4. Navigate to and boot up the **frontend**:
    - Open another terminal;
    - Run `cd ../` to go back to the root directory (only if you are in the backend directory);
    - Run `cd ./front-end` to go to the fontend directory;
    - Run `npm install` to install all the necessary dependencies in order to run the app;
    - Run `npm start` to run the app in the development mode.

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

> Note: Having the information above is **NOT** sufficient for running the App. Please contact us for .env configurations as they contain sensitive information of our team members.



## II. Contributing Members

- Hao, Xiyu ``xh2187`` [@Hoooao](https://github.com/Hoooao)
- Jin, Yang(Danica) ``yj2363`` [@dj9771](https://github.com/dj9771)
- Liao, Baiyi ``bl2993`` [@LBYPatrick](https://github.com/LBYPatrick)
- Liu, Xiaoteng(Frank) ``xl3893`` [@lapisliu](https://github.com/lapisliu)
- Zhang, Tianyin ``tz1308`` [@TY37zhang](https://github.com/ty37zhang)

## III. What and why?

Computer Science is one of the most popular majors across the world and one of the most prominent fields for career and academic research.
Although it is easy to learn coding from online resources nowadays, finding an all-in-one application to learn, discuss and implement can sometimes be cumbersome.

**Product Vision Statement**: **OpenEdu** will be a one-stop shop enabling CS students and enthusiasts of all skill levels to learn CS via materials from well-known universities, discuss with others, and contribute knowledge to the platform.

## IV. For whom?

OpenEdu is designed for the following audience:

- **Computer Science students** who are required to learn a broad range of topics related to CS
- **people in CS-related industries** like Database Management Systems and SDE as a whole. 

For students, their schools do not necessarily offer the best curriculum with sufficient infrastructures like labs and assignments that can effectively improve their overall understanding of certain fields: OpenEdu collects well-known courses worldwide to flatten their learning curve and offer well-rounded learning resources. 

For people in the industry, OpenEdu can serve as a platform to have a complete review of certain filed's most fundamental knowledge and a good introduction collections of the fields one would like to know about.

## V. How?

### Themes&Features

The platform is composed of three main themes: 

1. Course :

    - A user can choose from subjects that he or she is interested in, like Data Structure, Operating Systems, and so on;
    - In each subject, there will be multiple courses the user can choose from:
        - e.g. MIT's ``S6.081`` and UC Berkeley's ``CS162`` are both for Operating Systems;
    - There will be a short introduction to the courses along with prerequisites, languages the course uses, estimated time to complete the course work, and so on;
    - The videos for the lectures will be offered, along with the official page for the course and reference repositories or other sites that may benefit the learner.
   
2. User :

    - We would encourage user to have accounts for the community features, but we allow visitors as well;
    - Under each video, users can share comments, which can be deleted, liked, disliked, and replied to;
    - Markdown blogs are supported: the home page is aiming to be a Blog site for the user that can share knowledge with the public;
    - The user can give suggestions to us, offer website advice, or recommend new courses that the user finds good.

3. Community :

    - For each subject, there is a "community" page that is used as a discussion board;
    - Users can ask for helps with technical issues and questions derived from the courses and find study buddies (similar to a simplified version of *Reddit*).



## Contributing

This project is built on a resource aggregation project on GitHub: **[CSDIY](https://github.com/pkuflyingpig/cs-self-learning/)**.

We love collaborating with folks inside and outside of GitHub and welcome contributions!

> See [the contributing docs](./CONTRIBUTING.md) for more info on code style, testing, coverage, and troubleshooting.


