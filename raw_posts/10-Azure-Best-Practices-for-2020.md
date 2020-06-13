---
title: 16 Tips to Manage Cloud Costs
author: parkmycloud
date: 2020-02-25
categories: ["", Blogs Share]
tags: [cloud]
image: https://pnmcartodesign.files.wordpress.com/2018/10/camera-taking-photo-of-mountain.jpeg
original_post: https://www.parkmycloud.com/blog/azure-best-practices/
---



Looking for ways to manage cloud costs? If you use the cloud, the answer should always be *yes*. If you don’t have proper management of your cloud spend, then you could end up spending more than you actually need to. We’ve compiled a list of tips/best practices that will help guide you to track and rightsize cloud spend and align capacity and performance to actual demand so your cloud environment is optimized.



Looking for ways to manage cloud costs? If you use the cloud, the answer should always be *yes*. If you don’t have proper management of your cloud spend, then you could end up spending more than you actually need to. We’ve compiled a list of tips/best practices that will help guide you to track and rightsize cloud spend and align capacity and performance to actual demand so your cloud environment is optimized.

## 1. Start with the Organizational Problem

It’s easy to find lots of specific ways to reduce and manage public cloud costs – and we have plenty of those to share. But let’s start with the core issue. Public cloud resources are provisioned and used throughout organizations – and governance and budgeting are organizational issues. You need to start at the root of the problem: who is responsible for what cloud costs? And how do you evaluate whether those costs are acceptable – or need to be addressed for wasted spend?

Many organizations solve this problem with a dedicated [enterprise cloud manager](https://www.parkmycloud.com/blog/enterprise-cloud-manager/) or [cloud center of excellence](https://www.parkmycloud.com/blog/cloud-center-of-excellence/), a person or department (depending on the size of the organization and extent of cloud deployment) dedicated entirely to the use of cloud by employees, with cost a major focus. 

Ultimately, it’s an[ issue of economics](https://www.parkmycloud.com/blog/cloud-economics/) – and you need to think of it that way. 

## 2. Get Familiar with the Cloud-Native Management Tools

The major public cloud providers offer native resource and cost management tools. Since you’re already enmeshed in their infrastructure offerings, it makes sense to evaluate the options within the cloud portals.

For example, on the issue of resource on/off scheduling, AWS, Azure, and Google Cloud each offer a tool. However, they have limitations – ignoring resource types that may benefit from scheduling, not providing actions, and providing data but not recommendations, to name a few. [Here is a quick rundown](https://www.parkmycloud.com/blog/instance-scheduler/) of each of those tools and what they include.

Another example is the [AWS Compute Optimizer](https://www.parkmycloud.com/blog/aws-compute-optimizer/) – a big name in promise, and certainly worth reviewing for AWS users.

## 3. But, Know that Cloud Providers Won’t Solve All the Problems they Create

Enter the realm of third-party software. Whether because cloud providers don’t actively want you to save money (you might guess this is the case, but they want their services to be “sticky” and therefore promote cost optimization options) or because it’s simply not a revenue driver for them, cloud cost management is often an afterthought for cloud providers. We’re seeing a change in the winds as providers turn toward built-in savings options (for example, Google Cloud’s [sustained use discounts](https://www.parkmycloud.com/blog/google-sustained-use-discounts/)), but cloud resource provisioning and optimization are a wild, ever-changing beast that cloud providers aren’t keeping up with.

That’s why it may be time to… 

## 4. Find a Cost Management Tool That Fits Your Needs

As IT infrastructure changes organizations need for tools and processes dedicated to cloud cost management and cost control have become a necessity. Using third-party tools for cloud optimization help with cost visibility and governance and cost optimization. Make sure you aren’t just focusing on cost visibility and recommendations, but find a tool that takes that extra step and takes those actions for you. 

It’d be beneficial to find a tool that can work with multiple clouds, multiple accounts within each cloud and in multiple regions within each account so you can view recommendations across all your [accounts in one place](https://www.parkmycloud.com/blog/start-stop-vm-solution/) in one easy to use interface. This added visibility and insight helps simplify managing cloud costs. 

By the way – automation is key. By including [cost optimization](https://www.parkmycloud.com/aws-cost-optimization/) software in your cloud strategy, organizations eliminate the need for developers to write scheduling scripts and deploy them to fit a specific team´s requirements. This automation reduces the potential for human error and saves organizations time and money by allowing developers to reallocate their time to more beneficial tasks. 

## 5. Get Visibility on Your Bill

If you’re going to manage your cloud costs better, you need to understand where your spending is going. [Here’s a guide](https://www.reddit.com/r/aws/comments/f7kgom/cost_analysis/) to get a consolidated billing view in AWS.

Relatedly, you’re also going to need to understand what each resource is for – which means you need a robust labeling strategy. 

## 6. Use a Resource Tagging Strategy to Better Manage Cloud Costs 

Tags are labels or identifiers that are attached to your instances. This is a way for you to provide custom metadata to accompany the existing metadata, such as instance family and size, region, VPC, IP information, and more. This helps manage your cloud costs by sorting, searching and filtering through your cloud environment. 

With the application of tagging best practices in place, you can automate governance, improve your workflows and make sure your costs are controlled. Additionally, there are management and provisioning tools that can automate and maintain your tagging standards.

In ParkMyCloud, our software reads the names and [tags assigned to VMs](https://www.parkmycloud.com/blog/tagging-best-practices/) and recommends which are suitable for scheduling (“parking”). 

## 7. Identify Idle/Underutilized Resources

Okay, so that’s how you get to the step of optimizing costs. So what are the ways you can actually manage cloud costs and optimize spending?

The easiest way to quickly and significantly reduce cloud costs is to identify resources that are not actually being used (typically in non-production environments).

Examples of resources that you may leave idle are; On-Demand Instances/VMs, Relational Databases, Load Balancers and Containers.

Once you’ve identified them, then you can schedule them to turn off when not needed, or as we like to say, “park” them. 

By setting schedules for your instances to turn off when they are typically idle, you are eliminating potential cloud waste and saving you money on your cloud bill. Typically, schedules would turn off instances between the hours of 7:00 pm and 9:00 am on weekdays and on weekends. This way you don’t have to worry about manually turning on and off instances when you aren’t using them. By keeping workloads on just during business hours, you can save around [65% on your cloud bill](https://www.parkmycloud.com/free-trial). 

## 8. Rightsize Your Instances

Another major source of [cloud waste](https://www.parkmycloud.com/blog/cloud-spending/) is oversized resources. When you RightSize you are matching a workload to the best supporting virtual machine size, helping you optimize costs. This is important because many virtual machines in the cloud are sized much larger than necessary for the workloads running on them – a single instance change can save 50% or more of the cost. ([Try it free](https://www.parkmycloud.com/free-trial) to see how much you can save.) 

## 9. Know Your Purchasing Options & Discounts Offered by Cloud Providers – Starting with Reserved Instances

Each of the ‘big three’ cloud providers offer an assortment of purchasing options to lower costs from the listed On-Demand prices. 

For example, [AWS Reserved Instances](https://www.parkmycloud.com/blog/are-aws-reserved-instances-better-than-on-demand/), [Azure Reserved Virtual Machine Instances](https://www.parkmycloud.com/blog/azure-reserved-instances/), and [Google Committed Use Discounts](https://www.parkmycloud.com/blog/google-cloud-committed-use/) allow customers to purchase compute capacity in advance in exchange for a discount. 

## 10. And Spot Instances

Another discounting mechanism is the option that lets you purchase unused capacity for a steep discount – in AWS these are referred to as [spot instances](https://www.parkmycloud.com/blog/how-to-save-money-with-aws-spot-instances-method-2-to-save-money-on-aws/), [low-priority VMs in Azure](https://www.parkmycloud.com/blog/azure-low-priority-vms/), and [preemptible VMs](http://parkmycloud.com/blog/google-preemptible-vms/) in Google. 

## 11. Don’t Miss Sustained Use Discounts

Google also offers a unique cost-savings option that AWS and Azure don’t – [Sustained Use Discounts](https://www.parkmycloud.com/blog/google-sustained-use-discounts/).

## 12. Use AWS’s New Savings Plans

You’re probably familiar with [AWS Reserved Instances](https://www.parkmycloud.com/blog/are-aws-reserved-instances-better-than-on-demand/). But have you been following along with the Savings Plans announced at re:Invent? If you use 

According to both [our CTO](https://www.parkmycloud.com/blog/aws-savings-plans/) and [Corey Quinn](https://www.duckbillgroup.com/blog/aws-begins-sunsetting-ris-replaces-them-with-something-much-much-better/), you should run, not walk, to the AWS portal to get your hands on some savings plans to better manage cloud costs. 

Plus, you can now use savings plans to save up to 17% on Lambda workloads,[ per an announcement last week](https://aws.amazon.com/blogs/aws/savings-plan-update-save-up-to-17-on-your-lambda-workloads/). 

## 13. Review Your Contracts 

Another sort of “purchasing option” is related to contract agreements. All three major cloud providers offer enterprise contracts. Typically, these are to encourage large companies to commit to specific levels of usage and spend in exchange for an across-the-board discount – examples of this would be [AWS EDPs](https://www.parkmycloud.com/blog/aws-edp/) and [Azure Enterprise Agreements](https://www.parkmycloud.com/azure-management-software/). 

## 14. Make Sure You’re Using Lambda Efficiently

It can be easy to get caught up while building [Lambda based applications](https://medium.com/foxintelligence-inside/how-we-reduced-lambda-functions-costs-by-thousands-of-dollars-8279b0a69931) that you forget to optimize and plan for the costs Lambda will incur. While it may be cheap and easy to build these applications, if you run heavy workloads without taking costs into account, you’ll end up running up your bill. 

Continuously keeping track of spend, monitoring usage and understanding its behavior is essential to keeping Lambda costs controlled and optimized.

## 15. Review Credit Options

Each of the cloud providers offers ways to get credits you can put toward your bill. By offering these credits, [Google Cloud](https://www.parkmycloud.com/blog/google-cloud-credits/), [Azure](https://www.parkmycloud.com/blog/azure-credits/) and [AWS](https://www.parkmycloud.com/blog/aws-credits/) are trying to make it easy and in some cases free to get started using their cloud platforms. 

## 16. Keep Your Instance Types Up to Date

Did you ever think that simply modernizing your VMs and databases to make sure they are running on the [latest instance family](https://www.parkmycloud.com/blog/instance-family/) can save you money? 

Cloud providers incentivize instance modernization by pricing the newest generations the lowest. Typically, new instance families come out with newer CPU types, but can also refer to networking or memory improvements as well. 

So you get a cheaper price (10-20% discount) and better performance – modernizing your instances is almost a no brainer. 

 

…and the list goes on. Managing cloud costs can seem like a daunting task but it doesn’t have to be! Follow these tips and start optimizing your cloud environment.