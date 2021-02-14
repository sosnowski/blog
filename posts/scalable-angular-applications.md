---
title: Scalable Angular Applications
author: Damian Sosnowski
abstract: Currently, one of the most popular frameworks among the Web community is Angular (or Angular 2+ as some prefer). The main reason why we in GFT have decided to use it in our projects, is its comprehensive character, and a strong push it gives towards consistent project structure and architecture.
created: "2019-08-16"
updated: "2019-08-16"
tags:
    - angular
    - redux
    - architecture
    - webdev
---

Unfortunately, even a framework as opinionated as Angular can only enforce the basics of application architecture. That's sufficient for small or medium applications, however, in GFT we usually have to deal with big applications, composed of dozens of modules and filled with complex data collections and complicated user flows. What is more, our projects are often developed by a team scattered across different continents and time zones.

In order to maintain high quality of delivery and prevent technical debt from being created, we had to agree to a series of guidelines and good practices of how to plan, structure and write applications in Angular.

These architecture principles can be divided into three main categories:

1.  Project structure – how to organize you project files, define and work with Angular modules and their dependencies
2.  Data flow architecture – a guide on how to define that way the data flows through your application layers
3.  State management – how to manage the state of GUI and propagate it between different application parts

This article is a combination of community–inspired guidelines and the experience that we've gathered working in our projects.

[See the full article](https://bulldogjob.com/articles/539-scalable-angular-application-architecture)

![Scalable%20Angular%20Applications%203a0d6adcee284773949c6f06b97abdc2/Untitled.png](/assets/scalable-angular-applications/Untitled.png)
