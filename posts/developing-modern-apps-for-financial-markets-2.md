---
title: Developing modern apps for financial markets – part 4 - Architecture and Development
author: Damian Sosnowski
abstract: The obvious truth is that sooner or later, every project has to leave the design phase and enter the creation process. But we prefer a more refined approach - in our work at GFT, development and architecture planning do not start after the design phase – instead, they both form a crucial part of the entire process, conducted in parallel with all requirement definitions and discussions. To learn how we manage to do this successfully, join me in the final part of the Developing Modern Apps for Financial Markets Series!
created: "2019-08-29"
updated: "2019-08-29"
tags:
    - architecture
    - webdev
    - angular
    - projectmanagement
---

_I've wrote this article some time ago, as a way to describe the application design process in GFT, you can find the full version of those articles in the link below._


![Developing%20moder%20apps%20for%20financial%20markets%20Part%204%20f00f4d1ff9484f739433ec983ec38471/part4.jpeg](/assets/developing-modern-apps-for-financial-markets-2/part4.jpeg)

## The role of an architect

Since the very beginning, the architect is involved in defining requirements – asking detailed questions that should be considered and that can affect the implementation.

The topics discussed usually include:

1.  Any **non-functional technical requirements**, such as: target platform, performance, size of datasets, accessibility etc.,
2.  Everything related to **integration **with 3rd party systems and data exchange,
3.  The **data source** that will be used to feed the application,
4.  **Libraries, frameworks or any other tools** that should be used by the development team.

Based on the above information, requirements and conversations with stakeholders, the architect prepares an application architecture plan and defines the technology stack that will meet the client’s needs.

The additional, not-so-obvious role of the architect during the project kick-off phase is to be the person responsible for the **“technical sanity check”.** There has to be someone that makes sure that the requirements agreed with BAs and UX designers are actually implementable, or their estimated implementation time is within the client’s budget and timeframe. This way, the architect’s feedback can be quickly incorporated in the design phase – which in turn prevents problems that may occur later.

Another task before the architect is to cooperate and stay in touch with architects on the side of the client, in cases when the project requires integration with other services – or simply supervision. This is especially crucial if we plan to have a project handover at the end.

## Architecture planning

First, having completed the initial client interviews and information gathering stage, the preliminary high-level technical requirements are defined.

_Does the client need a web-based or a native application? Will it be used on multiple devices, including mobile hardware? Does it have to work offline? What kind of data will be displayed and how will the communication between the app and the remaining systems work? What will be the source of data?_

These and other high-level questions enable the architect to prepare the foundation of the application’s architecture.

Further down the road, once a more detailed project specification is agreed, and elements such as screens, application modules, data structure, 3rd party services etc. are defined, the architect is able to translate them into a much more detailed **architecture plan**. This usually includes a close-to-final application structure, data structure and communication schema.

![https://thepracticaldev.s3.amazonaws.com/i/qe4z68i9beeoeriotvk5.png](/assets/developing-modern-apps-for-financial-markets-2/qe4z68i9beeoeriotvk5.png)

At this point, the technology stack is usually agreed on. Our usual practice is that the development team in Poland, aided by the architect, prepares a set of quick POCs to test and evaluate possible tools and select those that match the client’s requirements best.

The actual development process can start here as well. With all basics defined, the nearshore development team can start setting up the development environment and the actual implementation.

The final part of architecture planning is about defining the detailed application structure. Screens (or mock-ups, if final designs are not yet available) are divided into components, data flow between them is agreed on, and services for communication and different business domains are being defined.

This part of architecture planning is usually done in an agile manner. When new screens or modules are being added, the process is repeated, and a new functionality is incorporated into the existing application structure.

![https://thepracticaldev.s3.amazonaws.com/i/smwtcmkk8kjfnmc1eg77.png](/assets/developing-modern-apps-for-financial-markets-2/smwtcmkk8kjfnmc1eg77.png)

Read the full version of article on [GFT Blog](https://blog.gft.com/blog/2018/12/12/developing-modern-apps-for-financial-markets-part-4-architecture-and-development/)
